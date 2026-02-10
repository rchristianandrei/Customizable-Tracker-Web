import { TrackerRepo } from "@/api/trackerRepo";
import { Layout } from "@/components/Layout";
import type { TrackerType } from "@/types/tracker/Tracker";
import { useEffect, useState } from "react";

export function ManageTracker() {
  const [trackers, setTrackers] = useState<TrackerType[]>([]);

  useEffect(() => {
    const result = TrackerRepo.GetAll();
    setTrackers(result);
  }, []);

  function CreateNew() {
    console.log("Create New Tracker Event");
  }

  return (
    <Layout>
      <div className="flex justify-end px-4 pt-4">
        <button
          type="button"
          className="border border-blue-900 bg-blue-100 text-blue-900 px-3 py-1 cursor-pointer rounded"
          onClick={CreateNew}
        >
          Create New
        </button>
      </div>
      <ul className="p-4 flex flex-wrap gap-2">
        {trackers.map((t, i) => (
          <li
            key={i}
            className="border p-4 rounded w-100 flex items-center justify-between"
          >
            <span>{t.Name}</span>
            <a
              href={`/${t.Id}`}
              className="bg-blue-100 text-blue-900 rounded p-2 cursor-pointer"
            >
              Open
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
