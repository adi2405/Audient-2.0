import { Show } from "@clerk/nextjs";

import { VapiView } from "@/features/plugins/views/vapi-view";
import { PremiumFeatureOverlay } from "@/features/billing/components/premium-feature-overlay";

export default function Page() {
  return (
    <Show
      when={{ plan: "premium" }}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Show>
  );
}
