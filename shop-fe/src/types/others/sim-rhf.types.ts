import { FieldValues, SetValueConfig, UseFormReturn } from 'react-hook-form';

export type SimPath<T> =
  | Extract<keyof T, string>
  | {
      [K in Extract<keyof T, string>]: Exclude<T[K], undefined> extends infer V // Exclude undefined/null cases
        ? V extends object
          ? V extends Array<any>
            ? never
            : `${K}.${Extract<keyof V, string>}`
          : never
        : never;
    }[Extract<keyof T, string>];

export type SimFormSetValue<T extends FieldValues> = <K extends SimPath<T>>(
  path: K,
  value: any,
  options?: SetValueConfig,
) => void;

// The utility type for watch
export type SimFormWatch<T extends FieldValues> = <K extends SimPath<T>>(
  path: K,
) => any;

// The utility type for getValues
export type SimFormGetValues<T extends FieldValues> = <K extends SimPath<T>>(
  path?: K,
) => any;

// Optional: reusable merged form return type
export type SimFormReturn<T extends FieldValues> = Omit<
  UseFormReturn<T>,
  'setValue' | 'watch' | 'getValues'
> & {
  setValue: SimFormSetValue<T>;
  watch: SimFormWatch<T>;
  getValues: SimFormGetValues<T>;
};
