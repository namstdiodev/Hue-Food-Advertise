"use client";
import { Row, Col, Button, Skeleton } from "antd";
import useFoodDetail, { Props } from "./hook";
import { ReceivedProps } from "../type";
import Image from "next/image";

const FoodDetailPageLayout = ({ foodDataDetail, loading }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl mb-6">{foodDataDetail?.name}</h1>
        <Button className="absolute right-10 cursor-pointer">Chỉnh sửa</Button>
      </div>
      <Row gutter={32}>
        <Col span={12}>
          {loading ? (
            <Skeleton.Image
              className="!h-full !w-full rounded-lg"
              active={loading}
            />
          ) : (
            <Image
              className="!h-full rounded-lg cursor-pointer w-full"
              src={foodDataDetail?.food_image}
              alt="food_image"
              width={400}
              height={400}
            />
          )}
        </Col>
        <Col span={12}>
          <div className="bg-white rounded-lg p-4 flex items-center justify-center h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <div
                className="text-[16px]"
                dangerouslySetInnerHTML={{ __html: foodDataDetail?.content }}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
const ListNamePage = (props: ReceivedProps) => {
  return <FoodDetailPageLayout {...useFoodDetail(props)} />;
};

export default ListNamePage;
