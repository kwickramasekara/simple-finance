import { useFormStatus } from "react-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

function handleChange(event: React.KeyboardEvent<HTMLInputElement>) {
  if ((event.target as HTMLInputElement).value.length === 6) {
    // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission
    (event.target as HTMLInputElement).form?.requestSubmit();
  }
}

/**
 * Separate component for OTP input that handles pending state.
 * Note that this component should only be used within a form.
 * For more details: https://react.dev/reference/react-dom/hooks/useFormStatus#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component
 * @param disabled - Whether the input should be disabled
 * @returns
 */
export default function OTP({ disabled = false }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      onKeyUp={handleChange}
      name="otp"
      disabled={pending || disabled}
      autoFocus
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
