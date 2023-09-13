import { ReceivedProps } from "./type";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "next-auth/react";

const useLogin = (props: ReceivedProps) => {
  const handleSignIn = () => {
    signIn("credentials", {
      email: 'admin@gmail.com',
      password: '123456',
      redirect: true,
      callbackUrl: "/",
    })
  }
  return {
    ...props,
    handleSignIn,
  };
};

export type Props = ReturnType<typeof useLogin>;

export default useLogin;
