import { SocketProvider } from "@/components/providers/socket-provider";
import React from "react";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SocketProvider>
        <div className="relative flex bg-muted/50">{children}</div>
      </SocketProvider>
    </main>
  );
};

export default AccountLayout;
