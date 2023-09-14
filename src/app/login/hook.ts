import { ReceivedProps, IFormLoginValues } from "./type";
import { useFormik, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import { validation } from "./validate";
import { useRouter } from "next/navigation";
import { alertError } from "@src/helpers/errorElert";

const useLogin = (props: ReceivedProps) => {
  const router = useRouter();
  const formik: FormikProps<IFormLoginValues> = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values: IFormLoginValues) => {
      handleSignIn(values);
    },
  });

  const handleSignIn = async (values: IFormLoginValues) => {
    try {
      const response: any = await signIn("credentials", {
        ...values,
        redirect: false,
        // callbackUrl: "/",
      });
      if (!response?.error) {
        router.push("/dashboard");
      } else {
        formik.setSubmitting(false);
        alertError("Tài khoản hoặc mật khẩu không chính xác !");
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  return {
    ...props,
    handleSignIn,
    formik,
  };
};

export type Props = ReturnType<typeof useLogin>;

export default useLogin;
