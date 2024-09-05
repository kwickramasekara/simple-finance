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
import { CirclePlus } from "lucide-react";
import { addNetWorthAssets } from "@/lib/api/db";
import { useFormState, useFormStatus } from "react-dom";
import Submit from "@/components/forms/submit";
import Alert from "@/components/common/alert";
import { useState, ChangeEvent, useEffect } from "react";

export default function AddAssets() {
  const todaysDate = new Date().toISOString().split("T")[0];
  const initialState = {
    error: "",
    success: false,
  };
  const [state, formAction] = useFormState(addNetWorthAssets, initialState);
  const [dateValue, setDateValue] = useState(todaysDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  // Subscribe to changes in the success field
  useEffect(() => {
    if (state.success === true) setIsOpen(false);
  }, [state.success]); // Dependency array ensures this runs only when state.success changes

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus size={16} className="mr-2" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Assets</DialogTitle>
          <DialogDescription>
            Add your assets to reflect your current net worth.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cash">Date</Label>
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
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 w-full sm:flex-col sm:justify-normal sm:space-x-0">
            {state?.error && (
              <Alert type="error" className="max-w-full block">
                {state.error}
              </Alert>
            )}

            <Submit>Save changes</Submit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
