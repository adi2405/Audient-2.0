import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
