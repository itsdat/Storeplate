import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Inbox } from "lucide-react";
import { ReactNode } from "react";

export default function BaseEmpty({ icon }: { icon?: ReactNode }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon ?? <Inbox color="#000" strokeWidth={1.5} />}</EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription className="text-(--color-desc)">No data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
