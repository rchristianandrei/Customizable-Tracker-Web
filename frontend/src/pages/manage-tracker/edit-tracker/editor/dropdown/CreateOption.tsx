import { dropdownOptionRepo } from "@/api/dropdownOptionRepo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  value: z
    .string()
    .min(1, "Value must be at least 1 character.")
    .max(32, "Value must be at most 32 characters."),
});

export function CreateOption() {
  const { tracker, selectedComponent } = useTrackerState();
  const { updateComponent } = useTrackerActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!tracker || !selectedComponent || selectedComponent.type !== "Dropdown")
      return;

    try {
      const result = await dropdownOptionRepo.Create({
        dropdownId: selectedComponent.id,
        value: data.value,
      });

      form.reset();

      updateComponent((c) => {
        if (c.type !== "Dropdown") return c;
        return {
          ...c,
          options: [...c.options, result.data],
        };
      });
    } catch (error) {}
  }

  return (
    <Dialog>
      <DialogTrigger>Add</DialogTrigger>
      <DialogContent
        className="w-75"
        aria-description="Lists of Options"
        aria-describedby=""
      >
        <DialogHeader>
          <DialogTitle>Create Option</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2">
            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Value</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Philippines"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Submit</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
