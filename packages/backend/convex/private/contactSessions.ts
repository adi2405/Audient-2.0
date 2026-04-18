import { ConvexError, v } from "convex/values";

import { query } from "../_generated/server";
import { requireOrgIdentity } from "../lib/requireOrg";

export const getOneByConversationId = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const { orgId } = await requireOrgIdentity(ctx);

    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    if (conversation.organizationId !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "invalid Organization ID",
      });
    }

    const contactSession = await ctx.db.get(conversation.contactSessionId);

    return contactSession;
  },
});
