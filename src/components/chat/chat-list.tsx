import { Message, UserData } from "@/app/data";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { motion } from "framer-motion";

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  isLoading: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
  isLoading,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full min-h-[250px] flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        {messages?.map((message, index) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: "spring",
                bounce: 0,
                duration: 0,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.name !== selectedUser.name ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-3 items-center">
              {message.name === selectedUser.name && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={message.avatar}
                    alt={message.name}
                    width={6}
                    height={6}
                  />
                </Avatar>
              )}
              <span className="bg-accent p-3 rounded-md max-w-xs">
                {message.message}
              </span>
              {message.name !== selectedUser.name && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={message.avatar}
                    alt={message.name}
                    width={6}
                    height={6}
                  />
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
      <ChatBottombar
        sendMessage={sendMessage}
        isMobile={isMobile}
        isLoading={isLoading}
      />
    </div>
  );
}
