import React, { useEffect } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";

const Styled = {
  DriverMemo: styled.div`
    width: 700px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;

    .memo-label {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .memo-desc {
      font-size: 1rem;
      color: #939393;
      margin-top: 10px;
    }
    .memo-cont {
      margin-top: 63px;
      .header {
        color: #939393;
        font-weight: 600;
      }
      .cont {
        width: 100%;
        margin-top: 11px;
        background-color: #f7f7f7;
        padding: 19px 20px;
        border-radius: 5px;
        resize: none;
      }
    }

    .submit-btn-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      button {
        padding: 15px 20px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #ff2424;
        text-align: center;
        font-weight: bold;
      }

      button.cancel {
        color: #000;
        background-color: #fff;
        font-weight: normal;
      }

      button:disabled {
        background-color: #b5b5b5;
        cursor: unset;
      }
    }
  `,
};

const initState = {
  memoValue: "",
  ableSumbit: false,
};

export default function CancelReason({
  memoData = "",
  onSubmit,
  onCancel,
  label,
  desc,
  placeholder,
}) {
  const [state, setState] = useImmer(initState);
  const onChange = (e) => {
    const value = e.target.value;
    setState((draft) => {
      draft.memoValue = value;
    });
  };

  useEffect(() => {
    setState((draft) => {
      draft.memoValue = memoData;
    });
  }, []);

  useEffect(() => {
    if (state.memoValue !== "") {
      setState((draft) => {
        draft.ableSumbit = true;
      });
    } else {
      setState((draft) => {
        draft.ableSumbit = false;
      });
    }
  }, [state]);

  return (
    <Styled.DriverMemo>
      <div className="memo-label">{label}</div>
      <div className="memo-desc">{desc}</div>
      <div className="memo-cont">
        <div className="header">Reason for cancel</div>
        <textarea
          className="cont"
          cols="70"
          rows="14"
          placeholder={placeholder}
          onChange={onChange}
          value={state.memoValue}
        />
      </div>
      <div className="submit-btn-box">
        <button className="cancel" onClick={onCancel}>
          Keep Quote
        </button>
        <button
          onClick={onSubmit(state.memoValue)}
          disabled={!state.ableSumbit}
        >
          Cancel a Quote
        </button>
      </div>
    </Styled.DriverMemo>
  );
}
