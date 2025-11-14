import { getTransactions } from "@/lib/api/plaid";
import { cn } from "@/lib/utils";
import { sortByDate } from "@/lib/utils/dates";
import PageHeader from "@/components/main/page-header";
import { Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "plaid";
import CreditCard from "@/components/main/credit-card";
import { getTotal } from "@/lib/utils/transactions";
import Alert from "@/components/common/alert";
import TransactionCard from "@/components/main/expenses/transaction-card";

export default async function Expenses() {
  const txs = (await getTransactions()) || [];

  // Create account map for lookup
  const accountMap = new Map(
    txs.map((obj) => [
      obj.account.id,
      obj.account.givenName || obj.account.officialName || obj.account.name,
    ])
  );

  const allTxs = txs
    ?.map((obj) => {
      return obj.transactions;
    })
    .flat()
    .sort(sortByDate);

  const headerMarkup = (headerText: string, transactions: Transaction[]) => {
    return (
      <p className="grid gap-2 mx-4 my-4 font-medium text-center">
        <span>{headerText}</span>
        <span className="text-muted-foreground font-mono">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(getTotal(transactions))}
        </span>
      </p>
    );
  };

  const transactionsMarkup = (
    transactions: Transaction[],
    accountName?: string
  ) => {
    return transactions.map((transaction: Transaction) => (
      <TransactionCard
        key={transaction.transaction_id}
        transaction={transaction}
        accountName={accountName}
        accountMap={accountMap}
      />
    ));
  };

  return (
    <main>
      <PageHeader title="Expenses" icon={Wallet} />

      {txs.length === 0 && (
        <Alert type="warning">
          No transactions found. Please verify your account connections.
        </Alert>
      )}

      {txs?.length > 0 && (
        <Tabs defaultValue="all">
          <TabsList className={cn("grid w-full gap-2", `grid-cols-6`)}>
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
              {headerMarkup("All Transactions", allTxs)}
              {transactionsMarkup(allTxs)}
            </div>
          </TabsContent>
          {txs?.map(({ account, transactions }) => (
            <TabsContent key={account.id} value={account.id}>
              <div className="grid grid-cols-1 gap-2">
                {headerMarkup(
                  account.givenName || account.officialName || account.name,
                  transactions
                )}
                {transactionsMarkup(
                  transactions,
                  account.givenName || account.officialName || account.name
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </main>
  );
}
