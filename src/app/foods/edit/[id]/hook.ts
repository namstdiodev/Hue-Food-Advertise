import { useEffect, useState } from "react";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState } from "draft-js";
import { useParams } from "next/navigation";
import { ReceivedProps } from "./type";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/initFirebase";

const useEdit = (props: ReceivedProps) => {
  const { id } = useParams();
  const [foodDetailData, setFoodDetailData] = useState<any>();
  const getDetailFood = async () => {
    try {
      const docRef = doc(db, "foods", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const blocksFromHtml = htmlToDraft(data?.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        setFoodDetailData({ ...docSnap.data(), content: editorState, id: id });
      } else {
        console.log("No such document!");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getDetailFood();
  }, []);
  return {
    ...props,
    foodDetailData,
  };
};

export type Props = ReturnType<typeof useEdit>;

export default useEdit;
