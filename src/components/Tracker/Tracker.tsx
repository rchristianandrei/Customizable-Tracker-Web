import type { CSSProperties } from "react";
import { TrackerComponentFactory } from "./TrackerComponentFactory";
import { useTracker } from "@/contexts/TrackerContext";

type TrackerProps = {
  style?: CSSProperties;
};

export function TrackerComponent({ style }: TrackerProps) {
  const { tracker } = useTracker();

  return (
    <section
      className="flex flex-col border border-foreground rounded shadow h-175"
      style={style}
    >
      <section className="border-b border-foreground flex items-center justify-center py-4 h-15">
        {tracker.Name}
      </section>
      <section
        className="flex-1 relative overflow-hidden"
        style={{ width: `${tracker.Width}px` }}
      >
        {tracker.Components.map((c, i) => (
          <TrackerComponentFactory key={i} component={c} />
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
