import { ReceivedProps, IFormLoginValues } from "./type";
import { useFormik, FormikProps } from "formik";
import { validation } from "./validate";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/initFirebase";
import { setCookie } from 'cookies-next';

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
      const response: any =  await await signInWithEmailAndPassword(auth, values.email, values.password);
      // setCookie('token', response.user.accessToken)
      setCookie('uid', response.user.uid)
      router.push("/foods");
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
