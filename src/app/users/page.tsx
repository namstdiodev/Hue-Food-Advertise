"use client";
import React from "react";
import useUsers, { Props } from "./hook";
import { ReceivedProps } from "./type";
import Table, { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

interface DataType {
  name: string;
  content: string;
  food_image: string;
  id: string;
}

const UserPageLayout = ({ users, handleCreateNavigation }: Props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      align: "center",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "id",
    },

    {
      title: "Tuỳ chỉnh",
      align: "center",
      key: "id",
      render: (_, record) => {
        return (
          <div className="space-x-2 ">
            <DeleteOutlined className="hover:text-red-600 cursor-pointer" />
          </div>
        );
      },
    },
  ];
  return (
    <div className="bg-white round-sm p-4">
      <div className="flex items-center mb-8 justify-between">
        <p className="text-xl font-bold">Tạo Tài Khoản</p>
        <Button onClick={handleCreateNavigation} htmlType="submit">
          Tạo tài khoản
        </Button>
      </div>
      <Table
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        dataSource={users}
        bordered
        // loading={loading}
      />
    </div>
  );
};

const Users = (props: ReceivedProps) => {
  return <UserPageLayout {...useUsers(props)} />;
};
export default Users;
