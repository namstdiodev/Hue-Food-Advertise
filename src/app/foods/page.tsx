"use client";
import React, { useEffect, useState } from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Button, TabsProps, Tabs, Row, Col, Card } from "antd";
import gridIcon from "../../../public/icons/icon-view-grid-default.svg";
import gridIconActive from "../../../public/icons/icon-view-grid-active.svg";
import listIcon from "../../../public/icons/icon-view-list-black-strong.svg";
import listIconActive from "../../../public/icons/icon-view-list-active.svg";
import Meta from "antd/es/card/Meta";
import styled from "styled-components";
import FoodCard from "@src/components/FoodCard";

const CustomCard = styled(Card)`
  img {
    height: 200px !important;
  }
`;
const CustomTabs = styled(Tabs)`
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-tab {
    padding: 0px;
    &:nth-child(2) {
      margin: 0px 0px 0px 16px;
    }
  }
  .ant-tabs-nav::before {
    border: none;
  }
`;

interface DataType {
  name: string;
  content: string;
  food_image: string;
  id: string;
}

const FooodPageLayout = ({ foods, handeCreateFood, handleDelete }: Props) => {
  const [activeKey, setActiveKey] = useState("1");
  const onChange = (key: string) => {
    setActiveKey(key);
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
        <Row gutter={24} className="py-2">
          {foods.map((food) => (
            // <CustomCard
            //   hoverable
            //   style={{ width: 300, height: 400 }}
            //   cover={
            //     <Image
            //       alt="Image"
            //       width={200}
            //       height={200}
            //       src={item.food_image}
            //     />
            //   }
            //   className="border border-solid border-[#E6E6FA] shadow-[5px_5px_15px_5px_rgba(230, 230, 250, 1)]"
            //   key={item.id}
            // >
            //   <Meta
            //     title={item.name}
            //     description={
            //       <div dangerouslySetInnerHTML={{ __html: item.content }} />
            //     }
            //   />
            // </CustomCard>
            <Col className="my-2" span={4} key={food.id}>
              <FoodCard data={food} />
            </Col>
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
          src={activeKey === "1" ? listIconActive : listIcon}
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
          src={activeKey === "2" ? gridIconActive : gridIcon}
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
      <div className="flex items-center justify-between mb-8">
        <p className="text-xl font-bold">Tạo Món Ăn</p>
        <Button
          onClick={handeCreateFood}
          className="absolute right-10 cursor-pointer"
        >
          Tạo món ăn
        </Button>
      </div>
      <CustomTabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
