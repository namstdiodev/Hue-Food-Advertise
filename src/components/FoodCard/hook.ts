import { useRouter } from "next/navigation";

export type ReceivedProps = {
  data: {
    name: string;
    content: string;
    food_image: string;
    id: string;
  };
};

const useFoodCard = (props: ReceivedProps) => {
  const router = useRouter();

  return {
    ...props,
    router,
  };
};

export type Props = ReturnType<typeof useFoodCard>;

export default useFoodCard;
