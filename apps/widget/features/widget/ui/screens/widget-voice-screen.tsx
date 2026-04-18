import { useSetAtom } from "jotai";
import { ArrowLeftIcon, MicIcon, PhoneIcon, PhoneOffIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { useVapi } from "../../hooks/use-vapi";
import { screenAtom } from "../../atoms/widget-atoms";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import { DicebearAvatar } from "@workspace/ui/components/custom/dicebear-avatar";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";

export function WidgetVoiceScreen() {
  const setScreen = useSetAtom(screenAtom);
  const {
    isConnecting,
    isConnected,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            variant={"transparent"}
            size={"icon"}
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p>Voice Chat</p>
        </div>
      </WidgetHeader>
      {transcript.length > 0 ? (
        <AIConversation>
          <AIConversationContent>
            {transcript.map((message, index) => (
              <AIMessage
                key={`${message.role}-${index}-${message.text}`}
                from={message.role}
                className="items-start"
              >
                <AIMessageContent>{message.text}</AIMessageContent>
                {message.role === "assistant" && (
                  <DicebearAvatar
                    imageUrl="/logo.svg"
                    seed="assistant"
                    size={32}
                  />
                )}
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      ) : (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
          <div className="flex items-center justify-center rounded-full border bg-white p-3">
            <MicIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Transcript will appear here</p>
        </div>
      )}
      <div className="border-t bg-background p-4">
        <div className="flex flex-col items-center gap-y-4">
          {isConnected && (
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "size-4 animate-pulse rounded-full",
                  isSpeaking ? "bg-red-500" : "bg-green-500"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
              </span>
            </div>
          )}
          <div className="flex w-full justify-center">
            {isConnected ? (
              <Button
                size={"lg"}
                variant={"destructive"}
                onClick={() => endCall()}
                className="w-full"
              >
                <PhoneOffIcon />
                End Call
              </Button>
            ) : (
              <Button
                size={"lg"}
                onClick={() => startCall()}
                disabled={isConnecting}
                className="w-full"
              >
                <PhoneIcon />
                Start Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
