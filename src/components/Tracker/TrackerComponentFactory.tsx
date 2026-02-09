import { Textbox } from "@/components/Tracker/Textbox";
import { Dropdownbox } from "@/components/Tracker/Dropdownbox";
import { useTracker } from "@/contexts/TrackerContext";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

type TrackerComponentFactoryProps = {
  component: BaseComponent;
};

export function TrackerComponentFactory({
  component,
}: TrackerComponentFactoryProps) {
  const { selectedComponent, setSelectedComponent } = useTracker();

  const clicked = selectedComponent?.Id === component.Id;

  function triggerSelectComponentEvent() {
    setSelectedComponent(component);
  }

  switch (component.Type) {
    case "DropdownboxType":
      return (
        <Dropdownbox
          textbox={component}
          clicked={clicked}
          onClick={triggerSelectComponentEvent}
        ></Dropdownbox>
      );

    case "TextboxType":
      return (
        <Textbox
          textbox={component}
          clicked={clicked}
          onClick={triggerSelectComponentEvent}
        ></Textbox>
      );
  }

  return (
    <Textbox
      textbox={component}
      clicked={clicked}
      onClick={triggerSelectComponentEvent}
    ></Textbox>
  );
}
