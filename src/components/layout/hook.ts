import { ReactNode, useState } from "react";
import { auth } from "../../../firebase/initFirebase";
import { signOut } from "firebase/auth";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export type ReceivedProps = {
  children: ReactNode;
};

const useLayout = (props: ReceivedProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const user = auth.currentUser;
  const router = useRouter();

  const handleOpenSetting = (newOpen: boolean) => setOpenSetting(newOpen);
  
  const handleSignOut = () => {
    deleteCookie("uid");
    router.push("/login");
  };
  const handeleCollapse = () => setCollapsed(!collapsed);

  return {
    ...props,
    collapsed,
    openSetting,
    user,
    setCollapsed,
    handleOpenSetting,
    handleSignOut,
    handeleCollapse,
  };
};

export type Props = ReturnType<typeof useLayout>;

export default useLayout;
