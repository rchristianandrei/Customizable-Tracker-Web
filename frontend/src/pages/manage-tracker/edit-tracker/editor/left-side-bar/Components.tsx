"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import {
  useEditTrackerActions,
  useEditTrackerState,
} from "@/contexts/EditTrackerContext";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";

export function Components() {
  const { tracker } = useEditTrackerState();
  const { updateTracker, setSelectedComponentId } = useEditTrackerActions();

  return (
    <>
      {tracker && (
        <Sortable
          value={tracker.components}
          onValueChange={(items) => {
            updateTracker((t) => ({ ...t, components: items }));
          }}
          getItemValue={(item: TrackerComponentType) => item.id}
        >
          <Table className="rounded-none border">
            <TableHeader>
              <TableRow className="bg-accent/50">
                <TableHead className="w-12.5 bg-transparent" />
                <TableHead className="bg-transparent">
                  Components Order
                </TableHead>
              </TableRow>
            </TableHeader>
            <SortableContent asChild>
              <TableBody>
                {tracker.components.map((comp) => (
                  <SortableItem key={comp.id} value={comp.id} asChild>
                    <TableRow>
                      <TableCell className="w-12.5">
                        <SortableItemHandle asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <GripVertical className="h-4 w-4" />
                          </Button>
                        </SortableItemHandle>
                      </TableCell>
                      <TableCell
                        onClick={() => setSelectedComponentId(comp.id)}
                        className="font-medium cursor-pointer"
                      >
                        {comp.name}
                      </TableCell>
                    </TableRow>
                  </SortableItem>
                ))}
              </TableBody>
            </SortableContent>
          </Table>
          <SortableOverlay>
            <div className="size-full rounded-none bg-primary/10" />
          </SortableOverlay>
        </Sortable>
      )}
    </>
  );
}
