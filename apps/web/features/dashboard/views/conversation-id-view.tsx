"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react";
import { useAction, useMutation, useQuery } from "convex/react";
import {
  toUIMessages,
  type UIMessage,
  useThreadMessages,
} from "@convex-dev/agent/react";

import { cn } from "@workspace/ui/lib/utils";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { Field, FieldError, FieldGroup } from "@workspace/ui/components/field";
import { DicebearAvatar } from "@workspace/ui/components/custom/dicebear-avatar";
import { ConversationStatusButton } from "../components/conversation-status-button";
import { InfiniteScrollTrigger } from "@workspace/ui/components/custom/infinite-scroll-trigger";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";

const getMessageContent = (message: UIMessage): string => {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
};

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export function ConversationIdView({
  conversationId,
}: {
  conversationId: Id<"conversations">;
}) {
  const conversation = useQuery(api.private.conversations.getOne, {
    conversationId,
  });

  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );

  const uiMessages = useMemo(() => {
    return toUIMessages(messages.results ?? [])
      .map((message) => ({
        ...message,
        textContent: getMessageContent(message),
      }))
      .filter((message) => message.textContent.length > 0);
  }, [messages.results]);

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const [isEnhancing, setIsEnhancing] = useState(false);
  const enhanceResponse = useAction(api.private.messages.enhanceResponse);
  const handleEnhanceResponse = async () => {
    setIsEnhancing(true);
    const currentValue = form.getValues("message");

    try {
      const response = await enhanceResponse({ prompt: currentValue });

      form.setValue("message", response);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const createMessage = useMutation(api.private.messages.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createMessage({
        conversationId,
        prompt: values.message,
      });

      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const updateConversationStatus = useMutation(
    api.private.conversations.updateStatus
  );
  const handleToggleStatus = async () => {
    if (!conversation) {
      return;
    }

    setIsUpdatingStatus(true);

    let newStatus: "unresolved" | "resolved" | "escalated";

    // Cycle through states: unresolved -> escalated -> resolved
    if (conversation.status === "unresolved") {
      newStatus = "escalated";
    } else if (conversation.status === "escalated") {
      newStatus = "resolved";
    } else {
      newStatus = "unresolved";
    }

    try {
      await updateConversationStatus({
        conversationId,
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (conversation === undefined || messages.status === "LoadingFirstPage") {
    return <ConversationIdViewLoading />;
  }

  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-end border-b bg-background p-2.5">
        {!!conversation && (
          <ConversationStatusButton
            onClick={handleToggleStatus}
            status={conversation?.status}
            disabled={isUpdatingStatus}
          />
        )}
      </header>
      <AIConversation className="max-h-[calc(100vh-190px)]">
        <AIConversationContent>
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />
          {uiMessages.map((message) => (
            <AIMessage
              // In reverse, because we are watching from "assistant's" perspective
              from={message.role === "user" ? "assistant" : "user"}
              key={message.id}
              className="items-start"
            >
              <AIMessageContent>
                <AIResponse>{getMessageContent(message)}</AIResponse>
              </AIMessageContent>
              {message.role === "user" && (
                <DicebearAvatar
                  seed={conversation?.contactSessionId ?? "user"}
                  size={32}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>
      <div className="p-2">
        <AIInput onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="message"
              control={form.control}
              disabled={conversation?.status === "resolved"}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <AIInputTextarea
                    aria-invalid={fieldState.invalid}
                    disabled={
                      conversation?.status === "resolved" ||
                      form.formState.isSubmitting ||
                      isEnhancing
                    }
                    onChange={field.onChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    placeholder={
                      conversation?.status === "resolved"
                        ? "This conversation has been resolved"
                        : "Type your response as an operator..."
                    }
                    value={field.value}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton
                  onClick={handleEnhanceResponse}
                  disabled={
                    conversation?.status === "resolved" ||
                    isEnhancing ||
                    !form.formState.isValid
                  }
                >
                  <Wand2Icon />
                  {isEnhancing ? "Enhancing..." : "Enhance"}
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit
                disabled={
                  conversation?.status === "resolved" ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  isEnhancing
                }
                status="ready"
                type="submit"
              />
            </AIInputToolbar>
          </FieldGroup>
        </AIInput>
      </div>
    </div>
  );
}

export function ConversationIdViewLoading() {
  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-end border-b bg-background p-2.5">
        <Skeleton className="h-7 w-24.5" />
      </header>
      <AIConversation className="max-h-[calc(100vh-190px)]">
        <AIConversationContent>
          {Array.from({ length: 8 }, (_, index) => {
            const isUser = index % 2 === 0;
            const widths = ["w-48", "w-60", "w-72"];
            const width = widths[index % widths.length];
            return (
              <div
                key={index}
                className={cn(
                  "group flex w-full items-start justify-end gap-2 py-2 [&>div]:max-w-[80%]",
                  isUser ? "is-user" : "is-assistant flex-row-reverse"
                )}
              >
                <Skeleton
                  className={`h-9 ${width} rounded-lg bg-neutral-200`}
                />
                <Skeleton className="size-8 rounded-full bg-neutral-200" />
              </div>
            );
          })}
        </AIConversationContent>
      </AIConversation>
      <div className="p-2">
        <AIInput className="space-y-5">
          <AIInputTextarea
            disabled
            placeholder="Type your response as an operator..."
          />
          <AIInputToolbar>
            <AIInputTools>
              <AIInputButton disabled>
                <Wand2Icon />
                Enhance
              </AIInputButton>
            </AIInputTools>
            <AIInputSubmit disabled status="ready" />
          </AIInputToolbar>
        </AIInput>
      </div>
    </div>
  );
}
