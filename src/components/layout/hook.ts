import { ReactNode, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export type ReceivedProps = {
  children: ReactNode;
};

const useLayout = (props: ReceivedProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const { data: session }: any = useSession({
    required: true,
  });

  const handleOpenSetting = (newOpen: boolean) => setOpenSetting(newOpen);
  const handleSignOut = () => signOut()
  const handeleCollapse = () => setCollapsed(!collapsed)

  return {
    ...props,
    collapsed,
    openSetting,
    user: session?.user,
    setCollapsed,
    handleOpenSetting,
    handleSignOut,
    handeleCollapse,
  };
};

export type Props = ReturnType<typeof useLayout>;

export default useLayout;
