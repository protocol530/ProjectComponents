import * as React from "react";
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
      font-size: 1.88rem;
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
        padding: 15px 30px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #004cf2;
        text-align: center;
        font-weight: bold;
      }
      button.modify {
        background-color: #ff7474;
      }

      button.modify_submit {
        background-color: #004cf2;
      }

      button.cancel {
        color: #000;
        background-color: #fff;
        font-weight: normal;
      }

      button:disabled {
        background-color: #aac2f6;
      }

      button.modify:disabled {
        background-color: #ff7474;
      }
    }
  `,
};

const initState = {
  memoValue: "",
  isModify: false,
  isFirst: true,
};

export default function MemoModal({
  memoData = "",
  onMemoSubmit,
  onClose,
  label,
  desc,
  placeholder,
}) {
  const [state, setState] = useImmer(initState);

  const onModify = () => {
    setState((draft) => {
      draft.isModify = true;
    });
  };

  const offModify = () => {
    setState((draft) => {
      draft.isModify = false;
    });
  };

  const onChange = (e) => {
    const value = e.target.value;
    setState((draft) => {
      draft.memoValue = value;
    });
  };

  const onSubmit = () => {
    onMemoSubmit(state.memoValue);
  };

  React.useEffect(() => {
    setState((draft) => {
      draft.memoValue = memoData;
      draft.isFirst = memoData && memoData.length ? false : true;
    });
  }, []);

  return (
    <Styled.DriverMemo>
      <div className="memo-label">{label}</div>
      <div className="memo-desc">{desc}</div>
      <div className="memo-cont">
        <div className="header">Memo</div>
        <textarea
          className="cont"
          cols="70"
          rows="14"
          placeholder={placeholder}
          onChange={onChange}
          value={state.memoValue}
          disabled={state.isModify ? false : true}
        ></textarea>
      </div>
      <div className="submit-btn-box">
        <div
          className="modify-btn-box"
          style={{ display: state.isModify ? "block" : "none" }}
        >
          <button className="cancel" onClick={offModify}>
            Cancel
          </button>
          <button
            className={!state.isFirst ? "modify_submit" : ""}
            onClick={onSubmit}
            disabled={state.memoValue ? false : true}
          >
            {state.isFirst ? "Confirm" : "Modify"}
          </button>
        </div>

        <button
          onClick={onModify}
          className={!state.isFirst ? "modify" : ""}
          style={{ display: state.isModify ? "none" : "block" }}
        >
          {state.isFirst ? "+ Write" : "Modify"}
        </button>
      </div>
    </Styled.DriverMemo>
  );
}
