import * as yup from "yup";
import { convertToRaw } from "draft-js";

export const validation = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên món ăn"),
  image: yup
    .mixed()
    .required("Vui lòng tải ảnh lên"),
  content: yup
    .mixed()
    .required("Vui lòng nhập nội dung")
    .test("contentIsEmpty", "Vui lòng nhập nội dung", (value: any) => {
      const isEmpty = convertToRaw(value.getCurrentContent()).blocks.every(
        (b) => b.text.trim() === ""
      );
      return !isEmpty;
    }),
});
