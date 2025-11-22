"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-8 w-8", text: "text-xs", imageSize: 32 },
  md: { container: "h-10 w-10", text: "text-sm", imageSize: 40 },
  lg: { container: "h-16 w-16", text: "text-xl", imageSize: 64 },
  xl: { container: "h-32 w-32", text: "text-3xl", imageSize: 128 },
};

export default function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const { container, text, imageSize } = sizeMap[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-neutral-800",
        container,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={imageSize}
          height={imageSize}
          className="h-full w-full object-cover"
          priority={size === "xl"}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-neutral-900 font-medium text-neutral-400",
            text
          )}
        >
          {fallback[0]?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}
