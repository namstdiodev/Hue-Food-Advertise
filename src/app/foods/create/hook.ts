import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { ReceivedProps } from "./type";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDropzone } from "react-dropzone";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../../../firebase/initFirebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { alertError } from "@src/helpers/errorElert";
import { useRouter } from "next/navigation";

const useFoods = (props: ReceivedProps) => {
  const router = useRouter()
  const formik: FormikProps<any> = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      content: "",
      image: "",
    },
    onSubmit: (values: any) => {
      handleSubmitFood(values);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles[0])
    },
  });

  const handleSubmitFood = async (values: any) => {
    try {
      const parseContent = convertToRaw(values?.content?.getCurrentContent());
      const imageRef = storageRef(storage, `foods/${uuid()}`);
      const { ref } = await uploadBytes(imageRef, values.image)
      const url = await getDownloadURL(ref)
      await addDoc(collection(db, 'foods'), {
          name: values?.name,
          content: draftToHtml(parseContent),
          food_image: url
      })
      router.push('/foods')
    } catch (error) {
      formik.setSubmitting(false)
      alertError('Đã xảy ra lỗi')
    }
  };

  const onEditorStateChange = (state: never) => {
    formik.setFieldValue('content', state)
  };

  return {
    ...props,
    formik,
    getRootProps,
    getInputProps,
    onEditorStateChange,
  };
};

export type Props = ReturnType<typeof useFoods>;

export default useFoods;
