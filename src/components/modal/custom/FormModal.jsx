import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import UploadInput from "../../pages/formComp/UploadInput";
const Styled = {
  Root: styled.form`
    background-color: white;
    padding: 50px;
    border-radius: 5px;
    width: 600px;
  `,
  Title: styled.div`
    font-size: 1.875rem;
    font-weight: bold;
  `,
  InputContainer: styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  `,
  InputWrpaaer: styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    .title {
      font-size: 0.875rem;
      color: #939393;
    }
  `,
  Input: styled.input`
    width: 100%;
    height: ${(props) => props.height};
    padding: 20px 16px;
    background-color: #f7f7f7;
    color: ${(props) => (props.isExist ? "black" : "#939393")};
    border: none;
    border-radius: 5px;
    font-size: 0.875rem;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  TextArea: styled.textarea`
    width: 100%;
    height: 140px;
    padding: 20px 16px;
    background-color: #f7f7f7;
    color: ${(props) => (props.isExist ? "black" : "#939393")};
    border: none;
    border-radius: 5px;
    font-size: 0.875rem;
  `,
  ButtonWrapper: styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: flex-end;
    column-gap: 6px;
    button {
      border: none;
      border-radius: 5px;
      width: ${(props) => (props.buttonWidth ? props.buttonWidth : "100px")};
      height: 42px;
    }
  `,
  CancelButton: styled.button`
    background-color: white;
  `,
  ConfirmButton: styled.button`
    background-color: ${(props) => (props.ableConfirm ? "#004CF2" : "#B5B5B5")};
    color: white;
    font-weight: bold;
    :hover {
      cursor: ${(props) => (props.ableConfirm ? "pointer" : "unset")};
    }
  `,
};

const initState = {
  content: "",
  place: "",
  cost: 0,
  files: null, //이미지 파일 들어갈곳
  file_id: "", //수정시 이미지 파일 명 들어갈곳
  memo: "",
};

export default function FormModal(props) {
  const {
    onClick,
    title,
    formList,
    seccesLabel,
    goSubmit,
    onCancel,
    initValue = null,
    buttonWidth,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [ableConfirm, setAbleConfirm] = useState(false);
  const [inputValues, setInputValues] = useState([]);

  const Init = () => {
    const total = {};
    formList.forEach((item) => {
      if (initValue === null) {
        total[item.key] = "";
      } else {
        total[item.key] = initValue[item.key];
      }
    });

    if (initValue !== null) {
      setAbleConfirm(true);
    }
    return total;
  };

  const onChangeFile = (name) => (file) => {
    setInputValues({ ...inputValues, [name]: file });
  };

  const onChangeInput = (event, index) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    checkAbleConfirm(inputValues);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(!submitting);
    goSubmit(inputValues);
  };

  const checkAbleConfirm = (values) => {
    for (let value of Object.values(values)) {
      if (value === "") {
        setAbleConfirm(false);
        return;
      }
      setAbleConfirm(true);
    }
  };
  useEffect(() => {
    setInputValues(Init());
    initValue && checkAbleConfirm(initValue);
  }, []);

  useEffect(() => {
    checkAbleConfirm(inputValues);
  }, [inputValues]);

  return (
    <Styled.Root onSubmit={onSubmit}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.InputContainer>
        {formList.map((item, index) => {
          const { key, title, type, format, placeholder } = item;
          return (
            <Styled.InputWrpaaer key={index}>
              <div className="title">{title}</div>
              {format === "text" ? (
                <Styled.Input
                  name={key}
                  type={type}
                  value={inputValues[key]}
                  placeholder={placeholder}
                  onChange={(event) => {
                    onChangeInput(event, index);
                  }}
                  isExist={inputValues[key]}
                />
              ) : format === "memo" ? (
                <Styled.TextArea
                  name={key}
                  type="textfiled"
                  value={inputValues[key]}
                  placeholder={placeholder}
                  onChange={(event) => {
                    onChangeInput(event, index);
                  }}
                  isExist={inputValues[key]}
                />
              ) : (
                <UploadInput
                  setFile={onChangeFile(key)}
                  accept="image/*"
                  placeHolder={
                    initValue?.file_id ? initValue?.file_id : placeholder
                  }
                />
              )}
            </Styled.InputWrpaaer>
          );
        })}
      </Styled.InputContainer>
      <Styled.ButtonWrapper buttonWidth={buttonWidth}>
        <Styled.CancelButton onClick={onCancel}>Cancel</Styled.CancelButton>
        <Styled.ConfirmButton disabled={!ableConfirm} ableConfirm={ableConfirm}>
          {seccesLabel}
        </Styled.ConfirmButton>
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
}
