"use server";

import { ID, Query } from "node-appwrite";
import { stripDbMetadata, removeCommonNulls, handleError } from "@/lib/utils";
import { createAdminClient } from "@/lib/appwrite";
import { revalidatePath } from "next/cache";

export async function getNetWorthAssetsByYear(
  year?: string
): Promise<NetWorthAssetsCollection[] | null> {
  try {
    const { database } = await createAdminClient();

    // Get the year from the query string or use the current year
    year = year || new Date().getFullYear().toString();

    // Set the start and end dates for the year
    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year}-12-31T23:59:59Z`);

    // Query the database for documents between the start and end dates
    const query = [
      Query.greaterThanEqual("date", startDate.toISOString()),
      Query.lessThanEqual("date", endDate.toISOString()),
      Query.orderAsc("date"),
    ];

    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_NETWORTH_ASSETS_COLLECTION_ID!,
      query
    );

    let filteredResult = result.documents.map((doc) => stripDbMetadata(doc));

    // If an asset is null for all available months, remove it.
    // Means the user doesn't have that asset category.
    filteredResult = removeCommonNulls(filteredResult);

    return filteredResult as NetWorthAssetsCollection[];
  } catch (error) {
    console.error("Error:", (error as any)?.response?.message);
    return null;
  }
}

export async function addNetWorthAssets(
  prevState: any,
  data: FormData
): Promise<{ error?: string; success?: boolean }> {
  try {
    let dataObj: any = {};

    data.forEach((value, key) => {
      if (key === "date") {
        if (data.get("date") === "") throw new Error("Date is required");
        dataObj.date = new Date(value as string).toISOString();
      } else {
        value !== "" ? (dataObj[key] = parseFloat(value as string)) : null;
      }
    });

    const { database } = await createAdminClient();

    await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_NETWORTH_ASSETS_COLLECTION_ID!,
      ID.unique(),
      dataObj
    );

    revalidatePath("/net-worth");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}
