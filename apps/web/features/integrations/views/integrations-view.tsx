"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { CheckCheckIcon, CopyIcon } from "lucide-react";

import { createScript } from "../utils";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { IntegrationId, INTEGRATIONS } from "../constants";
import { Separator } from "@workspace/ui/components/separator";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

export function IntegrationsViews() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  const [copied, setCopied] = useState(false);

  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      setCopied(true);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Integrations & Setup</h1>
            <p className="text-muted-foreground">
              Choose the integration that&apos;s right for you
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Card>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Label className="w-34" htmlFor="organization-id">
                    Organization ID
                  </Label>
                  <Input
                    id="organization-id"
                    readOnly
                    value={organization?.id ?? ""}
                    disabled
                    className="flex-1 bg-background text-sm"
                  />
                  <Button
                    disabled={copied}
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCheckIcon className="size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="size-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-8" />
          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-lg">Integrations</Label>
              <p className="text-sm text-muted-foreground">
                Add the following code to your website to enable the chatbot
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  key={integration.id}
                  type="button"
                  onClick={() => handleIntegrationClick(integration.id)}
                  className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                >
                  <Image
                    src={integration.icon}
                    alt={integration.title}
                    height={32}
                    width={32}
                  />
                  <p>{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbot to your website
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-sm">1. Copy the following code</h1>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto rounded-md bg-foreground p-2 font-mono text-sm break-all whitespace-pre-wrap text-secondary">
                {snippet}
              </pre>
              <Button
                size={"icon"}
                variant={"secondary"}
                disabled={copied}
                onClick={handleCopy}
                className="absolute top-4 right-4 size-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-sm">2. Add the code in your page</h1>
            <div className="rounded-md bg-accent p-2 text-sm text-muted-foreground">
              Paste the chatbot code above in your page. You can add it in the
              HTML head section.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
