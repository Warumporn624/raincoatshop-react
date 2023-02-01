import DocumentTitle from "react-document-title";
import React from "react";

import TopNav from "../shared/user/navbar/TopNav";
import MiddleNav from "../shared/user/navbar/MiddleNav";
import BottomNav from "../shared/user/navbar/BottomNav";
import Footer from "../shared/user/Footer";

const LayoutUser = ({ children, title = "User" }) => {
  return (
    <>
      <DocumentTitle title={title + " | Raincoat Aurora"} />
      <div className="wrapper">
        <TopNav />
        <MiddleNav />
        <BottomNav />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default LayoutUser;
