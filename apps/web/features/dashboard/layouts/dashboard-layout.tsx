import { cookies } from "next/headers";
import { Provider } from "jotai/react";

import { AuthGuard } from "@/features/auth/components/auth-guard";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { TooltipProvider } from "@workspace/ui/components/tooltip";

export async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <TooltipProvider delayDuration={0}>
        <Provider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar />
            <main className="flex flex-1 flex-col">{children}</main>
          </SidebarProvider>
        </Provider>
      </TooltipProvider>
    </AuthGuard>
  );
}
