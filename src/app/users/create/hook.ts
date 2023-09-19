import { ReceivedProps, IUserDataType } from "./type";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase/initFirebase";
import { useFormik, FormikProps } from "formik";
import { useRouter } from "next/navigation";

const useCreateUser = (props: ReceivedProps) => {
  const router = useRouter();

  const formik: FormikProps<any> = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values: any) => {
      registerWithEmailAndPassword(values);
    },
  });
  
  const registerWithEmailAndPassword = async (values: IUserDataType) => {
    const { email, password, name } = values;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        role: "user",
        email,
      });
      router.push('/users')
    } catch (err) {
      console.error(err);
    }
  };

  return {
    ...props,
    formik,
    registerWithEmailAndPassword,
  };
};

export type Props = ReturnType<typeof useCreateUser>;

export default useCreateUser;
