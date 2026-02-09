import type { CSSProperties } from "react";
import { Textbox } from "@/components/Tracker/Textbox";

type TrackerProps = {
  style?: CSSProperties;
};

export function Tracker({ style }: TrackerProps) {
  return (
    <section
      className="flex flex-col border rounded shadow w-150 h-175"
      style={style}
    >
      <section className="border-b flex items-center justify-center py-4">
        Tracker Name
      </section>
      <section className="flex-1 relative">
        <Textbox></Textbox>
      </section>
      <section className="border-t p-1 flex justify-center">
        <button type="button" className="w-full">
          Submit
        </button>
      </section>
    </section>
  );
}
