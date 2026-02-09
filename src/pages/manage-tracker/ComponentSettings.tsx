import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracker } from "@/contexts/TrackerContext";

export function ComponentSettings() {
  const { setTracker, selectedComponent, setSelectedComponent } = useTracker();

  const selectedComponentId = selectedComponent?.Id;

  if (!selectedComponent) {
    throw Error("Selected Component is Null!!");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedComponent((c) => {
      if (!c) return c;
      return { ...c, [e.target.name]: e.target.value };
    });

    setTracker((prev) => ({
      ...prev,
      Components: prev.Components.map((c) =>
        c.Id === selectedComponentId
          ? { ...c, [e.target.name]: e.target.value }
          : c,
      ),
    }));
  };

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

      <button type="button" onClick={() => setSelectedComponent(null)}>
        Close
      </button>
    </div>
  );
}
