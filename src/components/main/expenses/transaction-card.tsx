"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Transaction } from "plaid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TransactionCardProps = {
  transaction: Transaction;
  accountName?: string;
  accountMap?: Map<string, string>;
};

export default function TransactionCard({
  transaction,
  accountName,
  accountMap,
}: TransactionCardProps) {
  // Use accountName if provided, otherwise look up by account_id
  const displayAccountName =
    accountName || accountMap?.get(transaction.account_id) || "";

  return (
    <Card className={cn(transaction.pending && "pending-transaction")}>
      <CardContent className="p-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="transaction" className="border-b-0">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex items-center justify-between gap-x-4 w-full pr-4">
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
                  <div className="text-left">
                    <p
                      className="font-medium truncate w-36 md:w-64 xl:w-96"
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
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:flex gap-x-8 gap-y-4 xl:justify-between font-medium">
                <div>
                  <p className="text-muted-foreground">Card Name</p>
                  <p>{displayAccountName || "N/A"}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Authorized Date</p>
                  <p>{transaction.authorized_date || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Posted Date</p>
                  <p>{transaction.date || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p>
                    {transaction.location?.city && transaction.location?.region
                      ? `${transaction.location.city}, ${transaction.location.region}`
                      : transaction.location?.city ||
                        transaction.location?.region ||
                        "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p>{transaction.pending ? "Pending" : "Posted"}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
