import { useFormStatus } from "react-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

/**
 * Separate component for OTP input that handles pending state.
 * Note that this component should only be used within a form.
 * For more details: https://react.dev/reference/react-dom/hooks/useFormStatus#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component
 * @param disabled - Whether the input should be disabled
 * @param recovery - Whether the OTP is for recovery which allows more alphanumeric characters
 * @returns
 */
export default function OTP({
  disabled = false,
  recovery = false,
}: {
  disabled?: boolean;
  recovery?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <InputOTP
      maxLength={recovery ? 10 : 6}
      pattern={recovery ? REGEXP_ONLY_DIGITS_AND_CHARS : REGEXP_ONLY_DIGITS}
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
        {recovery && (
          <>
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
            <InputOTPSlot index={9} />
          </>
        )}
      </InputOTPGroup>
    </InputOTP>
  );
}
