import { Client, Avatars } from "appwrite";

/**
 * Get optimized avatar URL using Appwrite's Avatar service
 * Uses the getImage endpoint to proxy and optimize the storage file
 */
export function getOptimizedAvatarUrl(
  avatarUrl: string | undefined,
  width: number = 256,
  height: number = 256
): string | undefined {
  if (!avatarUrl) return undefined;

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const avatars = new Avatars(client);

  const result = avatars.getImage({
    url: avatarUrl,
    width,
    height,
  });

  return result;
}
