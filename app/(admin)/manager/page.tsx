import React from "react";
import SiderBarComponent from "@/components/sidebar-component";
import { getCurrentUser } from "@/service/api/user";

const ManagerPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="relative flex">
      <SiderBarComponent role={currentUser?.role || "CUSTOMER"} />
      <div className="h-[2000px]">ManagerPage</div>
    </div>
  );
};

export default ManagerPage;
