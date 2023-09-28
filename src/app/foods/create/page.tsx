"use client";
import React from "react";
import useFoods, { Props } from "./hook";
import { ReceivedProps } from "./type";
import { EditorProps } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "antd";
import Image from "next/image";
import { getFilePreview } from "@src/helpers/file";
import ErrorMessage from "@src/components/ErrorMessage";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const FooodPageLayout = ({
  formik,
  initValue,
  onEditorStateChange,
  getRootProps,
  getInputProps,
}: Props) => {
  return (
    <div className="bg-white min-h-full rounded-md p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold mb-8">
            {initValue ? "Chỉnh Sửa Món Ăn" : "Tạo Món Ăn"}
          </p>
          <Button loading={formik.isSubmitting} htmlType="submit">
            {initValue ? "Lưu" : "Tạo món ăn"}
          </Button>
        </div>
        <div className="flex flex-col">
          <label className="text-[#616161] font-bold">Tên món ăn</label>
          <input
            value={formik?.values?.name}
            placeholder="Tên món ăn"
            className="rounded-md text-base w-[400px] max-w-full mt-1  px-4 py-2 text-[#6b6260] outline-none border-solid border-[1px] border-[#0000003b] placeholder-[#6b6260]"
            name="name"
            onChange={formik.handleChange}
          />
          <ErrorMessage name="name" formik={formik} />
        </div>
        <div className="mt-4">
          <label className="text-[#616161] font-bold">Hình ảnh</label>
          <div
            {...getRootProps({
              className:
                "min-h-[200px] max-w-[400px] bg-[#fafafa] border-dashed border-[#eeeeee] border-[1px] flex flex-col items-center justify-center rounded-sm mt-1",
            })}
          >
            <input {...getInputProps()} />
            {formik?.values?.image ? (
              <Image
                src={
                  typeof formik?.values?.image === "string"
                    ? formik?.values?.image
                    : getFilePreview(formik?.values?.image) || ""
                }
                width={400}
                height={200}
                className="rounded-sm"
                alt="food_image"
              />
            ) : (
              <>
                <Image
                  src="/images/paper-upload.svg"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
                <p> Kéo thả hình ảnh hoặc chọn file để tải lên</p>
              </>
            )}
          </div>
          <ErrorMessage name="image" formik={formik} />
        </div>
        <div className="mt-4">
          <label className="text-[#616161] font-bold mb-1">Nội dung</label>
          <div className="mt-1">
            <Editor
              wrapperClassName="rounded-md border-solid border-[1px] border-[#0000003b]"
              toolbarClassName="!rounded-t-md"
              editorClassName="mx-4 min-h-[400px]"
              editorState={formik?.values.content}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                inline: {
                  options: ["bold", "italic", "underline"],
                },
                options: [
                  "history",
                  "inline",
                  "fontSize",
                  "fontFamily",
                  "textAlign",
                  "colorPicker",
                ],
              }}
            />
          </div>
          <ErrorMessage name="content" formik={formik} />
        </div>
      </form>
    </div>
  );
};

const Foods = (props: any) => {
  return <FooodPageLayout {...useFoods(props)} />;
};
export default Foods;
