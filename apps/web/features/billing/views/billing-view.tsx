"use client";

import { PricingTable } from "../components/pricing-table";

export function BillingView() {
  return (
    <div className="flex min-h-screen flex-col bg-muted p-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Choose the plan that&apos;s right for you
          </p>
        </div>
        <div className="mt-8">
          <PricingTable />
        </div>
      </div>
    </div>
  );
}
