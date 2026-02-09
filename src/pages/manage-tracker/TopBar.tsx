import { useState, useRef, useEffect } from "react";

export function TopBar() {
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

  return (
    <section className="border-b flex gap-2 p-2">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-sm font-medium hover:opacity-50 focus:outline-none"
        >
          Add Components
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 border bg-[#242424] shadow-lg">
            <ul className="py-1 text-sm">
              <li>
                <button className="w-full px-4 py-2 text-left hover:bg-white hover:text-black">
                  Textbox
                </button>
              </li>

              <li>
                <button className="w-full px-4 py-2 text-left hover:bg-white hover:text-black">
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
