import { DataType, ReceivedProps } from "./type";
import { db } from "../../../firebase/initFirebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useWindowDimensions from "@src/hooks/useWindowDimensions";

const useFoods = (props: ReceivedProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [foods, setFoods] = useState<DataType[]>([]);
  const [search, setSearch] = useState<string>("");
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const response: any = await getDocs(collection(db, "foods"));
      const foods = response.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFoods(foods);
      setData(foods);
      setLoading(false);
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

  const handleDetailFood = (id: string) => {
    router.push(`/foods/${id}`);
  };

  const handleSearch = (e: any) => {
    setFoods(
      data.filter((food) =>
        food.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleEditFood = (id: string) => {
    router.push(`/foods/edit/${id}`);
  };

  return {
    ...props,
    foods,
    search,
    width,
    loading,
    handleDelete,
    handeCreateFood,
    setSearch,
    handleSearch,
    handleDetailFood,
    handleEditFood,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
