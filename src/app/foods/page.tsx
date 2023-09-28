"use client";
import React, { createContext, useState } from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps, DataType } from "./type";
import Table, { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import {
  Button,
  TabsProps,
  Tabs,
  Row,
  Col,
  Input,
  Modal,
  Image as AntdImage,
} from "antd";
import gridIcon from "../../../public/icons/icon-view-grid-default.svg";
import gridIconActive from "../../../public/icons/icon-view-grid-active.svg";
import listIcon from "../../../public/icons/icon-view-list-black-strong.svg";
import listIconActive from "../../../public/icons/icon-view-list-active.svg";
import styled from "styled-components";
import FoodCard from "@src/components/FoodCard";

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

const GridLayout = ({ foods }: { foods: DataType[] }) => {
  return (
    <div className="overflow-hidden">
      <Row gutter={24} className="">
        {foods.map((food: DataType) => (
          <Col className="mb-[24px]" span={4} key={food.id}>
            <FoodCard data={food} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const FooodPageLayout = ({
  foods,
  search,
  setSearch,
  handeCreateFood,
  handleDelete,
  handleSearch,
  handleDetailFood,
  handleEditFood,
}: Props) => {
  const [activeKey, setActiveKey] = useState("1");
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const config = {
    title: "Xoá món ăn",
    content: "Bạn có muốn xoá món ăn",
    okText: "Đồng ý",
    cancelText: "Huỷ",
  };
  const [modal, contextHolder] = Modal.useModal();

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
      render: (value) => (
        <div
          className="max-h-[200px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "food_image",
      align: "center",
      key: "id",
      render: (value) => (
        <>
          <div className="flex justify-center">
            <AntdImage
              width={100}
              height={100}
              src={value}
              alt="image_food"
              className="cursor-pointer rounded-lg"
            />
          </div>
        </>
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
              onClick={() => handleEditFood(record.id)}
            />
            <DeleteOutlined
              onClick={async () => {
                const confirmed = await modal.confirm(config);
                if (confirmed) {
                  handleDelete(record.id);
                }
              }}
              className="hover:text-red-600"
            />
            {contextHolder}
            <EyeOutlined
              onClick={() => handleDetailFood(record.id)}
              className="hover:text-red-600"
            />
          </div>
        );
      },
    },
  ];

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
      children: <GridLayout foods={foods} />,
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
      <div className="mb-4 max-w-[400px]">
        <Input
          prefix={<SearchOutlined />}
          size="large"
          placeholder="Tìm kiếm"
          onChange={handleSearch}
        />
      </div>
      <CustomTabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
