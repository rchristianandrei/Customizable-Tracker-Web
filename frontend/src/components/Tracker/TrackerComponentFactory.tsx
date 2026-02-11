import { Textbox } from "@/components/Tracker/Textbox";
import { Dropdownbox } from "@/components/Tracker/Dropdownbox";
import { useTrackerState } from "@/contexts/TrackerContext";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";

type TrackerComponentFactoryProps = {
  component: TrackerComponentType;
  onComponentClick: () => void;
};

export function TrackerComponentFactory({
  component,
  onComponentClick,
}: TrackerComponentFactoryProps) {
  const { selectedComponent } = useTrackerState();

  const clicked = selectedComponent?.id === component.id;

  function triggerSelectComponentEvent() {
    onComponentClick();
  }

  switch (component.type) {
    case "Dropdown":
      return (
        <Dropdownbox
          dropdownbox={component}
          clicked={clicked}
          onClick={triggerSelectComponentEvent}
        ></Dropdownbox>
      );

    case "Textbox":
      return (
        <Textbox
          textbox={component}
          clicked={clicked}
          onClick={triggerSelectComponentEvent}
        ></Textbox>
      );
  }
}
