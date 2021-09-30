import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";

const Styled = {
  UploadInput: styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    border-radius: 5px;

    .file-name {
      color: #5786ed;
      text-decoration: underline;

      &.default {
        text-decoration: none;
        color: ${(props) => (props.isExist ? "#5786ed" : "#b5b5b5")};
      }
    }

    label {
      color: #5786ed;
      font-size: 0.88rem;
      cursor: pointer;
      text-decoration: underline;
    }

    input[type="file"] {
      position: absolute;
      right: 0;
      width: 1px;
      opacity: 0;
    }
  `,
};

export default function UploadInput({
  width = "100%",
  height = "50px",
  bgColor = "#F7F7F7",
  placeHolder = "",
  setFile,
  bindId = "uploader",
  isExist = "",
  ...props
}) {
  //   const [state, setState] = useImmer(placeHolder);
  const [state, setState] = React.useState(placeHolder);
  const singleChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setState(file.name);
    setFile(file);
  };

  const multiChange = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    setState(files[0].name);
    setFile(files);
  };

  return (
    <Styled.UploadInput
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
      }}
      isExist={isExist}
    >
      <span className={`file-name ${state.includes("Upload ") && "default"}`}>
        {state}
      </span>
      <label htmlFor={bindId}>+Add</label>
      <input
        type="file"
        id={bindId}
        onChange={props.multi ? multiChange : singleChange}
        {...props}
      />
    </Styled.UploadInput>
  );
}
