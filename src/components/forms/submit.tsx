import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

// Needs to be a separate function
// https://react.dev/reference/react-dom/hooks/useFormStatus#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component
export default function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

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
