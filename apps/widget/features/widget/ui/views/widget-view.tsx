"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetInboxScreen } from "../screens/widget-inbox-screen";
import { WidgetVoiceScreen } from "../screens/widget-voice-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetContactScreen } from "../screens/widget-contact-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";

interface Props {
  organizationId: string;
}

export function WidgetView({ organizationId }: Props) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    auth: <WidgetAuthScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
    error: <WidgetErrorScreen />,
    inbox: <WidgetInboxScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <WidgetSelectionScreen />,
    voice: <WidgetVoiceScreen />,
  };

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
}
