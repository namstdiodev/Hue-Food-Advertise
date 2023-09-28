"use client";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Layout, Menu, Popover } from "antd";
import styled from "styled-components";
import useLayout, { Props, ReceivedProps } from "./hook";
import Link from "next/link";
import NoSSRWrapper from "../NoSSRWrapper";

const { Header, Sider, Content } = Layout;

const SettingMenu = styled(Menu)`
  border-inline-end: none !important;
  .ant-menu-item {
    margin-inline: 0px;
    background-color: #fff;
    padding-inline: 10px;
  }
`;

const SiderMenu = ({ selectedKey }: { selectedKey: string }) => {
  return (
    <div style={{ flex: "1 1 0%" }}>
      <Link
        href="/foods"
        className="h-[32px] cursor-pointer m-4 bg-[#f5f5f5] rounded-[6px] flex items-center justify-center"
      >
        Logo
      </Link>
      <Menu
        theme="light"
        activeKey={selectedKey}
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{
          border: "none",
        }}
        items={[
          {
            key: "1",
            icon: <VideoCameraOutlined />,
            label: <Link href="/foods">Thực đơn</Link>,
          },
        ]}
      />
    </div>
  );
};

const PageLayout = ({
  collapsed,
  children,
  user,
  selectedKey,
  openSetting,
  setCollapsed,
  handleOpenSetting,
  handeleCollapse,
  handleSignOut,
}: Props) => {
  return (
    <Layout hasSider className="min-h-screen relative">
      {/* sidebar for mobile : breakpoint < 756px*/}
      <Drawer
        placement="left"
        className="md:hidden"
        rootClassName="md:hidden"
        bodyStyle={{ padding: "0px" }}
        width={200}
        closable={false}
        onClose={handeleCollapse}
        open={collapsed}
      >
        <SiderMenu selectedKey={selectedKey} />
      </Drawer>
      {/* sidebar for pc : breakpoint > 756 px*/}
      <div
        style={{
          transition:
            "background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
        }}
        className={`${
          !collapsed
            ? "min-w-[200px] max-w-[200px] flex-[0_0_200px]"
            : "min-w-[80px] max-w-[80px] flex-[0_0_80px]"
        } overflow-hidden hidden md:block`}
      />
      <Sider
        className="!bg-white h-screen left-0 bottom-0 top-0 !fixed overflow-auto hidden md:block"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="flex flex-col h-full">
          <SiderMenu selectedKey={selectedKey} />
          <Menu
            theme="light"
            style={{
              border: "none",
            }}
            mode="inline"
            items={[
              {
                key: "1",
                icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
                onClick: handeleCollapse,
                className:
                  "!bg-white !text-[#000] border-t-[1px] !w-full !rounded-[0px] !m-0 border-solid border-red",
              },
            ]}
          />
        </div>
      </Sider>
      {/* navbar */}
      <Layout>
        <Header className="p-0 !bg-white z-10	sticky top-0 w-full flex justify-between md:justify-end items-center px-4">
          <MenuUnfoldOutlined onClick={handeleCollapse} className="md:hidden" />
          <Popover
            overlayInnerStyle={{
              padding: "12px 10px",
            }}
            content={
              <div className="min-w-[280px]">
                <p className="text-dark mb-2">
                  <span className="font-bold">Chào mừng, </span>
                  {user?.email}
                </p>
                <SettingMenu
                  theme="light"
                  items={[
                    {
                      key: "1",
                      icon: <LogoutOutlined />,
                      onClick: handleSignOut,
                      label: "Đăng xuất",
                    },
                  ]}
                />
              </div>
            }
            trigger="click"
            placement="bottomLeft"
            open={openSetting}
            onOpenChange={handleOpenSetting}
          >
            <div className="flex items-center group w-[98px] justify-between cursor-pointer text-[#2196F3] hover:text-white p-2 border-[#E3F2FD] border border-solid rounded-3xl bg-[#E3F2FD] hover:bg-[#2196F3]">
              <Avatar className="bg-[#2196F3] group-hover:bg-[#90caf9]">
                {user?.email?.toUpperCase().charAt(0)}
              </Avatar>
              <SettingOutlined className="text-[20px] " />
            </div>
          </Popover>
        </Header>
        <Content className="p-4 md:p-6 min-h-[200px]">{children}</Content>
      </Layout>
    </Layout>
  );
};

const AppLayout = (props: ReceivedProps) => {
  return (
    <NoSSRWrapper>
      <PageLayout {...useLayout(props)} />
    </NoSSRWrapper>
  );
};
export default AppLayout;
