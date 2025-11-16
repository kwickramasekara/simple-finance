import { getTransactions } from "@/lib/api/plaid";
import { cn, sortByDate } from "@/lib/utils";
import PageHeader from "@/components/main/page-header";
import { Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "plaid";
import CreditCard from "@/components/main/credit-card";
import Alert from "@/components/common/alert";
import TransactionCard from "@/components/main/expenses/transaction-card";
import CardSummary from "@/components/main/expenses/card-summary";

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
              <CardSummary
                headerText="All Transactions"
                transactions={allTxs}
              />
              {allTxs.map((transaction: Transaction) => (
                <TransactionCard
                  key={transaction.transaction_id}
                  transaction={transaction}
                  accountMap={accountMap}
                />
              ))}
            </div>
          </TabsContent>
          {txs?.map(({ account, transactions }) => (
            <TabsContent key={account.id} value={account.id}>
              <div className="grid grid-cols-1 gap-2">
                <CardSummary
                  headerText={
                    account.givenName || account.officialName || account.name
                  }
                  transactions={transactions}
                />
                {transactions.map((transaction: Transaction) => (
                  <TransactionCard
                    key={transaction.transaction_id}
                    transaction={transaction}
                    accountMap={accountMap}
                    accountName={
                      account.givenName || account.officialName || account.name
                    }
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </main>
  );
}
