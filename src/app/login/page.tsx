"use client";
import React from "react";
import Image from "next/image";
import useLogin, { Props } from "./hook";
import { ReceivedProps } from "./type";
import ErrorMessage from "@src/components/ErrorMessage";
import { Button } from "antd";

const LoginPageLayout = ({ formik }: Props) => {
  return (
    <section>
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat bg-opacity-90"
        style={{
          backgroundImage: "url(./background-login.png)",
        }}
      >
        <div className="rounded-xl bg-[#FFFF] md:w-[430px] max-sm:w-[350px] bg-opacity-50 px-8 py-10 shadow-lg backdrop-blur-sm max-sm:px-8">
          <div className="flex items-center justify-center h-[50px]">
            <Image
              src="/logo.svg"
              width={130}
              height={50}
              alt="Picture of the author"
            />
          </div>
          <div className="text-white w-full">
            <div className="mb-8 flex flex-col items-center">
              <h4 className="mb-2 mt-2 text-[16px] text-center text-[#564f4e]">
                Nhập thông tin đăng nhập của bạn để tiếp tục
              </h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 text-lg w-full">
                <input
                  className="rounded-md text-base border-none w-full bg-[#e6e6e6] bg-opacity-50 px-6 py-2 text-center text-[#6b6260]  placeholder-[#6b6260] outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  autoComplete="false"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Nhập email"
                />
                <ErrorMessage formik={formik} name="email" />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-md text-base border-none w-full bg-[#e6e6e6] bg-opacity-50 px-6 py-2 text-center text-[#6b6260] placeholder-[#6b6260] outline-none backdrop-blur-md"
                  type="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  autoComplete="false"
                />
                <ErrorMessage formik={formik} name="password" />
              </div>
              <div className="my-8 flex justify-center text-lg text-black">
                <Button
                  htmlType="submit"
                  size="large"
                  loading={formik.isSubmitting}
                  className="bg-black w-[200px] bg-opacity-50 border-none !text-white hover:bg-[#4f4746]"
                >
                  Đăng nhập
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Login = (props: ReceivedProps) => {
  return <LoginPageLayout {...useLogin(props)} />;
};

export default Login;
