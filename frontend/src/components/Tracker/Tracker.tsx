import { useEffect, type CSSProperties } from "react";
import { TrackerComponentFactory } from "./TrackerComponentFactory";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";
import { Button } from "../ui/button";
import { useStopwatch } from "@/hooks/useStopwatch";
import { useTrackerComponent } from "@/contexts/TrackerContext";

type TrackerProps = {
  tracker: TrackerType;
  style?: CSSProperties;
  currentSelectedComponentId?: number | null;
};

export function TrackerComponent({
  tracker,
  style,
  currentSelectedComponentId,
}: TrackerProps) {
  const { setIsClicked: setSelectedComponentId, setIsDisabled } =
    useTrackerComponent();
  const { start, formatTime, handleStart, handleReset, clean } = useStopwatch();

  useEffect(() => {
    setSelectedComponentId(currentSelectedComponentId ?? 0);
  }, [currentSelectedComponentId]);

  useEffect(() => {
    setIsDisabled(!start);
  }, [start]);

  useEffect(() => {
    return clean;
  }, []);

  return (
    <section
      className="flex flex-col border border-foreground rounded shadow h-175"
      style={style}
    >
      <section className="border-b border-foreground flex items-center justify-center py-4 h-15 font-bold text-lg">
        {tracker.name}
      </section>
      <section className="border-b border-foreground h-12 p-1 flex flex-col justify-center">
        {!start && (
          <Button type="button" className="w-full h-full" onClick={handleStart}>
            Start
          </Button>
        )}
        {start && (
          <div className="w-full h-full text-lg font-medium flex items-center justify-center">
            <span>{formatTime}</span>
          </div>
        )}
      </section>
      <section
        className="flex-1 relative overflow-hidden"
        style={{ width: `${tracker.width ?? TrackerTypeDefaultValue.width}px` }}
      >
        {tracker.components.map((c) => (
          <TrackerComponentFactory key={c.id} component={c} />
        ))}
      </section>
      <section className="border-t border-foreground h-12 p-1 flex justify-center">
        <Button
          type="button"
          className="w-full h-full"
          onClick={handleReset}
          disabled={!start}
        >
          Submit
        </Button>
      </section>
    </section>
  );
}
