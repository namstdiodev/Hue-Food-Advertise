import { ReceivedProps } from "./type";
import { db } from "../../../firebase/initFirebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFoods = (props: ReceivedProps) => {
  const [foods, setFoods] = useState([]);
  const fetchFoods = async () => {
    try {
      const response: any = await getDocs(collection(db, "foods"));
      setFoods(response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFoods();
  }, []);
  return {
    ...props,
    foods,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
