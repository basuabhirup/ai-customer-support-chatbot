export const userData = [
  {
    avatar: "/User1.png",
    messages: [
      {
        id: 1,
        avatar: "/User1.png",
        name: "AI Customer Support Chatbot",
        message: "Hey, Abhirup",
      },
      {
        id: 2,
        avatar: "/LoggedInUser.jpg",
        name: "Abhirup Basu",
        message: "Hey!",
      },
      {
        id: 3,
        avatar: "/User1.png",
        name: "AI Customer Support Chatbot",
        message: "How are you?",
      },
      {
        id: 4,
        avatar: "/LoggedInUser.jpg",
        name: "Abhirup Basu",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar: "/User1.png",
        name: "AI Customer Support Chatbot",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: "/LoggedInUser.jpg",
        name: "Abhirup Basu",
        message: "That is good to hear!",
      },
    ],
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Abhirup Basu",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
