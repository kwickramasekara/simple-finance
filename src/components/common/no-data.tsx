import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Database } from "lucide-react";

export default function NoData({
  title = "No data found",
  description,
  icon: Icon = Database,
}: {
  title?: string;
  description?: string;
  icon?: React.ElementType;
}) {
  return (
    <Empty className="border border-dashed bg-neutral-950">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
