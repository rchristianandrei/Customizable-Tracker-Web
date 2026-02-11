import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";

export function TrackerSettings() {
  const { tracker } = useTrackerState();
  const { updateTracker } = useTrackerActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTracker((t) => ({
      ...t,
      [e.target.name]: e.target.value,
    }));
  };

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
        </div>
      )}
    </>
  );
}
