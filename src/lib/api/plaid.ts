"use server";

import { plaidClient } from "@/lib/plaid";
import { getLogoUsingURL, parseStringify } from "@/lib/utils";
import {
  getInstitutionConnectionData,
  addInstitutionConnectionData,
} from "@/lib/api/db";
import { CountryCode, CreditAccountSubtype, Products } from "plaid";
import { revalidatePath } from "next/cache";
import { getBillingDates } from "@/lib/utils/dates";

const APP_NAME = "Simple Finance";
const APP_LANG = "en";
const APP_REGION = "US";

const getAccessToken = async (publicToken: string) => {
  try {
    // Exchange public token for access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    return response.data.access_token;
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

const getInstitutionData = async (institutionId: string) => {
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
    console.error("Error (getInstitutionData):", error);
  }
};

export const createLinkToken = async (userId: string) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      account_filters: {
        credit: {
          account_subtypes: ["credit card"] as CreditAccountSubtype[],
        },
      },
      client_name: APP_NAME,
      language: APP_LANG,
      country_codes: [APP_REGION] as CountryCode[],
      products: ["transactions"] as Products[],
      redirect_uri: process.env.PLAID_REDIRECT_URI,
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error("Error (createLinkToken):", error);
  }
};

export const createUpdateLinkToken = async (
  userId: string,
  accessToken: string
) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      client_name: APP_NAME,
      language: APP_LANG,
      country_codes: [APP_REGION] as CountryCode[],
      access_token: accessToken,
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error("Error (createUpdateLinkToken):", error);
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
      institutionId && (await getInstitutionData(institutionId));

    const intitutionLogo =
      institutionData &&
      (institutionData.institution.logo ||
        (await getLogoUsingURL(institutionData.institution.url)));

    if (accountData && institutionData) {
      for (const account of accountData.accounts) {
        const dbData = {
          access_token: accessToken,
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
          institution_url: institutionData.institution.url || null,
        };

        await addInstitutionConnectionData(dbData);
      }
    }

    revalidatePath("/connections");
  } catch (error) {
    console.error("Error (processConnection):", error);
  }
};

export const checkConnectionStatus = async (accessToken: string) => {
  try {
    await plaidClient.accountsGet({
      access_token: accessToken,
    });

    return { error: null };
  } catch (error: any) {
    const errorCode = error?.response?.data?.error_code;
    return { error: errorCode || "UNKNOWN_ERROR" };
  }
};

export const getTransactions = async () => {
  const connections = await getInstitutionConnectionData();

  if (!connections) return [];

  try {
    const allTransactions = await Promise.all(
      connections.map(async (connection) => {
        const billingDates = getBillingDates(connection.billing_cycle);
        const transactions = await plaidClient.transactionsGet({
          access_token: connection.access_token,
          start_date: billingDates.startDate,
          end_date: billingDates.endDate,
        });

        return {
          account: {
            id: connection.account_id,
            givenName: connection.given_name,
            officialName: connection.official_name,
            name: connection.name,
            mask: connection.mask,
            institutionColor: connection.institution_color,
            institutionLogo: connection.institution_logo,
            billingCycle: connection.billing_cycle,
          },
          transactions: transactions.data.transactions,
        };
      })
    );

    return allTransactions;
  } catch (error) {
    console.error("Error (getTransactions):", error);
  }
};
