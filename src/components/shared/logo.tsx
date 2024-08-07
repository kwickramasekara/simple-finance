interface LogoProps {
  size: "lg" | "md" | "sm";
}

export default function Logo({ size }: LogoProps) {
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
      className={`inline-flex ${containerSizeMap[size]} border-[1px] rounded-lg justify-center items-center mx-auto bg-stone-900`}
    >
      <span
        className={`${fontSizeMap[size]} font-semibold  font-mono tracking-tighter`}
      >
        $∫
      </span>
    </div>
  );
}
