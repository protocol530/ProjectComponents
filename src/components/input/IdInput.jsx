import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import _ from "lodash";
import { defaultGetApiSet } from "../../utils/api";
import { URLPATH } from "../../assets/data/common";

const Styled = {
  IdInput: styled.div`
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
    }

    .alert-box {
      display: flex;
    }

    .alert-msg {
      margin-top: 7px;
      color: #ff0000;
      font-size: 0.88rem;
    }
    .alert-msg + .alert-msg {
      margin-left: 47px;
    }
  `,
};

const initState = {
  input: "",
  isExist: null,
  isCheckId: null,
};

export default function IdInput({
  alertMsg = "",
  alertMsgId = "",
  className,
  height = "50px",
  bgColor = "#F7F7F7",
  onChangeInput,
  getIsPassRule,
  apiUrl = `${URLPATH.logisDriver}/exist`,
  ...props
}) {
  const [state, setState] = useImmer(initState);

  const debounceSearch = async (value) => {
    if (!value.length) return;
    try {
      const res = await defaultGetApiSet({ id: value }, apiUrl);
      setState((draft) => {
        draft.isExist = res.data.exist;
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    const rex = /^(?=.*?[a-z])(?=.*?[0-9]).{4,16}$/;
    const isPass = rex.test(value);

    debounceSearch(value);
    setState((draft) => {
      draft.input = value;
      draft.isCheckId = isPass;
    });
    onChangeInput(value);
    getIsPassRule(isPass && !state.isExist);
  };

  return (
    <Styled.IdInput className={className} bgColor={bgColor} height={height}>
      <div className="input-box">
        <input
          {...props}
          type="text"
          onChange={_.debounce(onChange, 450)}
          autoFocus={false}
        />
      </div>
      <div className="alert-box">
        {!!state.isExist !== null && !!state.isExist && (
          <div className="alert-msg">{alertMsg}</div>
        )}
        {state.isCheckId !== null && !state.isCheckId && (
          <div className="alert-msg">{alertMsgId}</div>
        )}
      </div>
    </Styled.IdInput>
  );
}
