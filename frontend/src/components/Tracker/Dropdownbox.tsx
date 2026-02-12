import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { BaseComponent } from "@/components/Tracker/BaseComponent";
import { type DropdownboxType } from "@/types/tracker/components/Dropdownbox";

type DropdownboxProps = {
  dropdownbox: DropdownboxType;
  clicked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function Dropdownbox({
  dropdownbox,
  clicked = false,
  disabled = false,
  onClick,
}: DropdownboxProps) {
  return (
    <BaseComponent clicked={clicked} component={dropdownbox} onClick={onClick}>
      <Combobox
        items={dropdownbox.options.map((o) => o.value)}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={dropdownbox.placeholder}
          disabled={disabled}
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </BaseComponent>
  );
}
