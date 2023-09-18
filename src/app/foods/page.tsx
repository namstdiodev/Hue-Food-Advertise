"use client";
import React from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";

const FooodPageLayout = (props: Props) => {
  return <div className="bg-white rounded-md p-4">foods</div>;
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
