"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";

interface Props {
  organizationId: string;
}

export function WidgetView({ organizationId }: Props) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    auth: <WidgetAuthScreen />,
    chat: <p>Chat</p>,
    contact: <p>Contact</p>,
    error: <WidgetErrorScreen />,
    inbox: <p>Inbox</p>,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <p>Selection</p>,
    voice: <p>Voice</p>,
  };

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
}
