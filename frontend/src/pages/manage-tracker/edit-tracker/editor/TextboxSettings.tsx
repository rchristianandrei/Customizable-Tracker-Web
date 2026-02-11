import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackerActions } from "@/contexts/TrackerContext";
import type { TextboxType } from "@/types/tracker/components/Textbox";

type TextboxSettingsProps = {
  textbox: TextboxType;
};

export function TextboxSettings({ textbox }: TextboxSettingsProps) {
  const { updateComponent } = useTrackerActions();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateComponent((c) => {
      if (c.type !== "Textbox") return c;
      return { ...c, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <Field>
        <Label>Max Length</Label>
        <Input
          name="maxLength"
          onChange={handleChange}
          type="number"
          max={50}
          min={5}
          value={textbox.maxLength}
        ></Input>
      </Field>
    </>
  );
}
