import { ReceivedProps } from "./type";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/initFirebase";
import { useEffect, useState } from "react";
import htmlToDraft from "html-to-draftjs";

const useFoodDetail = (props: ReceivedProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [foodDataDetail, setFoodDataDetail] = useState<any>();
  const { id } = useParams();
  const getDetailFood = async () => {
    try {
      const docRef = doc(db, "foods", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoodDataDetail(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getDetailFood();
  }, []);
  return {
    ...props,
    loading,
    foodDataDetail,
  };
};

export type Props = ReturnType<typeof useFoodDetail>;

export default useFoodDetail;
