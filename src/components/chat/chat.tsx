import { Message, UserData } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import { useState } from "react";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<Message[]>(messages ?? []);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "user", content: newMessage.message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        const aiMessage: Message = {
          id: Date.now(),
          name: selectedUser.name,
          avatar: selectedUser.avatar,
          message: "",
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedMessages = prevMessages.slice(0, -1);
            return [
              ...updatedMessages,
              { ...lastMessage, message: lastMessage.message + chunk },
            ];
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          name: selectedUser.name,
          avatar: selectedUser.avatar,
          message:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        isLoading={isLoading}
      />
    </div>
  );
}
