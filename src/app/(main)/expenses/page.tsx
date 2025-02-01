import { getTransactions } from "@/lib/api/plaid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sortByDate } from "@/lib/utils/dates";
import PageHeader from "@/components/main/page-header";
import { Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "plaid";
import CreditCard from "@/components/main/credit-card";

export default async function Expenses() {
  const txs = (await getTransactions()) || [];
  const allTxs = txs
    ?.map((obj) => {
      return obj.transactions;
    })
    .flat()
    .sort(sortByDate);

  const transactionsMarkup = (transactions: Transaction[]) => {
    return transactions.map((transaction: Transaction) => (
      <Card
        key={transaction.transaction_id}
        className={cn(transaction.pending && "pending-transaction")}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 w-1/2">
              <div className="w-10 h-10 flex-shrink-0">
                <img
                  className="bg-gray-200 rounded-full"
                  src={
                    transaction.logo_url ||
                    (transaction.counterparties &&
                      transaction.counterparties[0]?.logo_url) ||
                    transaction.personal_finance_category_icon_url
                  }
                  alt={transaction.merchant_name || transaction.name}
                />
              </div>
              <div>
                <p
                  className="font-medium truncate w-36 md:w-72 xl:w-96"
                  title={transaction.name}
                >
                  {transaction.merchant_name || transaction.name}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {transaction.authorized_date || transaction.date}{" "}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex w-1/4">
              <Badge className="badge mx-auto" variant="secondary">
                {transaction.category
                  ? transaction.category[0]
                  : "Uncategorized"}
              </Badge>
            </div>
            <div className="flex-col ml-auto w-1/4">
              <p
                className={cn(
                  "font-mono font-medium text-right",
                  transaction.amount < 0 && "text-green-400",
                  transaction.category?.[0]?.includes("Fees") &&
                    "text-yellow-400"
                )}
              >
                {`${
                  transaction.iso_currency_code === "USD" && "$"
                }${transaction.amount.toFixed(2)}`}
              </p>
              {transaction.pending && (
                <p className="font-medium text-sm text-right">Pending</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <main>
      <PageHeader title="Expenses" icon={Wallet} />

      {txs && (
        <Tabs defaultValue="all">
          <TabsList
            className={cn("grid w-full gap-2", `grid-cols-${txs.length + 1}`)}
          >
            <TabsTrigger value="all">All</TabsTrigger>
            {txs?.map(({ account }) => (
              <TabsTrigger key={account.id} value={account.id}>
                <CreditCard
                  mask={account.mask}
                  logo={account.institutionLogo}
                  bgColor={account.institutionColor}
                />
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-2">
              <p className="text-center my-4 font-medium">All Transactions</p>

              {transactionsMarkup(allTxs)}
            </div>
          </TabsContent>
          {txs?.map(({ account, transactions }) => (
            <TabsContent key={account.id} value={account.id}>
              <div className="grid grid-cols-1 gap-2">
                <p className="text-center my-4 font-medium">
                  {account.givenName || account.officialName || account.name}
                </p>
                {transactionsMarkup(transactions)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </main>
  );
}
