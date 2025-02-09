"use client";

import { Models } from "node-appwrite";
import { Card, CardContent } from "@/components/ui/card";
import CreditCard from "@/components/main/credit-card";
import { getOrdinalSuffix } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Submit from "@/components/forms/submit";
import { useFormState } from "react-dom";
import {
  deleteInstitutionConnectionData,
  updateInstitutionConnectionData,
} from "@/lib/api/db";
import Alert from "@/components/common/alert";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ConnectionsList({
  data,
}: {
  data: Models.Document[] | null;
}) {
  const updateInitialState = {
    error: "",
    success: false,
  };
  const deleteInitialState = {
    error: "",
    success: false,
  };
  const [updateState, formAction] = useFormState(
    updateInstitutionConnectionData,
    updateInitialState
  );
  const [deleteState, deleteFormAction] = useFormState(
    deleteInstitutionConnectionData,
    deleteInitialState
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(data && data[0]);

  // Subscribe to changes in the success field
  useEffect(() => {
    if (updateState.success === true) {
      setEditDialogOpen(false);
      updateState.success = false;
    }
  }, [updateState.success]); // Dependency array ensures this runs only when state.success changes

  useEffect(() => {
    if (deleteState.success === true) {
      setDeleteDialogOpen(false);
      deleteState.success = false;
    }
  }, [deleteState.success]); // Dependency array ensures this runs only when deleteState.success changes

  return (
    <div className="flex flex-col gap-4">
      {data &&
        data.map((connection) => (
          <Card key={connection.$id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-1/2 items-center space-x-4">
                  <CreditCard
                    mask={connection.mask}
                    logo={connection.institution_logo}
                    bgColor={connection.institution_color}
                  />

                  <div>
                    <p className="font-medium truncate w-36 md:w-72 xl:w-96">
                      {connection.given_name ||
                        connection.official_name ||
                        connection.name}
                    </p>
                    <p className="text-muted-foreground">
                      {connection.institution_name}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col w-1/4 text-center">
                  <p>
                    {connection.billing_cycle &&
                      `${connection.billing_cycle}${getOrdinalSuffix(
                        connection.billing_cycle
                      )}`}
                  </p>
                  <p className="text-muted-foreground">Billing Cycle</p>
                </div>

                <div className="flex w-1/4 gap-4 justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditDialogOpen(true);
                      setCurrentConnection(connection);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setCurrentConnection(connection);
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={formAction}>
            <DialogHeader>
              <DialogTitle>Connection Details</DialogTitle>
              <DialogDescription>
                Customize the card name and update billing cycle date.
              </DialogDescription>
            </DialogHeader>
            <input type="hidden" name="id" value={currentConnection?.$id} />

            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="name">Card name</Label>
                <Input
                  id="name"
                  name="given_name"
                  defaultValue={
                    currentConnection?.given_name ||
                    currentConnection?.official_name ||
                    currentConnection?.name
                  }
                />
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="date">Billing Cycle Date</Label>
                <Input
                  id="date"
                  name="billing_cycle"
                  defaultValue={currentConnection?.billing_cycle}
                  type="number"
                  min={1}
                  max={31}
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col gap-2 w-full sm:flex-col sm:justify-normal sm:space-x-0">
              {updateState?.error && (
                <Alert type="error" className="max-w-full block">
                  {updateState.error}
                </Alert>
              )}

              <Submit>Save changes</Submit>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={deleteFormAction}>
            <DialogHeader>
              <DialogTitle>Delete Connection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-8">
              <input type="hidden" name="id" value={currentConnection?.$id} />

              <p>Are you sure you want to delete this connection?</p>
            </div>
            <DialogFooter className="flex flex-col gap-4 w-full sm:flex-col sm:justify-normal sm:space-x-0">
              {deleteState?.error && (
                <Alert type="error" className="max-w-full block">
                  {deleteState.error}
                </Alert>
              )}

              <div className="grid grid-row grid-cols-2 gap-4">
                <Submit>Delete</Submit>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
