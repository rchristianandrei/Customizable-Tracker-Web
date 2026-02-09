import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracker } from "@/contexts/TrackerContext";

export function ComponentSettings() {
  const { setTracker, selectedComponent, setSelectedComponent } = useTracker();

  if (!selectedComponent) {
    throw Error("Selected Component is Null!!");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedComponent((c) => {
      if (!c) return c;
      return { ...c, [e.target.name]: e.target.value };
    });

    setTracker((prev) => ({
      ...prev,
      Components: prev.Components.map((c) =>
        c.Id === selectedComponent?.Id
          ? { ...c, [e.target.name]: e.target.value }
          : c,
      ),
    }));
  }

  function deleteComponent() {
    setSelectedComponent(() => null);

    setTracker((prev) => ({
      ...prev,
      Components: prev.Components.filter((c) => c.Id !== selectedComponent?.Id),
    }));
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-center">Component Settings</h3>
      <Field>
        <Label>Name</Label>
        <Input
          name="Name"
          onChange={handleChange}
          type="text"
          value={selectedComponent.Name}
        ></Input>
      </Field>
      <div className="flex justify-center gap-5">
        <button
          className="text-red-600"
          type="button"
          onClick={deleteComponent}
        >
          Delete
        </button>
        <button type="button" onClick={() => setSelectedComponent(null)}>
          Close
        </button>
      </div>
    </div>
  );
}
