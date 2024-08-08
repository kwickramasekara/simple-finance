import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

// Needs to be a separate function
// https://react.dev/reference/react-dom/hooks/useFormStatus#use-form-status
export default function Submit({
  formStatus,
  children,
}: {
  formStatus: any;
  children: React.ReactNode;
}) {
  const { pending } = formStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      <Loader
        className="mr-2 h-4 w-4 animate-spin-slow"
        visibility={pending ? "visible" : "hidden"}
      ></Loader>
      {children}
    </Button>
  );
}
