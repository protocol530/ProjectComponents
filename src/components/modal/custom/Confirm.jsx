import * as React from "react";
import styled from "styled-components";

const Styled = {
  Confirm: styled.div`
    background-color: #fff;
    padding: 40px 0 30px;
    border-radius: 5px;

    .text-box {
      padding: 0 50px;

      .popup-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .popup-intro-text {
        margin-top: 10px;
        font-size: 0.9rem;
        color: #939393;
      }
    }

    .popup-btn-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 60px;
      padding: 0 30px;
      font-size: 1rem;

      button.popup-btn {
        padding: 15px 20px;
        color: #000;
        border: none;
        background-color: #fff;
        border-radius: 5px;
      }

      .popup-btn.ok {
        background-color: ${(props) => props.doSomethingColor};
        color: #fff;
        font-weight: bold;
      }
    }
  `,
};

export default function Confirm({
  title = "",
  info = "",
  CancelSomethingBtnText = "Cancel",
  doSomethingBtnText = "Confirm",
  doSomethingColor = "#5786ED",
  doSomething,
  onCancel,
}) {
  return (
    <Styled.Confirm doSomethingColor={doSomethingColor}>
      <div className="text-box">
        <h3 className="popup-title">{title}</h3>
        <p className="popup-intro-text">
          {info.split("\n").map((line) => {
            console.log("???", line);
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </p>
      </div>
      <div className="popup-btn-box">
        <button className="popup-btn" onClick={onCancel}>
          {CancelSomethingBtnText}
        </button>
        <button className="popup-btn ok" onClick={doSomething}>
          {doSomethingBtnText}
        </button>
      </div>
    </Styled.Confirm>
  );
}
