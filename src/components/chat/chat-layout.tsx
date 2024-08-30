"use client";

import { userData } from "@/app/data";
import { useEffect, useState } from "react";
import { Chat } from "./chat";

export function ChatLayout() {
  const [selectedUser] = useState({
    id: 0,
    name: "AI Support Assistant",
    avatar: "/ai-avatar.png", // Add an appropriate avatar image for the AI
    messages: [],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <Chat
      messages={selectedUser.messages}
      selectedUser={selectedUser}
      isMobile={isMobile}
    />
  );
}
