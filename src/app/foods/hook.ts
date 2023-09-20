import { ReceivedProps } from "./type";
import { db } from "../../../firebase/initFirebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useFoods = (props: ReceivedProps) => {
  const [foods, setFoods] = useState<any[]>([]);
  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const response: any = await getDocs(collection(db, "foods"));
      setFoods(
        response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {}
  };
  
  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, "foods", id);
      await deleteDoc(docRef);
      fetchFoods();
    } catch (error) {}
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handeCreateFood = () => {
    router.push("/foods/create");
  };

  return {
    ...props,
    foods,
    handleDelete,
    handeCreateFood,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
