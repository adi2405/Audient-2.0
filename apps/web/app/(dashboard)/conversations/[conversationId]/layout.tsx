import { ConversationIdLayout } from "@/features/dashboard/layouts/conversation-id-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConversationIdLayout>{children}</ConversationIdLayout>;
}
