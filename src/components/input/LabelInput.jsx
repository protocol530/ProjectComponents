import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";

const Styled = {
  LabelInput: styled.div`
    display: flex;
    align-items: center;

    & > label {
      margin-right: ${(props) => props.gutter};
      color: ${(props) => (props.editMode ? "#5786ed" : "inherit")};
    }
    & > input {
      font-size: 0.88rem;
      border: none;
      outline: none;
      color: ${(props) => (props.editMode ? "#5786ed" : "#000")};
      border-bottom: ${(props) =>
        props.editMode ? "1px solid #5786ed" : "1px solid transparent"};
    }
    & > input:placeholder {
      color: ${(props) => (props.editMode ? "#5786ed" : "#939393")};
    }
    & > input:disabled {
      background-color: transparent;
    }
  `,
};

export default function LabelInput({
  labelEle,
  type = "text",
  id = "id",
  setValue,
  gutter = "14px",
  isEdit = false,
  onClick,
  className,
  ...props
}) {
  const [state, setState] = React.useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setState(value);
    setValue && setValue(value);
  };

  return (
    <Styled.LabelInput
      gutter={gutter}
      editMode={isEdit}
      className={className}
      onClick={onClick && onClick}
    >
      <label htmlFor={id}>{labelEle}</label>
      <input type={type} id={id} onChange={onChange} {...props} />
    </Styled.LabelInput>
  );
}
