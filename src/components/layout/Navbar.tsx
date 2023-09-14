import React from "react";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { signOut } from "next-auth/react";

type Props = {
  onMenuButtonClick(): void;
};

const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-screen md:w-full absolute z-10 px-4 shadow-sm h-[73px] top-0 ": true, //positioning & styling
      })}
    >
      <div className="flex-grow"></div>
      <button
        className="md:hidden flex  items-center justify-center  border-solid border-2 border-zinc-500 rounded-lg h-10 w-10 hover:bg-[#9eb0d3]"
        onClick={props.onMenuButtonClick}
      >
        <MenuOutlined />
      </button>
      <button onClick={() => signOut()} className="ml-6 border-solid border-2 border-zinc-500 rounded-lg h-10 w-10 hover:bg-[#9eb0d3]">
        <LogoutOutlined className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
