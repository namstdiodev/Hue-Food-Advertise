"use client";
import React, { useEffect, useState } from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";

interface DataType {
  title: string;
  url: string;
  thumbnailUrl: string;
  key: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên món ăn",
    dataIndex: "name",
    align: "center",
    key: "id",
  },
  {
    title: "Nội dung món ăn",
    dataIndex: "content",
    align: "center",
    key: "id",
    render: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />,
  },
  {
    title: "Hình ảnh",
    dataIndex: "food_image",
    align: "center",
    key: "id",
    render: (value) => (
      <div className="flex justify-center">
        <Image width={100} height={100} src={value} alt="image_food" />
      </div>
    ),
  },

  {
    title: "Tuỳ chỉnh",
    align: "center",
    key: "id",
    render: (_, record) => {
      return (
        <div className="space-x-2 ">
          <EditOutlined
            className="hover:text-red-600"
            onClick={() => {
              console.log("Hello World");
            }}
          />
          <DeleteOutlined className="hover:text-red-600" />
          <EyeOutlined className="hover:text-red-600" />
        </div>
      );
    },
  },
];

const FooodPageLayout = ({ foods }: Props) => {
  const [dataSource, setDataSource] = useState([]);

  return (
    <div className="bg-white round-sm p-4">
      <Table
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        dataSource={foods}
        bordered
        // loading={loading}
      />
    </div>
  );
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
