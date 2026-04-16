import { ConversationsLayout } from "@/features/dashboard/layouts/conversations-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConversationsLayout>{children}</ConversationsLayout>;
}
