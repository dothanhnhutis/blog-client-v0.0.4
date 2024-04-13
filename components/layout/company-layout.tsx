import React from "react";
import Header from "../../app/(company)/header";
import Footer from "../../app/(company)/footer";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
