"use client";
import React, { useEffect, useState } from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Button, TabsProps, Tabs, Row, Col, Card } from "antd";
import gridIcon from "../../../public/icons/gridIcon.svg";
import listIcon from "../../../public/icons/listIcon.svg";
import Meta from "antd/es/card/Meta";
import styled from "styled-components";

const CustomCard = styled(Card)`
  img {
    height: 200px !important;
  }
`;
const CustomTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none !important;
  }
`;

interface DataType {
  name: string;
  content: string;
  food_image: string;
  id: string;
}

const FooodPageLayout = ({ foods, handeCreateFood, handleDelete }: Props) => {
  const [dataSource, setDataSource] = useState([]);
  const onChange = (key: string) => {
    console.log(key);
  };

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
            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              className="hover:text-red-600"
            />
            <EyeOutlined className="hover:text-red-600" />
          </div>
        );
      },
    },
  ];

  const GridLayout = () => {
    return (
      <div className="overflow-hidden">
        <Row gutter={[40, 40]} justify={"space-between"}>
          {foods.map((item) => (
            <CustomCard
              hoverable
              style={{ width: 300, height: 400 }}
              cover={
                <Image
                  alt="Image"
                  width={200}
                  height={200}
                  src={item.food_image}
                />
              }
              className="border border-solid border-[#E6E6FA] shadow-[5px_5px_15px_5px_rgba(230, 230, 250, 1)]"
              key={item.id}
            >
              <Meta
                title={item.name}
                description={
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                }
              />
            </CustomCard>
          ))}
        </Row>
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Image
          src={listIcon}
          width={23}
          height={23}
          alt="gird-icon"
          className="cursor-pointer"
        />
      ),
      children: (
        <Table
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={foods}
          bordered
          // loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Image
          src={gridIcon}
          width={23}
          height={23}
          alt="list-icon"
          className="cursor-pointer"
          // onClick={handleGrid}
        />
      ),
      children: <GridLayout />,
    },
  ];

  return (
    <div className="bg-white round-sm p-4 relative">
      <Button className="absolute right-10 ">Tạo món ăn</Button>
      <CustomTabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
