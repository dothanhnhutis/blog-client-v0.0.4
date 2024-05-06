import configs from "@/config";
import { io } from "socket.io-client";

export const socket = io(configs.NEXT_PUBLIC_SERVER_URL, {
  transports: ["websocket", "polling"],
  secure: true,
});
