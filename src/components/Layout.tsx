import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode; homePage?: boolean }> = ({
  children,
  homePage = false,
}) => {
  return (
    <div
      className={`flex flex-col justify-between h-full p-10 ${
        homePage && 'bg-[url("/images/home.png")] bg-center bg-cover'
      }`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
