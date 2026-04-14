"use client";

import { useQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";

import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";

export function WidgetChatScreen() {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const conversationId = useAtomValue(conversationIdAtom);

  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button size={"icon"} variant={"transparent"} onClick={onBack}>
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button size={"icon"} variant={"transparent"}>
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        {JSON.stringify(conversation)}
      </div>
    </>
  );
}
