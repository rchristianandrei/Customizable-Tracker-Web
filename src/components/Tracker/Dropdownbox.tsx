import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TextboxTypeDefaultValue,
  type TextboxType,
} from "@/types/tracker/components/Textbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type TextboxProps = {
  textbox?: TextboxType;
  clicked?: boolean;
  onClick?: () => void;
};

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function Dropdownbox({
  textbox = TextboxTypeDefaultValue,
  clicked = false,
  onClick,
}: TextboxProps) {
  return (
    <>
      <Field
        className={`absolute border rounded ${clicked ? "border-foreground" : "border-background"}`}
        onClick={onClick}
        style={{ width: textbox.Width, left: textbox.Left, top: textbox.Top }}
      >
        <Label>{textbox.Name}</Label>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="Select a framework" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </>
  );
}
