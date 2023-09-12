import { ReceivedProps } from "./type";

const useLogin = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useLogin>;

export default useLogin;
