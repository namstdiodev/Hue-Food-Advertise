"use client";
import React from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";

const FooodPageLayout = (props: Props) => {
  return <div>foods</div>;
};

const Foods = (props: ReceivedProps) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
