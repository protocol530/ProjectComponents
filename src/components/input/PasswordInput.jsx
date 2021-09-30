import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";

import ShowPassword from "../../assets/img/show_password.svg";
import HiddenPassword from "../../assets/img/hidden_password.svg";

const Styled = {
  PasswordInput: styled.div`
    display: flex;
    flex-direction: column;

    .input-box {
      position: relative;
      input {
        border-radius: 5px;
        border: none;
        background-color: ${(props) => props.bgColor};
        padding: 0 20px;
        width: 100%;
        height: ${(props) => props.height};
        line-height: ${(props) => props.height};
      }
      .showPass {
        position: absolute;
        width: 20px;
        height: 20px;
        border: none;
        cursor: pointer;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: url(${(props) =>
            props.showPass ? ShowPassword : HiddenPassword})
          no-repeat center;
      }
    }

    .alert-msg {
      margin-top: 7px;
      color: #ff0000;
      font-size: 0.88rem;
    }
  `,
};

const initState = {
  input: "",
  isCheckPass: null,
  showPassword: false,
};

export default function PasswordInput({
  alertMsg = "",
  className,
  height = "50px",
  bgColor = "#F7F7F7",
  onChangeInput,
  compareModeValue = null, //비교할 비밀번호 값
  getIsPassRule,
  ...props
}) {
  const [state, setState] = useImmer(initState);
  const toggleShowPass = () => {
    setState((draft) => {
      draft.showPassword = !draft.showPassword;
    });
  };
  const onChange = (e) => {
    const value = e.target.value;
    // 영소문 + 숫자 8자리 이상
    const rex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValuePass = compareModeValue === value;
    const isRexPass = rex.test(value);
    const isPass = compareModeValue ? isValuePass && isRexPass : isRexPass;

    setState((draft) => {
      draft.input = value;
      draft.isCheckPass = isPass;
    });
    onChangeInput(value);
    getIsPassRule &&
      getIsPassRule(rex.test(value) && compareModeValue === value);
  };

  return (
    <Styled.PasswordInput
      className={className}
      bgColor={bgColor}
      height={height}
      showPass={state.showPassword}
    >
      <div className="input-box">
        <input
          {...props}
          type={state.showPassword ? "text" : "password"}
          onChange={onChange}
          autocomplete="new-password"
        />
        <button
          className="showPass"
          onClick={toggleShowPass}
          type="button"
        ></button>
      </div>
      {state.isCheckPass !== null && !state.isCheckPass && (
        <div className="alert-msg">{alertMsg}</div>
      )}
    </Styled.PasswordInput>
  );
}
