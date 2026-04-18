"use client";

import { useRouter } from "next/navigation";
import {
  type LucideIcon,
  BotIcon,
  GemIcon,
  LibraryBigIcon,
  PaletteIcon,
  PhoneIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: UsersIcon,
    label: "Team Access",
    description: "Up to 5 operators per organization",
  },
  {
    icon: PhoneIcon,
    label: "Phone System",
    description: "Inbound & Outbound calling capabilities",
  },
  {
    icon: SparklesIcon,
    label: "AI Voice Agent",
    description: "Natural voice conversations with customers",
  },
  {
    icon: LibraryBigIcon,
    label: "Knowledge Base",
    description: "Train AI on your documentation",
  },
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "Intelligent automated responses 24/7",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance",
  },
];

export function PremiumFeatureOverlay({
  children,
}: PremiumFeatureOverlayProps) {
  const router = useRouter();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Blurred Background Content */}
      <div className="pointer-events-none blur-[2px] select-none">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Upgrade prompt */}
      <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
                <GemIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl">Premium Feature</CardTitle>
            <CardDescription>
              This feature requires a premium subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                    <feature.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              size={"lg"}
              onClick={() => router.push("/billing")}
              className="w-full"
            >
              View Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
