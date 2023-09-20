"use client";
import React from "react";
import useCreateUser, { Props } from "./hook";
import { ReceivedProps } from "./type";
import { Button, Select, Input } from "antd";
import { StylesCreateUser } from "./styled";
import ErrorMessage from "@src/components/ErrorMessage";

const { Option } = Select;

const CreateUserLayout = ({ registerWithEmailAndPassword, formik }: Props) => {
  return (
    <StylesCreateUser className="bg-white rounded-md p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center mb-8 justify-between">
          <p className="text-xl font-bold">Tạo Tài Khoản</p>
          <Button loading={formik.isSubmitting} htmlType="submit">
            Tạo tài khoản
          </Button>
        </div>
        <div className="flex flex-col">
          <label className="text-[#616161] font-bold">Tên tài khoản</label>
          <Input
            placeholder="Nhập tên tài khoản"
            name="name"
            className="mt-2 max-w-[400px] py-2"
            onChange={formik.handleChange}
          />
          <ErrorMessage formik={formik} name="name" />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#616161] font-bold">Email</label>
          <Input
            placeholder="Nhập email"
            name="email"
            className="mt-2 max-w-[400px] py-2"
            onChange={formik.handleChange}
          />
          <ErrorMessage formik={formik} name="email" />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#616161] font-bold">Mật Khẩu</label>
          <Input
            placeholder="Nhập mật khẩu"
            name="password"
            className="mt-2 max-w-[400px] py-2"
            onChange={formik.handleChange}
          />
          <ErrorMessage formik={formik} name="password" />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#616161] font-bold">Phân Quyền</label>
          <Select
            style={{ height: "40px" }}
            className="mt-2 max-w-[400px] h-[40px]"
            placeholder="Chọn phân quyền"
            value={formik.values.role}
            onChange={(value: string) => formik.setFieldValue("role", value)}
          >
            <Option value="admin">admin</Option>
            <Option value="member">member</Option>
          </Select>
        </div>
      </form>
    </StylesCreateUser>
  );
};

const CreateUser = (props: ReceivedProps) => {
  return <CreateUserLayout {...useCreateUser(props)} />;
};
export default CreateUser;
