import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { ReceivedProps } from "./type";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDropzone } from "react-dropzone";
import { getFilePreview } from "@src/helpers/file";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase/initFirebase";

const useFoods = (props: ReceivedProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState<any>()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
        setFiles(getFilePreview(acceptedFiles[0]))
    }
  });
  const formik: FormikProps<any> = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      content: "",
      image: "",
    },
    onSubmit: (values: any) => {
        handleSubmitFood()
    },
  });

  const handleSubmitFood = async () => {
    const parseContent = convertToRaw(editorState?.getCurrentContent());
    await addDoc(collection(db, 'foods'), {
        name: 'Bún bò huế',
        content: draftToHtml(parseContent),
    })
  }
  const onEditorStateChange = (state: never) => {
    setEditorState(state);
  };
  console.log(files);
  return {
    ...props,
    formik,
    editorState,
    files,
    getRootProps,
    getInputProps,
    onEditorStateChange,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
