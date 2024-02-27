import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import AdminNav from "../components/adminNav/AdminNav";
const Wrapper = ({ children }) => {
  const [side, setSide] = useState("-left-64 md:left-0");

  console.log(side);
  const openSidebar = () => {
    setSide("left-0 md:-left-64");
  };
  const closeSidebar = () => {
    setSide("-left-64 md:left-0");
  };

  return (
    <>
      <Sidebar side={side} closeSidebar={closeSidebar} />
      <AdminNav
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        side={side}
      />
      <section
        className={`ml-0 ${
          side === "left-0 md:-left-64" ? "ml-0 " : "ml-0 md:ml-64"
        }  bg-[#2A0955] min-h-screen pt-28 px-4`}
      >
        <div className=" text-black md:px-4 px-0 py-6">{children}</div>
      </section>
    </>
  );
};
export default Wrapper;
