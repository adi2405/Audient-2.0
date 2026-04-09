"use client";

import { Button } from "@workspace/ui/components/button";
import { useVapi } from "@/features/widget/hooks/use-vapi";

export default function Page() {
  const {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
        <div className="flex gap-x-4">
          <Button onClick={() => startCall()}>Start call</Button>
          <Button variant={"destructive"} onClick={() => endCall()}>
            End call
          </Button>
        </div>
        <p>Is Connected: {`${isConnected}`}</p>
        <p>Is Connecting: {`${isConnecting}`}</p>
        <p>Is Speaking: {`${isSpeaking}`}</p>
        <p>{JSON.stringify(transcript, null, 2)}</p>
      </div>
    </div>
  );
}
