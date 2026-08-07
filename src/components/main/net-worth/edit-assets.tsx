"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { updateNetWorthAssets } from "@/lib/api/db";
import { useFormState } from "react-dom";
import Submit from "@/components/forms/submit";
import Alert from "@/components/common/alert";
import { useState, ChangeEvent, useEffect } from "react";

interface EditAssetsProps {
  data: NetWorthAssetsCollection;
}

export default function EditAssets({ data }: EditAssetsProps) {
  const initialState = {
    error: "",
    success: false,
  };
  const [state, formAction] = useFormState(updateNetWorthAssets, initialState);
  const [isOpen, setIsOpen] = useState(false);

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const [dateValue, setDateValue] = useState(formatDateForInput(data.date));

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  // Subscribe to changes in the success field
  useEffect(() => {
    if (state.success === true) setIsOpen(false);
  }, [state.success]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Assets</DialogTitle>
          <DialogDescription>
            Update your assets to reflect your current net worth.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="id" value={data.$id} />
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                required
                value={dateValue}
                onChange={handleDateChange}
                tabIndex={-1}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cash">Cash</Label>
              <Input
                type="number"
                id="cash"
                name="cash"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.cash ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="stocks">Stocks</Label>
              <Input
                type="number"
                id="stocks"
                name="stocks"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.stocks ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="401k">401K</Label>
              <Input
                type="number"
                id="401k"
                name="401k"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data["401k"] ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="ira">IRA</Label>
              <Input
                type="number"
                id="ira"
                name="ira"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.ira ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="hsa">HSA</Label>
              <Input
                type="number"
                id="hsa"
                name="hsa"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.hsa ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="crypto">Crypto</Label>
              <Input
                type="number"
                id="crypto"
                name="crypto"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.crypto ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cd">CD (Certificate of Deposits)</Label>
              <Input
                type="number"
                id="cd"
                name="cd"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.cd ?? ""}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="vehicles">Vehicles</Label>
              <Input
                type="number"
                id="vehicles"
                name="vehicles"
                placeholder="0"
                step="0.01"
                className="font-mono"
                defaultValue={data.vehicles ?? ""}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 w-full sm:flex-col sm:justify-normal sm:space-x-0">
            {state?.error && (
              <Alert className="max-w-full block">{state.error}</Alert>
            )}

            <Submit>Save changes</Submit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
