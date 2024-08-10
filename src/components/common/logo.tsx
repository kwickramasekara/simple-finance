import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "lg" | "md" | "sm";
  align?: "center";
}

export default function Logo({ size = "sm", align }: LogoProps) {
  let containerSizeMap = {
    lg: "w-[72px] h-[72px]",
    md: "w-[48px] h-[48px]",
    sm: "w-[36px] h-[36px]",
  };

  const fontSizeMap = {
    lg: "text-4xl",
    md: "text-3xl",
    sm: "text-2xl",
  };

  return (
    <div
      className={cn(
        "inline-flex border-[1px] justify-center items-center bg-stone-900",
        size === "sm" ? "rounded-md" : "rounded-lg",
        align === "center" && "mx-auto",
        containerSizeMap[size]
      )}
    >
      <span
        className={cn(
          "font-semibold font-mono tracking-tighter",
          fontSizeMap[size]
        )}
      >
        $∫
      </span>
    </div>
  );
}
