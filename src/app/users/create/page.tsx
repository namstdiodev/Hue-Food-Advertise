"use client";
import React from "react";
import useCreateUser, { Props } from "./hook";
import { ReceivedProps } from "./type";
import { Button } from "antd";

const CreateUserLayout = ({ registerWithEmailAndPassword, formik }: Props) => {
  return (
    <div className="bg-white rounded-md p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center mb-8 justify-between">
          <p className="text-xl font-bold">Tạo Tài Khoản</p>
          <Button loading={formik.isSubmitting} htmlType="submit">
            Tạo tài khoản
          </Button>
        </div>
        <div className="flex flex-col">
          <label className="text-[#616161] font-bold">Tên tài khoản</label>
          <input
            placeholder="Nhập tên tài khoản"
            className="rounded-md text-base w-[400px] max-w-full mt-1  px-4 py-2 text-[#6b6260] outline-none border-solid border-[1px] border-[#0000003b] placeholder-[#6b6260]"
            name="name"
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#616161] font-bold">Email</label>
          <input
            placeholder="Nhập email"
            className="rounded-md text-base w-[400px] max-w-full mt-1  px-4 py-2 text-[#6b6260] outline-none border-solid border-[1px] border-[#0000003b] placeholder-[#6b6260]"
            name="email"
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#616161] font-bold">Password</label>
          <input
            placeholder="Nhập mật khẩu"
            className="rounded-md text-base w-[400px] max-w-full mt-1  px-4 py-2 text-[#6b6260] outline-none border-solid border-[1px] border-[#0000003b] placeholder-[#6b6260]"
            name="password"
            onChange={formik.handleChange}
          />
        </div>
      </form>
    </div>
  );
};

const CreateUser = (props: ReceivedProps) => {
  return <CreateUserLayout {...useCreateUser(props)} />;
};
export default CreateUser;
