"use client";
import configs from "@/config";
import { Contact } from "@/schemas/contact";
import React, { useRef, useState } from "react";
import { createContext } from "react";
import { io, Socket as SocketClient } from "socket.io-client";
import crypto from "crypto-js";

type SocketContext = {
  socket?: SocketClient;
  sessionID: string;
};

const initData: SocketContext = {
  sessionID: "",
};

const socketContext = createContext(initData);

const isSSR = typeof window === "undefined";

export const useSocket = () => {
  const socketData = React.useContext(socketContext);
  return socketData;
};

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setConnected] = useState(false);

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
  const socketRef = useRef(null);

  React.useEffect(() => {
    if (!isConnected) {
      socketRef.current = io(configs.NEXT_PUBLIC_SERVER_URL, {
        transports: ["websocket", "polling"],
        secure: true,
      });
    }

    // socket.on("connect", () => {
    //   console.log(`connect from server: ${socket.id}`);
    // });

    // socket.on("contact", (data: Contact) => {
    //   console.log(data);
    // });

    // setData((prev) => ({ ...prev, socket }));

    // socket.on("disconnect", () => {
    //   console.log(`Disconnected from server`);
    // });
    return () => {
      if (socketRef.current && socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <socketContext.Provider value={data}>{children}</socketContext.Provider>
  );
}
