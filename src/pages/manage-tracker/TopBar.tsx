import { useState, useRef, useEffect } from "react";
import { useTracker } from "@/contexts/TrackerContext";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";
import { DropdownboxTypeDefaultValue } from "@/types/tracker/components/Dropdownbox";
import { TextboxTypeDefaultValue } from "@/types/tracker/components/Textbox";

export function TopBar() {
  const { setTracker } = useTracker();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function AddComponent(component: BaseComponent) {
    setTracker((t) => ({ ...t, Components: [...t.Components, component] }));
  }

  return (
    <section className="border-b border-foreground flex gap-2 p-2">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-sm font-medium hover:opacity-50 focus:outline-none"
        >
          Add Components
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 border border-foreground shadow-lg">
            <ul className="py-1 text-sm">
              <li>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-black hover:text-white"
                  onClick={() => AddComponent(TextboxTypeDefaultValue)}
                >
                  Textbox
                </button>
              </li>

              <li>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-black hover:text-white"
                  onClick={() => AddComponent(DropdownboxTypeDefaultValue)}
                >
                  Dropdownbox
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
