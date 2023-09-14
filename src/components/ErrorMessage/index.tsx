interface IErrorMessage {
  formik: any;
  name: string;
}
const ErrorMessage = ({ formik, name }: IErrorMessage) => {
  return (
    <>
      {formik.errors?.[name] && formik.touched?.[name] ? (
        <span className="text-red-400 text-sm">{formik.errors?.[name]}</span>
      ) : null}
    </>
  );
};

export default ErrorMessage;
