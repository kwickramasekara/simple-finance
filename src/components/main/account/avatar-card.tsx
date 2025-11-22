"use client";

import { useRef, useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Avatar from "@/components/common/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { uploadAvatarAction, deleteAvatarAction } from "@/lib/api/account";
import { Upload, Trash2 } from "lucide-react";
import Alert from "@/components/common/alert";

interface AvatarCardProps {
  avatarUrl?: string;
  userName: string;
}

const initialState: APIResponse = {
  error: "",
  success: "",
};

export default function AvatarCard({ avatarUrl, userName }: AvatarCardProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadState, uploadFormAction] = useFormState(
    uploadAvatarAction,
    initialState
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const file = e.target.files?.[0];

    if (!file) return;

    // Trigger form submission when file is selected
    const form = e.target.form;
    if (form) {
      setIsPending(true);
      form.requestSubmit();
    }
  };

  const handleDelete = async () => {
    setError(null);

    if (!avatarUrl) return;

    setIsPending(true);

    try {
      const result = await deleteAvatarAction();

      // Refresh to remove avatar everywhere
      if (result.success) router.refresh();

      if (result.error) setError(result.error);
    } catch (error) {
      setError("Failed to delete avatar:");
    } finally {
      setIsPending(false);
    }
  };

  // Handle successful upload
  useEffect(() => {
    // Refresh to show new avatar everywhere
    if (uploadState.success) router.refresh();

    if (uploadState.error) setError(uploadState.error);

    if (fileInputRef.current) fileInputRef.current.value = "";

    setIsPending(false);
  }, [uploadState.success, uploadState.error, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>Profile picture for your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <Alert>{error}</Alert>}

        <div className="flex flex-col items-center gap-4">
          <div
            className="relative cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar
              src={avatarUrl}
              alt={userName}
              fallback={userName}
              size="xl"
              className={isPending ? "animate-pulse" : ""}
            />
          </div>

          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <form action={uploadFormAction}>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
              >
                <Upload className="mr-2 h-4 w-4" />
                {avatarUrl ? "Change" : "Upload"}
              </Button>
            </form>

            {avatarUrl && (
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isPending}
              >
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </>
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground text-center font-medium">
            <span>Max file size: 1MB</span>
            <span>Supported formats: JPG, PNG, WebP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
