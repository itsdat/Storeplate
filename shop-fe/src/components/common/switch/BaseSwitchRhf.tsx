import { Controller, Control, FieldValues } from "react-hook-form";
import BaseSwitch, { BaseSwitchProps } from "./BaseSwitch";

export interface BaseSwitchRhfProps<T extends FieldValues>
  extends Omit<BaseSwitchProps, "checked" | "onChange"> {
  name: keyof T;
  control: Control<T>;
}

export function BaseSwitchRhf<T extends FieldValues>({
  name,
  control,
  ...props
}: BaseSwitchRhfProps<T>) {
  return (
    <Controller
      name={name as any}
      control={control}
      defaultValue={false as any}
      render={({ field, fieldState }) => (
        <BaseSwitch
          {...props}
          checked={!!field.value}
          onChange={(val) => field.onChange(val)} // đảm bảo boolean
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
