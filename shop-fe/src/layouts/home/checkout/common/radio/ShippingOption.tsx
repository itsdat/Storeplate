import { MomoIcon } from "@/components/common/icons/BaseIcon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PackageCheck } from "lucide-react";

export default function ShippingOption() {
  return (
    <RadioGroup defaultValue="cod" className="grid gap-3">
      <Label
        htmlFor="cod"
        className={cn(
          "flex items-center justify-between rounded-md border p-4 cursor-pointer transition",
          "hover:bg-muted/50",
          "has-checked:border-primary has-checked:bg-muted"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="cod" id="cod" />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground font-normal">
                Pay with cash when your order is delivered
              </p>
            </div>
          </div>

          <PackageCheck strokeWidth={1.5} color="var(--color-desc)" />
        </div>
      </Label>

      <Label
        htmlFor="momo"
        className={cn(
          "flex items-center justify-between rounded-md border p-4 cursor-pointer transition",
          "hover:bg-muted/50",
          "has-checked:border-primary has-checked:bg-muted"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="momo" id="momo" />
            <div>
              <p className="font-medium">MoMo E-Wallet</p>
              <p className="text-sm text-muted-foreground font-normal">
                Pay securely via MoMo digital wallet
              </p>
            </div>
          </div>

          <MomoIcon />
        </div>
      </Label>
    </RadioGroup>
  );
}
