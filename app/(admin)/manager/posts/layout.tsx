import React from "react";
import SiderBarComponent from "../../../../components/sidebar-component";
import { getCurrentUser } from "@/service/api/user";

const UserManagerLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative flex">
      <SiderBarComponent role={currentUser?.role || "CUSTOMER"} />
      {children}
    </div>
  );
};

export default UserManagerLayout;
