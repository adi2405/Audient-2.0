"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface Props {
  organizationId: string;
}

export function WidgetView({ organizationId }: Props) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    auth: <WidgetAuthScreen />,
    chat: <p>Chat</p>,
    contact: <p>Contact</p>,
    error: <p>Error</p>,
    inbox: <p>Inbox</p>,
    loading: <p>Loading</p>,
    selection: <p>Selection</p>,
    voice: <p>Voice</p>,
  };

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
}
