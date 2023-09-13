"use client";
import React from "react";
import useLogin, { Props } from "./hook";
import { ReceivedProps } from "./type";
import Link from "next/link";

const LoginPageLayout = (props: Props) => {
  return (
    <section>
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat bg-opacity-90"
        style={{
          backgroundImage: "url(./background-login.png)",
        }}
      >
        <div className="rounded-xl bg-[#FFFF] bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-sm max-sm:px-8  ">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="mb-2 text-3xl font-bold text-[#564f4e]">
                Đăng nhập
              </h1>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#aa9894] bg-opacity-50 px-6 py-2 text-center text-[#6b6260]  placeholder-[#6b6260] shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="Nhập email"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#aa9894] bg-opacity-50 px-6 py-2 text-center text-[#6b6260] placeholder-[#6b6260] shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="my-8 flex  justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-black bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-[#4f4746]"
                >
                  Đăng nhập
                </button>
              </div>
              <div className="flex justify-center items-center whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">
                  <span className="text-gray-500 whitespace-normal">
                    Chưa có tài khoản?{" "}
                  </span>
                  <Link
                    href="/register"
                    className="text-red-300 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  >
                    Đăng ký
                  </Link>
                </p>
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
