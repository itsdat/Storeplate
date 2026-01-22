import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BaseSelect, { BaseSelectProps } from "./BaseSelect";
import { IProductOption } from "@/interfaces/product/product.interface";

export interface BaseSelectRhfProps<T extends FieldValues> extends Omit<
  BaseSelectProps,
  "value" | "onChange" | "defaultValue"
> {
  name: Path<T>;
  control: Control<T>;
  options: IProductOption[];
}

export default function BaseSelectRhf<T extends FieldValues>({
  control,
  name,
  options,
  ...props
}: BaseSelectRhfProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseSelect
          options={options}
          {...props}
          value={field.value}
          onChange={field.onChange}
          onSelectOption={props.onSelectOption}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
