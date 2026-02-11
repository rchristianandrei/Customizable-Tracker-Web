import { useState, useRef, useEffect } from "react";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";
import { trackerRepo } from "@/api/trackerRepo";
import { textboxRepo } from "@/api/textboxRepo";
import { dropdownRepo } from "@/api/dropdownRepo";

export function TopBar() {
  const { tracker } = useTrackerState();
  const { onLoad } = useTrackerActions();
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

  async function AddTextbox() {
    if (!tracker) return;
    await textboxRepo.Create(tracker.id);
    onLoad(tracker.id);
  }

  async function AddDropdownbox() {
    if (!tracker) return;
    await dropdownRepo.Create(tracker.id);
    onLoad(tracker.id);
  }

  async function SaveTracker() {
    if (!tracker) return;

    try {
      await trackerRepo.Update(tracker);
      await onLoad(tracker.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="border-b border-foreground flex items-center justify-between gap-2 p-2">
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
                  onClick={AddTextbox}
                >
                  Textbox
                </button>
              </li>

              <li>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-black hover:text-white"
                  onClick={AddDropdownbox}
                >
                  Dropdownbox
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button
        type="button"
        className="bg-green-900 px-4 py-1 border border-green-100 text-green-100 rounded cursor-pointer"
        onClick={SaveTracker}
      >
        Save
      </button>
    </section>
  );
}
