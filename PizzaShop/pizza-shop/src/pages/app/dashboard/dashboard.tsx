import { Helmet } from "react-helmet-async";
import { MonthOrdersAmountCard } from "./month-orders-amount-card";
import { MonthRevenueCard } from "./month-revenue-card";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCancelledOrdersAmountCard } from "./month-cancelled-orders-amoun-cardt";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCancelledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-8">
          <RevenueChart />

          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
