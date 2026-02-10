import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracker } from "@/contexts/TrackerContext";
import { TextboxSettings } from "./TextboxSettings";

export function ComponentSettings() {
  const { tracker, setTracker, selectedComponent, setSelectedComponent } =
    useTracker();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedComponent((c) => {
      if (!c) return c;
      return { ...c, [e.target.name]: e.target.value };
    });

    setTracker((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        components: prev.components.map((c) =>
          c.id === selectedComponent?.id
            ? { ...c, [e.target.name]: e.target.value }
            : c,
        ),
      };
    });
  }

  function changePosition(Top: number, Left: number) {
    if (!tracker) return;

    const yRestriction = Top < 0 || Top > 549;
    const xRestriction =
      Left < 0 || Left > tracker.width - (selectedComponent?.width ?? 0);

    if (yRestriction || xRestriction) return;

    setSelectedComponent((c) => {
      if (!c) return c;
      return { ...c, y: Top, x: Left };
    });

    setTracker((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        components: prev.components.map((c) =>
          c.id === selectedComponent?.id ? { ...c, y: Top, x: Left } : c,
        ),
      };
    });
  }

  function deleteComponent() {
    setSelectedComponent(() => null);

    setTracker((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        components: prev.components.filter(
          (c) => c.id !== selectedComponent?.id,
        ),
      };
    });
  }

  return (
    <>
      {selectedComponent && (
        <div className="flex flex-col gap-1">
          <h3 className="text-center">Component Settings</h3>
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              onChange={handleChange}
              type="text"
              value={selectedComponent.name}
            ></Input>
          </Field>
          <Field>
            <Label>Placeholder</Label>
            <Input
              name="placeholder"
              onChange={handleChange}
              type="text"
              value={selectedComponent.placeholder}
            ></Input>
          </Field>
          <Field>
            <Label>Width</Label>
            <Input
              name="width"
              onChange={handleChange}
              type="number"
              value={selectedComponent.width}
            ></Input>
          </Field>
          <Field>
            <Label>X</Label>
            <Input
              name="x"
              onChange={(e) =>
                changePosition(selectedComponent.y, Number(e.target.value))
              }
              type="number"
              value={selectedComponent.x}
            ></Input>
          </Field>
          <Field>
            <Label>Y</Label>
            <Input
              name="y"
              onChange={(e) =>
                changePosition(Number(e.target.value), selectedComponent.x)
              }
              type="number"
              value={selectedComponent.y}
            ></Input>
          </Field>
          {selectedComponent.type === "Textbox" && (
            <TextboxSettings textbox={selectedComponent}></TextboxSettings>
          )}
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
      )}
    </>
  );
}
