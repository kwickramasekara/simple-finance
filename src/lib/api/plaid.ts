"use server";

import { plaidClient } from "@/lib/plaid";
import { getLogoUsingURL, parseStringify } from "@/lib/utils";
import { setAppData, setInstitutionConnectionData } from "@/lib/api/db";
import { CountryCode, Products } from "plaid";
import { revalidatePath } from "next/cache";

const getAccessToken = async (publicToken: string) => {
  try {
    // Exchange public token for access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;

    await setAppData("plaid_access_token", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error (getAccessToken):", error);
  }
};

const getConnectedAccounts = async (accessToken: string) => {
  try {
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    return accountsResponse.data;
  } catch (error) {
    console.error("Error (getConnectedAccounts):", error);
  }
};

const getInstitutionConnectionData = async (institutionId: string) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
      options: {
        include_optional_metadata: true,
      },
    });

    return institutionResponse.data;
  } catch (error) {
    console.error("Error (getInstitutionConnectionData):", error);
  }
};

export const createLinkToken = async (userId: string) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      client_name: "Simple Finance",
      products: ["transactions"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
      redirect_uri: process.env.PLAID_REDIRECT_URI,
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error("Error (createLinkToken):", error);
  }
};

export const processConnection = async ({
  publicToken,
}: {
  publicToken: string;
}) => {
  try {
    const accessToken = await getAccessToken(publicToken);

    const accountData =
      accessToken && (await getConnectedAccounts(accessToken));

    const institutionId = accountData && accountData.item.institution_id;

    const institutionData =
      institutionId && (await getInstitutionConnectionData(institutionId));

    const intitutionLogo =
      institutionData &&
      (institutionData.institution.logo ||
        (await getLogoUsingURL(institutionData.institution.url)));

    if (accountData && institutionData) {
      for (const account of accountData.accounts) {
        const dbData = {
          account_id: account.account_id,
          name: account.name || null,
          official_name: account.official_name || null,
          balance_current: account.balances.current || null,
          balance_limit: account.balances.limit || null,
          mask: account.mask || null,
          type: account.subtype || null,
          institution_name: institutionData.institution.name || null,
          institution_color: institutionData.institution.primary_color || null,
          institution_logo: intitutionLogo || null,
          intitution_url: institutionData.institution.url || null,
        };

        await setInstitutionConnectionData(dbData);
      }
    }

    revalidatePath("/connections");
  } catch (error) {
    console.error("Error (processConnection):", error);
  }
};

export const getTransactions = async () => {
  try {
    const response = await plaidClient.transactionsGet({
      access_token: process.env.PLAID_ACCESS_TOKEN!,
      start_date: "2024-06-01",
      end_date: "2024-12-06",
    });

    return parseStringify(response.data.transactions);
  } catch (error) {
    console.error("Error (getTransactions):", error);
  }
};
