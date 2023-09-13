import { ReceivedProps } from "./type";

const useDashboard = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useDashboard>;

export default useDashboard;
