import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { TrackerComponentFactory } from "./TrackerComponentFactory";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";
import { Button } from "../ui/button";

type TrackerProps = {
  tracker: TrackerType;
  selectedComponentId?: number;
  style?: CSSProperties;
  onComponentClick?: (componentId: number) => void;
};

export function TrackerComponent({
  tracker,
  selectedComponentId = 0,
  style,
  onComponentClick,
}: TrackerProps) {
  const [start, setStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    if (start) return;

    setStart(true);
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
    }, 1000);
  };

  const handleReset = () => {
    setStart(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setElapsedTime(0);
    startTimeRef.current = null;
  };

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
            <span>{formatTime(elapsedTime)}</span>
          </div>
        )}
      </section>
      <section
        className="flex-1 relative overflow-hidden"
        style={{ width: `${tracker.width ?? TrackerTypeDefaultValue.width}px` }}
      >
        {tracker.components.map((c) => (
          <TrackerComponentFactory
            key={c.id}
            clicked={selectedComponentId === c.id}
            disabled={!start}
            component={c}
            onComponentClick={() =>
              onComponentClick ? onComponentClick(c.id) : null
            }
          />
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
