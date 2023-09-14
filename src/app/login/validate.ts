import * as yup from "yup";

export const validation = yup.object().shape({
  email: yup.string().email('Vui lòng nhập đúng định dạng email').required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu "),
});
