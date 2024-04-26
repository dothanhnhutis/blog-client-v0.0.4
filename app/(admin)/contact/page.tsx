"use client";
import { useSocket } from "@/components/providers/socket-provider";
import React from "react";

const ContactPage = () => {
  const socketData = useSocket();
  return (
    <div>
      {socketData.notifications.map((notifications) => (
        <div key={notifications.createdAt}>{notifications.description}</div>
      ))}
    </div>
  );
};

export default ContactPage;
