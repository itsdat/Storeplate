import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Inbox } from "lucide-react";
import { ReactNode } from "react";

export default function BaseEmpty({
  icon,
  title = "No data",
  description = "No data found",
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon ?? <Inbox color="#000" strokeWidth={1.5} />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="text-(--color-desc)">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
