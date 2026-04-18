import { ContactPanel } from "../components/contact-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

export function ConversationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup className="h-full flex-1" orientation="horizontal">
      <ResizablePanel className="h-full" defaultSize={"60%"}>
        <div className="flex h-full flex-1 flex-col">{children}</div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:block" />
      <ResizablePanel
        defaultSize={"40%"}
        maxSize={"40%"}
        minSize={"20%"}
        className="hidden lg:block"
      >
        <ContactPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
