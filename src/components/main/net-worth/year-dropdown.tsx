"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface YearDropdownProps {
  availableYears: string[];
  selectedYear: string;
}

export default function YearDropdown({
  availableYears,
  selectedYear,
}: YearDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearSelect = (year: string) => {
    if (year === selectedYear) return;

    const params = new URLSearchParams(searchParams);
    params.set("year", year);
    router.push(`/net-worth?${params.toString()}`);
  };

  if (!availableYears || availableYears.length === 0) {
    return (
      <Button variant="default" disabled>
        No data
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <>
            {selectedYear}
            <ChevronDown size={16} className="ml-2" />
          </>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableYears.map((year) => (
          <DropdownMenuItem
            key={year}
            onClick={() => handleYearSelect(year)}
            className={cn(
              selectedYear === year ? "bg-accent" : "",
              "cursor-pointer"
            )}
          >
            {year}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
