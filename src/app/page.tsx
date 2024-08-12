import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="border rounded-lg max-w-5xl w-full max-h-[90vh] text-sm lg:flex">
        <ChatLayout />
      </div>
    </main>
  );
}
