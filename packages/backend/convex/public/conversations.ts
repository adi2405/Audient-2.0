import { ConvexError, v } from "convex/values";

import { mutation, query } from "../_generated/server";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }

    // This refreshes the user's session if they are within the threshold
    // await ctx.runMutation(internal.system.contactSessions.refresh, {
    //   contactSessionId: args.contactSessionId,
    // });

    // const widgetSettings = await ctx.db
    //   .query("widgetSettings")
    //   .withIndex("by_organization_id", (q) =>
    //     q.eq("organizationId", args.organizationId)
    //   )
    //   .unique();

    // const { threadId } = await supportAgent.createThread(ctx, {
    //   userId: args.organizationId,
    // });

    // await saveMessage(ctx, components.agent, {
    //   threadId,
    //   message: {
    //     role: "assistant",
    //     content:
    //       widgetSettings?.greetMessage ||
    //       "Hello there! How can I assist you today?",
    //   },
    // });

    const threadId = "123";

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId: args.organizationId,
      threadId,
    });

    return conversationId;
  },
});

export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    if (conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Incorrect session",
      });
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});
