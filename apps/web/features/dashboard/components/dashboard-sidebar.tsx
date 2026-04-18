"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  LucideIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="overflow-hidden text-xs whitespace-nowrap text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className={cn(
                  isActive(item.url) &&
                    "bg-linear-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!"
                )}
              >
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

  const customerSupportItems: MenuItem[] = [
    {
      title: "Conversations",
      url: "/conversations",
      icon: InboxIcon,
    },
    {
      title: "Knowledge Base",
      url: "/files",
      icon: LibraryBigIcon,
    },
  ];

  const configurationItems: MenuItem[] = [
    {
      title: "Widget Customization",
      url: "/customization",
      icon: PaletteIcon,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Voice Assistant",
      url: "/plugins/vapi",
      icon: SparklesIcon,
    },
  ];

  const accountItems: MenuItem[] = [
    {
      title: "Plans & Billing",
      url: "/billing",
      icon: CreditCardIcon,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        <Link href={"/"} className="flex items-center gap-2 pl-1 select-none">
          <Image src="/logo.svg" alt="Audient" width={24} height={24} />
          <span className="overflow-hidden font-semibold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
            Audient
          </span>
        </Link>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-[33.6px] w-full rounded-md border bg-white group-data-[collapsible=icon]:size-8" />
              }
              appearance={{
                elements: {
                  rootBox: "w-full! group-data-[collapsible=icon]:w-auto!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-sm!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-sm!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationSwitcherPopoverCard: "pointer-events-auto",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="mt-2 border-border" />
      <SidebarContent className="overflow-hidden pt-2">
        <NavSection
          label="Customer Support"
          items={customerSupportItems}
          pathname={pathname}
        />
        <NavSection
          label="Configuration"
          items={configurationItems}
          pathname={pathname}
        />
        <NavSection label="Account" items={accountItems} pathname={pathname} />
      </SidebarContent>
      <hr className="border-border" />
      <SidebarFooter className="gap-3 overflow-hidden py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className="h-[33.6px] w-full rounded-md border border-border bg-white group-data-[collapsible=icon]:size-8" />
              }
              appearance={{
                elements: {
                  rootBox: "w-full! group-data-[collapsible=icon]:w-auto!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "min-w-0! truncate! text-sm! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                  userButtonPopoverCard: "pointer-events-auto",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
