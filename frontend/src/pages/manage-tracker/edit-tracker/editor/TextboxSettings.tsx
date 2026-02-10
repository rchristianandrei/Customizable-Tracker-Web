import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracker } from "@/contexts/TrackerContext";
import type { TextboxType } from "@/types/tracker/components/Textbox";

type TextboxSettingsProps = {
  textbox: TextboxType;
};

export function TextboxSettings({ textbox }: TextboxSettingsProps) {
  const { setTracker, selectedComponent, setSelectedComponent } = useTracker();

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
