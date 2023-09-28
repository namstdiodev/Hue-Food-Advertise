import { useFormik, FormikProps } from "formik";
import { ReceivedProps } from "./type";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDropzone } from "react-dropzone";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../../../firebase/initFirebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { alertError } from "@src/helpers/errorElert";
import { useRouter } from "next/navigation";
import { validation } from "./valitdation";

const useFoods = (props: ReceivedProps) => {
  const { initValue } = props;
  const router = useRouter();
  const formik: FormikProps<any> = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initValue?.name || "",
      content: initValue?.content || "",
      image: initValue?.food_image,
    },
    validationSchema: validation,
    onSubmit: (values: any) =>
      !initValue ? handleSubmitFood(values) : handleEditFood(values),
  });

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("image", acceptedFiles[0]);
    },
  });

  const handleSubmitFood = async (values: any) => {
    try {
      const parseContent = convertToRaw(values?.content?.getCurrentContent());
      const imageRef = storageRef(storage, `foods/${uuid()}`);

      const { ref } = await uploadBytes(imageRef, values.image);
      const url = await getDownloadURL(ref);
      await addDoc(collection(db, "foods"), {
        name: values?.name,
        content: draftToHtml(parseContent),
        food_image: url,
      });

      router.push("/foods");
    } catch (error) {
      formik.setSubmitting(false);
      alertError("Đã xảy ra lỗi");
    }
  };

  const handleEditFood = async (values: any) => {
    try {
      const parseContent = convertToRaw(values?.content?.getCurrentContent());
      const params = {
        name: values.name,
        content: draftToHtml(parseContent),
        food_image: initValue?.food_image,
      };
      if (typeof values?.image !== "string") {
        const imageRef = storageRef(storage, `foods/${uuid()}`);
        const { ref } = await uploadBytes(imageRef, values.image);
        const url = await getDownloadURL(ref);
        params.food_image = url;
      }
      await updateDoc(doc(db, "foods", String(initValue?.id)), params);
      router.push("/foods");
    } catch (error) {
      formik.setSubmitting(false);
      alertError("Đã xảy ra lỗi edit");
    }
  };

  const onEditorStateChange = (state: any) => {
    formik.setFieldValue("content", state);
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
