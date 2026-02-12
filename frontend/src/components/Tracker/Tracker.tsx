import { type CSSProperties } from "react";
import { TrackerComponentFactory } from "./TrackerComponentFactory";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";

type TrackerProps = {
  tracker: TrackerType;
  style?: CSSProperties;
  onComponentClick: (componentId: number) => void;
};

export function TrackerComponent({
  tracker,
  style,
  onComponentClick,
}: TrackerProps) {
  return (
    <section
      className="flex flex-col border border-foreground rounded shadow h-175"
      style={style}
    >
      <section className="border-b border-foreground flex items-center justify-center py-4 h-15">
        {tracker.name}
      </section>
      <section
        className="flex-1 relative overflow-hidden"
        style={{ width: `${tracker.width ?? TrackerTypeDefaultValue.width}px` }}
      >
        {tracker.components.map((c) => (
          <TrackerComponentFactory
            key={c.id}
            component={c}
            onComponentClick={() => onComponentClick(c.id)}
          />
        ))}
      </section>
      <section className="border-t border-foreground p-1 flex justify-center">
        <button type="button" className="w-full">
          Submit
        </button>
      </section>
    </section>
  );
}
