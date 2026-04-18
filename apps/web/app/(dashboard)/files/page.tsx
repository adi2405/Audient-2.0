import { Show } from "@clerk/nextjs";

import { FilesView } from "@/features/files/views/files-view";
import { PremiumFeatureOverlay } from "@/features/billing/components/premium-feature-overlay";

export default function Page() {
  return (
    <Show
      when={{ plan: "premium" }}
      fallback={
        <PremiumFeatureOverlay>
          <FilesView />
        </PremiumFeatureOverlay>
      }
    >
      <FilesView />
    </Show>
  );
}
