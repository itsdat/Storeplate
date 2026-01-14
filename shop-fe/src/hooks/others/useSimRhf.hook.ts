import { SimFormReturn } from '@/types/others/sim-rhf.types';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

export function useSimRhf<T extends FieldValues>(
  options?: Partial<UseFormProps<T>>,
) {
  return useForm<any>(options) as SimFormReturn<T>;
}
