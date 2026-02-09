import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TextboxTypeDefaultValue,
  type TextboxType,
} from "@/types/tracker/components/Textbox";

type TextboxProps = {
  textbox?: TextboxType;
  clicked?: boolean;
  onClick?: () => void;
};

export function Textbox({
  textbox = TextboxTypeDefaultValue,
  clicked = false,
  onClick,
}: TextboxProps) {
  return (
    <Field
      className={`absolute border rounded ${clicked ? "border-foreground" : "border-background"}`}
      onClick={onClick}
      style={{ width: textbox.Width, left: textbox.Left, top: textbox.Top }}
    >
      <Label>{textbox.Name}</Label>
      <Input type="text" placeholder="placeholder"></Input>
    </Field>
  );
}
