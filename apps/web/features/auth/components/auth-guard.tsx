"use client";

import { Loader } from "lucide-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

import { SignInView } from "../views/sign-in-view";
import { AuthLayout } from "../layouts/auth-layout";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <div className="flex items-center justify-center gap-2">
            <Loader className="animate-spin text-primary" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
}
