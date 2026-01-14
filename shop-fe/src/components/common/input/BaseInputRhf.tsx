import { Controller, Control, FieldValues, Path } from "react-hook-form";
import BaseInput, { BaseInputProps } from "./BaseInput";

export interface BaseInputRhfProps<T extends FieldValues>
  extends Omit<BaseInputProps, "value" | "onChange" | "defaultValue"> {
  name: Path<T>;
  control: Control<T>;
}

export function BaseInputRhf<T extends FieldValues>({
  control,
  name,
  ...props
}: BaseInputRhfProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      //   rules={{ required: false }}
      render={({ field, fieldState }) => (
        <BaseInput
          {...props} // UI props
          {...field} // RHF props (onChange, value, ref)
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
