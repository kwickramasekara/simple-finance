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

  const handleChange = function (event: React.KeyboardEvent<HTMLInputElement>) {
    const val = (event.target as HTMLInputElement).value;

    if ((recovery && val.length === 10) || (!recovery && val.length === 6)) {
      // prevent duplicate submission - especially an issue on Safari
      if (
        !(event.target as HTMLInputElement).matches(":autofill") ||
        !(event.target as HTMLInputElement).matches(":-webkit-autofill")
      ) {
        // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission
        (event.target as HTMLInputElement).form?.requestSubmit();
      }
    }
  };

  return (
    <InputOTP
      maxLength={recovery ? 10 : 6}
      pattern={recovery ? REGEXP_ONLY_DIGITS_AND_CHARS : REGEXP_ONLY_DIGITS}
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
