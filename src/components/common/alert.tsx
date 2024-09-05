import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CircleX, CircleAlert, CircleCheckBig, Info } from "lucide-react";

const types = {
  error:
    "bg-destructive/10 border-destructive text-destructive [&>svg]:text-destructive",
  warning:
    "bg-amber-500/10 border-amber-500 text-amber-500 [&>svg]:text-amber-500",
  success:
    "bg-green-500/10 border-green-500 text-green-500 [&>svg]:text-green-500",
  info: "bg-sky-600/10 border-sky-600 text-sky-600 [&>svg]:text-sky-600",
};

export default function CustomAlert({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type: keyof typeof types;
  className?: string;
}) {
  return (
    <Alert className={cn(types[type], className)}>
      {type === "error" && <CircleX size={16} />}
      {type === "warning" && <CircleAlert size={16} />}
      {type === "success" && <CircleCheckBig size={16} />}
      {type === "info" && <Info size={16} />}
      <AlertTitle className="capitalize">{type}</AlertTitle>
      <AlertDescription className="break-words">{children}</AlertDescription>
    </Alert>
  );
}
