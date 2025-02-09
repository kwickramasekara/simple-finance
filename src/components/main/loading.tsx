import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[75%]" />
      <Skeleton className="h-4 w-[50%]" />
      <Skeleton className="h-4 w-[25%]" />
    </div>
  );
}
