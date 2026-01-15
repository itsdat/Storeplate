import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IProductOption } from "@/interfaces/product/product.interface";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { HTMLInputTypeAttribute, useState } from "react";

interface IBaseSelectClass {
  className?: string;
  classItem?: string;
  classGroup?: string;
}

export interface BaseSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  search?: boolean;
  options: IProductOption[];
  classProps?: IBaseSelectClass;
  value?: string;
  onChange?: (value: string) => void;
  onSelectOption?: (option: IProductOption) => void;
}

export default function BaseSelect({
  className,
  label,
  error,
  placeholder,
  search = false,
  options,
  classProps,
  value: externalValue,
  onChange,
  onSelectOption,
  ...props
}: BaseSelectProps) {
  const [open, setOpen] = useState(false);
  
  // Sử dụng controlled value từ props hoặc fallback về empty string
  const value = externalValue || "";

  const handleSelect = (currentValue: string, option: IProductOption) => {
    const newValue = currentValue === value ? "" : currentValue;
    
    // Gọi onChange callback (cho RHF)
    if (onChange) {
      onChange(newValue);
    }
    
    // Gọi onSelectOption callback nếu có
    if (onSelectOption) {
      onSelectOption(option);
    }
    
    setOpen(false);
  };

  return (
    <div className="grid w-full items-center gap-2">
      {label && (
        <Label htmlFor={props.id} className={cn("")}>
          {label} {props.required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={cn("", classProps?.className)}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? options.find((i) => i.value === value)?.label
              : placeholder}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="rounded-[5px] p-0 w-(--radix-popover-trigger-width) border-(--color-border)">
          <Command className="w-full rounded-[3px]">
            {search && <CommandInput placeholder="Search..." className="h-9" />}
            <CommandList className="w-full">
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup className={cn("w-full!", classProps?.classGroup)}>
                {options &&
                  options.map((i) => (
                    <CommandItem
                      className={cn("w-full", classProps?.classItem)}
                      key={i.value}
                      value={i.value}
                      onSelect={(currentValue) => handleSelect(currentValue, i)}
                    >
                      {i.label}
                      <Check
                        className={cn(
                          "ml-auto data-[selected=true]:text-white",
                          value === i.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}