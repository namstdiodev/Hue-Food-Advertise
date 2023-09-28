import StylesFoodCard from "./styled";
import Image from "next/image";
import useFoodCard, { Props, ReceivedProps } from "./hook";

const FoodCardLayout = ({ data, router }: Props) => {
  return (
    <StylesFoodCard>
      <div className="flip-card cursor-pointer">
        <div onClick={() => router.push(`/foods/${data.id}`)} className="flip-card-inner">
          <div className="flip-card-front">
            <Image
              alt="Image"
              className="h-[200px] w-full"
              width={200}
              height={200}
              src={data.food_image}
            />
            <p className="font-bold text-lg mt-2">{data.name}</p>
          </div>
          <div className="flip-card-back">
            <div className="flip-card-back-content" dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      </div>
    </StylesFoodCard>
  );
};

const FoodCard = (props: ReceivedProps) => {
  return <FoodCardLayout {...useFoodCard(props)} />;
};
export default FoodCard;
