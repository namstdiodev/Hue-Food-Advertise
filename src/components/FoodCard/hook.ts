export type ReceivedProps = {
  data: {
    name: string;
    content: string;
    food_image: string;
    id: string;
  };
};

const useFoodCard = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useFoodCard>;

export default useFoodCard;
