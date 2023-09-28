"use client";
import React from "react";
import { Spin } from "antd";
import { ReceivedProps } from "./type";
import useEdit, { Props } from "./hook";
import FoodPageLayout from "../../create/page";

const FoodEdit = ({ foodDetailData }: Props) => {
  return (
    <div>
      {!foodDetailData ? (
        <div className="flex items-center bg-white rounded-lg justify-center min-h-[400px]">
          <Spin />
        </div>
      ) : (
        <FoodPageLayout initValue={foodDetailData} />
      )}
    </div>
  );
};

const Edit = (props: ReceivedProps) => {
  return <FoodEdit {...useEdit(props)} />;
};
export default Edit;
