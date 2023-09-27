import { ReactNode, useState, useEffect } from "react";
import { auth } from "../../../firebase/initFirebase";
import { signOut } from "firebase/auth";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export type ReceivedProps = {
  children: ReactNode;
};

const useLayout = (props: ReceivedProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const user = auth.currentUser;
  const router = useRouter();

  const items: any = [
    {
      key: "1",
      path: "/foods",
    },
    {
      key: "2",
      path: "/users",
    },
  ];
  const handleOpenSetting = (newOpen: boolean) => setOpenSetting(newOpen);

  const handleSignOut = () => {
    deleteCookie("uid");
    router.push("/login");
  };
  const handeleCollapse = () => setCollapsed(!collapsed);

  const path: any = usePathname();
  const [selectedKey, setSelectedKey] = useState(
    items?.find((_item: any) => path?.startsWith(_item?.path))?.key
  );

  useEffect(() => {
    setSelectedKey(items?.find((_item: any) => path?.startsWith(_item?.path))?.key);
  }, [path]);

  return {
    ...props,
    collapsed,
    openSetting,
    selectedKey,
    user,
    setCollapsed,
    handleOpenSetting,
    handleSignOut,
    handeleCollapse,
  };
};

export type Props = ReturnType<typeof useLayout>;

export default useLayout;
