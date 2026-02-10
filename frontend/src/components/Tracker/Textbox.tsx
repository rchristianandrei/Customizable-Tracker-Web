import { Input } from "@/components/ui/input";
import { type TextboxType } from "@/types/tracker/components/Textbox";
import { BaseComponent } from "@/components/Tracker/BaseComponent";

type TextboxProps = {
  textbox: TextboxType;
  clicked?: boolean;
  onClick?: () => void;
};

export function Textbox({ textbox, clicked = false, onClick }: TextboxProps) {
  return (
    <BaseComponent clicked={clicked} component={textbox} onClick={onClick}>
      <Input
        type="text"
        placeholder={textbox.placeholder}
        maxLength={textbox.maxLength}
      ></Input>
    </BaseComponent>
  );
}
