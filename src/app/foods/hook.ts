import { ReceivedProps } from "./type";

const useFoods = (props: ReceivedProps) => {
  
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
