import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/main/page-header";
import { PiggyBank } from "lucide-react";
import { getLatestNetWorthAssets, getRetirementData } from "@/lib/api/db";
import { SavingProgress } from "@/components/main/retirement/saving-progress";
import currency from "currency.js";
import NoData from "@/components/common/no-data";

export default async function Retirement() {
  const netWorthData = await getLatestNetWorthAssets();
  const retirementData = await getRetirementData();

  const valTotalBal =
    retirementData?.retirement_assets?.reduce(
      (acc, asset) => acc.add(netWorthData?.[asset] || 0),
      currency(0)
    ).value || 0;

  const valHsaBal =
    retirementData?.hsa_assets?.reduce(
      (acc, asset) => acc.add(netWorthData?.[asset] || 0),
      currency(0)
    ).value || 0;

  return (
    <main>
      <PageHeader title="Retirement" icon={PiggyBank}></PageHeader>

      {(!netWorthData || !retirementData) && (
        <NoData description="Please verify if you have added assets and goals." />
      )}

      {netWorthData && retirementData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Short-term Goals</CardTitle>
              <CardDescription>
                Retirement savings goals for the next 5-10 years.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <SavingProgress
                  id="totalBalShort"
                  label="Total Balance"
                  valCurrent={valTotalBal}
                  valGoal={retirementData?.total_balance_goal_short_term || 0}
                />
                <SavingProgress
                  id="hsaBalShort"
                  label="HSA Balance"
                  valCurrent={valHsaBal}
                  valGoal={retirementData?.hsa_balance_goal_short_term || 0}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Long-term Goals</CardTitle>
              <CardDescription>
                Savings goals for post-retirement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <SavingProgress
                  id="totalBalLong"
                  label="Total Balance"
                  valCurrent={valTotalBal}
                  valGoal={retirementData?.total_balance_goal_long_term || 0}
                />
                <SavingProgress
                  id="hsaBalLong"
                  label="HSA Balance"
                  valCurrent={valHsaBal}
                  valGoal={retirementData?.hsa_balance_goal_long_term || 0}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
