import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";
import { TextboxSettings } from "./TextboxSettings";
import { trackerComponentRepo } from "@/api/trackerComponentRepo";
import { DropdownSettings } from "./dropdown/DropdownSettings";

export function ComponentSettings() {
  const { selectedComponent } = useTrackerState();
  const { setSelectedComponentId, updateComponent, deleteComponent } =
    useTrackerActions();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateComponent((c) => ({ ...c, [e.target.name]: e.target.value }));
  }

  async function onDeleteComponent() {
    if (!selectedComponent) return;

    try {
      await trackerComponentRepo.Delete(selectedComponent.id);
      deleteComponent(selectedComponent.id);
    } catch (error) {
      console.log(error);
    }
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
              min={0}
              onChange={handleChange}
              type="number"
              value={selectedComponent.x}
            ></Input>
          </Field>
          <Field>
            <Label>Y</Label>
            <Input
              name="y"
              min={0}
              onChange={handleChange}
              type="number"
              value={selectedComponent.y}
            ></Input>
          </Field>
          {selectedComponent.type === "Textbox" && (
            <TextboxSettings textbox={selectedComponent}></TextboxSettings>
          )}
          {selectedComponent.type === "Dropdown" && (
            <DropdownSettings></DropdownSettings>
          )}
          <div className="flex justify-center gap-5">
            <button
              className="text-red-600"
              type="button"
              onClick={onDeleteComponent}
            >
              Delete
            </button>
            <button type="button" onClick={() => setSelectedComponentId(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
