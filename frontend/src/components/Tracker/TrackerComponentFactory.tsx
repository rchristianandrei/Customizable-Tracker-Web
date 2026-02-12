import { Textbox } from "@/components/Tracker/Textbox";
import { Dropdownbox } from "@/components/Tracker/Dropdownbox";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import { CookingPot } from "lucide-react";

type TrackerComponentFactoryProps = {
  component: TrackerComponentType;
  clicked?: boolean;
  disabled?: boolean;
  onComponentClick: () => void;
};

export function TrackerComponentFactory({
  component,
  clicked = false,
  disabled = false,
  onComponentClick,
}: TrackerComponentFactoryProps) {
  function triggerSelectComponentEvent() {
    onComponentClick();
  }

  switch (component.type) {
    case "Dropdown":
      return (
        <Dropdownbox
          dropdownbox={component}
          clicked={clicked}
          disabled={disabled}
          onClick={triggerSelectComponentEvent}
        ></Dropdownbox>
      );

    case "Textbox":
      return (
        <Textbox
          textbox={component}
          clicked={clicked}
          disabled={disabled}
          onClick={triggerSelectComponentEvent}
        ></Textbox>
      );
  }
}
