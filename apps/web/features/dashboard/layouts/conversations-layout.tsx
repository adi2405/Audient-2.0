import { ConversationsPanel } from "../components/conversations-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

export function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup className="h-full flex-1" orientation="horizontal">
      <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full" defaultSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
