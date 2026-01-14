import { Ellipsis } from "lucide-react";
import { BaseDropdown, IPopupAction } from "../dropdown/BaseDropdown";

export default function BasePopoverAction({
  actions,
}: {
  actions: IPopupAction[];
}) {
  return (
    <BaseDropdown
      align="end"
      items={actions}
      className="border border-(--color-border)"
    >
      <button className="p-1 focus:outline-0 cursor-pointer hover:bg-(--color-dark-light) rounded-[3px] transition-all duration-200">
        <Ellipsis size={18} />
      </button>
    </BaseDropdown>
  );
}
