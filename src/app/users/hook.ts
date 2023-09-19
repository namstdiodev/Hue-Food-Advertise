import { ReceivedProps } from "./type";
import { db } from "../../../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useUsers = (props: ReceivedProps) => {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const fetchUsers = async () => {
    try {
      const response: any = await getDocs(collection(db, "users"));
      setUsers(
        response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {}
  };

  const handleCreateNavigation = () => {
    router.push("/users/create");
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    ...props,
    users,
    handleCreateNavigation,
  };
};

export type Props = ReturnType<typeof useUsers>;

export default useUsers;
