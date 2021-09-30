import { useState, useEffect } from "react";

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  // console.log("values", values);
  // 사용자의 input 값을 가져와 values에 저장
  // input, radio button
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  // check box
  const checkedChange = (event) => {
    const { name, checked } = event.target;
    setValues({ ...values, [name]: checked });
  };
  const handleSubmit = async (event) => {
    // setSubmitting(true);
    event.preventDefault();
    setSubmitting(!submitting);
    await new Promise((r) => setTimeout(r, 200)); // 0.2s wait
    onSubmit(values);
    // setErrors(validate(values));
  };
  // useEffect(() => {

  // }, [submitting]);
  // 이전 거 잠시 주석
  // useEffect(() => {
  //   if (submitting) {
  //     // form submit가 되고
  //     if (Object.keys(errors).length === 0) {
  //       // validation을 통과했다면
  //       onSubmit(values); // 다음 액션(로그인, 회원가입) 유도
  //     }
  //     setSubmitting(false);
  //   }
  // }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    checkedChange,
  };
};

export default useForm;
