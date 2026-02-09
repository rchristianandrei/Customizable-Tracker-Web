import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TextboxProps = {
  textbox?: { width: string; left: string; top: string };
};

export function Textbox({
  textbox = { width: "200px", left: "20px", top: "20px" },
}: TextboxProps) {
  return (
    <Field
      className="absolute border rounded border-[#2c2c2c]"
      style={{ width: textbox.width, left: textbox.left, top: textbox.top }}
    >
      <Label>Sample Text</Label>
      <Input type="text" placeholder="placeholder"></Input>
    </Field>
  );
}
