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

  const clicked = selectedComponent?.id === component.id;

  function triggerSelectComponentEvent() {
    setSelectedComponent(component);
  }

  switch (component.type) {
    case "Dropdownbox":
      return (
        <Dropdownbox
          textbox={component}
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

  return (
    <Textbox
      textbox={component}
      clicked={clicked}
      onClick={triggerSelectComponentEvent}
    ></Textbox>
  );
}
