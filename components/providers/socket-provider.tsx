"use client";
import configs from "@/config";
import { Contact } from "@/schemas/contact";
import React from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import crypto from "crypto-js";

type SocketContext = {
  notifications: Contact[];
  sessionID: string;
};

const initData: SocketContext = {
  notifications: [],
  sessionID: "",
};

const socketContext = createContext(initData);
const isSSR = typeof window === "undefined";

export const useSocket = () => {
  const socketData = React.useContext(socketContext);
  return socketData;
};
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<SocketContext>(() => {
    if (!isSSR) {
      const sessionID =
        window.localStorage.getItem("sessionId") ||
        crypto.MD5(new Date().toISOString()).toString();
      window.localStorage.setItem("sessionId", sessionID);
      initData.sessionID = sessionID;
    }
    return initData;
  });

  React.useEffect(() => {
    const socket = io(configs.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket", "polling"],
      secure: true,
    });

    socket.on("connect", () => {
      console.log(`Connected to server`);
    });

    socket.on("contact", (data: Contact) => {
      setData((prev) => ({
        ...prev,
        notifications: [...prev.notifications, data],
      }));
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from server`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <socketContext.Provider value={data}>{children}</socketContext.Provider>
  );
}
