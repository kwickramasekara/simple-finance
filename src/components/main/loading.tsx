import { Skeleton } from "@/components/ui/skeleton";

type LoadingProps = {
  withTitle?: boolean;
  className?: string;
};
export default function Loading({
  withTitle = true,
  className = "",
}: LoadingProps) {
  return (
    <div className={className}>
      {withTitle && <Skeleton className="h-4 mb-16 w-[25%]" />}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[75%]" />
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[25%]" />
      </div>
    </div>
  );
}
