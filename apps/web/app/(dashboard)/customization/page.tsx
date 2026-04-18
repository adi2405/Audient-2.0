import { Show } from "@clerk/nextjs";

import { CustomizationView } from "@/features/customization/views/customization-view";
import { PremiumFeatureOverlay } from "@/features/billing/components/premium-feature-overlay";

export default function Page() {
  return (
    <Show
      when={{ plan: "premium" }}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Show>
  );
}
