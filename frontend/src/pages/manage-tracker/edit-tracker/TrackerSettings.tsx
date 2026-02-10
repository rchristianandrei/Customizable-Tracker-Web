import { trackerComponentRepo } from "@/api/trackerComponentRepo";
import { trackerRepo } from "@/api/trackerRepo";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracker } from "@/contexts/TrackerContext";

export function TrackerSettings() {
  const { tracker, setTracker } = useTracker();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker((t) => {
      if (!t) return t;
      return {
        ...t,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function SaveTracker() {
    if (!tracker) return;

    try {
      await trackerRepo.Update(tracker);

      for (const component of tracker.components) {
        await trackerComponentRepo.Update(component);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {tracker && (
        <div className="flex flex-col gap-1">
          <h3 className="text-center">Tracker Settings</h3>
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              onChange={handleChange}
              type="text"
              value={tracker.name}
            ></Input>
          </Field>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-green-900 px-4 py-1 border border-green-100 text-green-100 rounded cursor-pointer"
              onClick={SaveTracker}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
