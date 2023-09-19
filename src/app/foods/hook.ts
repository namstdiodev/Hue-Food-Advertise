import { ReceivedProps } from "./type";
import { db } from "../../../firebase/initFirebase";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFoods = (props: ReceivedProps) => {
  const [foods, setFoods] = useState([]);
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
  return {
    ...props,
    foods,
    handleDelete
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
