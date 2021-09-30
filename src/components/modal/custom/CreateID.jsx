import * as React from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
import IdInput from "../../input/IdInput";
import PasswordInput from "../../input/PasswordInput";

const Styled = {
  CreateId: styled.div`
    width: 598px;
    padding: 50px;
    border-radius: 5px;
    background-color: #fff;

    .popup-title {
      font-size: 1.9rem;
      font-weight: bold;
      line-height: 37px;
    }
    .popup-form-box {
      margin-top: 50px;
      .input-row {
        .input-label {
          font-size: 0.9rem;
          color: #646464;
        }
        .input-cont {
          margin-top: 10px;
          input {
            display: block;
            width: 100%;
            color: #a8a8a8;
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            background-color: #f7f7f7;
            border: none;
          }

          .input-helper {
            visibility: hidden;
            opacity: 0;
            color: #ff0000;
            font-size: 0.8rem;
            margin-top: 6px;
            transition: all 0.3s ease-out;
          }

          .input-helper.active {
            visibility: visible;
            opacity: 1;
          }
        }
      }

      .input-row + .input-row {
        margin-top: 19px;
      }
    }

    .popup-btn-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 60px;
      font-size: 1rem;

      button.popup-btn {
        width: 100px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #000;
        border: none;
        background-color: #fff;
        border-radius: 5px;
      }

      .popup-btn.ok {
        background-color: #5786ed;
        color: #fff;

        &:disabled {
          background-color: #aac2f6;
        }
      }
    }
  `,
};

const initState = {
  id: null,
  password: null,
  checkPassword: null,
  isIdPass: false,
  isCheckPass: false,
};

export default function CreateId({ onSubmit, onCancel, setValue, apiUrl }) {
  const [state, setState] = useImmer(initState);

  const onInputChangeCompo = (key) => (value) => {
    setState((draft) => {
      draft[key] = value;
    });
  };

  const getIsPassRule = (key) => (isPass) => {
    setState((draft) => {
      draft[key] = isPass;
    });
  };

  const createSubmit = () => {
    onSubmit(state);
  };

  const isFullData =
    state.id && state.password && state.checkPassword && state.isCheckPass;

  return (
    <Styled.CreateId>
      <h3 className="popup-title">Create ID</h3>
      <div className="popup-form-box">
        <div className="input-row">
          <div className="input-label">Member ID</div>
          <div className="input-cont">
            <IdInput
              alertMsg="The ID that already exists."
              alertMsgId="Only 4-16 lowercase letters + numbers are allowed."
              onChangeInput={onInputChangeCompo("id")}
              getIsPassRule={getIsPassRule("isIdPass")}
              apiUrl={apiUrl}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-label">Password</div>
          <div className="input-cont">
            <PasswordInput
              alertMsg="Password policy violation. Use at least 8 lowercase letters + numbers."
              placeholder="Enter password"
              onChangeInput={onInputChangeCompo("password")}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-label">Confirm Password</div>
          <div className="input-cont">
            <PasswordInput
              alertMsg="Passwords doesn’t match."
              placeholder="Enter one more time"
              onChangeInput={onInputChangeCompo("checkPassword")}
              required
              compareModeValue={state.password}
              getIsPassRule={getIsPassRule("isCheckPass")}
            />
          </div>
        </div>
      </div>
      <div className="popup-btn-box">
        <button className="popup-btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="popup-btn ok"
          disabled={!isFullData}
          onClick={createSubmit}
        >
          Confirm
        </button>
      </div>
    </Styled.CreateId>
  );
}
