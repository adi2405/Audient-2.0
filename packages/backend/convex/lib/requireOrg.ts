import { ConvexError } from "convex/values";

export async function requireOrgIdentity(ctx: { auth: any }) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Identity not found",
    });
  }

  const orgId = (identity.o as { id?: string } | undefined)?.id;

  if (!orgId) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Organization not found",
    });
  }

  return { identity, orgId };
}
