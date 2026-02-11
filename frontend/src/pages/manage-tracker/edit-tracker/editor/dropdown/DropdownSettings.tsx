import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOption } from "./CreateOption";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";
import { dropdownOptionRepo } from "@/api/dropdownOptionRepo";

export function DropdownSettings() {
  const { tracker, selectedComponent: dropdown } = useTrackerState();
  const { updateComponent } = useTrackerActions();

  if (!dropdown || dropdown.type !== "Dropdown") return;

  async function deleteOption(id: number) {
    if (!tracker || !dropdown || dropdown.type !== "Dropdown") return;

    try {
      await dropdownOptionRepo.Delete(id);
      updateComponent((c) => {
        if (!c || c.type !== "Dropdown") return c;
        return {
          ...c,
          options: c.options.filter((o) => o.id !== id),
        };
      });
    } catch (error) {}
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>Manage Options</DialogTrigger>
        <DialogContent
          className="h-100 flex flex-col gap-2"
          aria-description="Lists of Options"
          aria-describedby=""
        >
          <DialogHeader>
            <DialogTitle>Dropdown Options</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end">
            <CreateOption></CreateOption>
          </div>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">Label</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {dropdown.options.map((o, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{o.value}</TableCell>
                    <TableCell className="text-right flex justify-end gap-1">
                      <button type="button">Edit</button>
                      <button
                        type="button"
                        className="border border-red-900 rounded p-1 text-red-900 bg-red-100 cursor-pointer"
                        onClick={() => deleteOption(o.id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>Count: {dropdown.options.length}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
