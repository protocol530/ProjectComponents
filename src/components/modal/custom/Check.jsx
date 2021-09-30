import React from "react";
import styled from "styled-components";

const Styled = {
  Check: styled.div`
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
        background-color: ${(props) => props.doSomethingColor};
        color: #fff;
      }
    }
  `,
};

export default function Check(props) {
  const {
    title = "",
    info = "",
    doSomethingBtnText = "Confirm",
    doSomethingColor = "#5786ED",
    onCancel,
  } = props;
  return (
    <Styled.Check doSomethingColor={doSomethingColor}>
      <div className="text-box">
        <h3 className="popup-title">{title}</h3>
        <p className="popup-intro-text">{info}</p>
      </div>
      <div className="popup-btn-box">
        <button className="popup-btn ok" onClick={onCancel}>
          {doSomethingBtnText}
        </button>
      </div>
    </Styled.Check>
  );
}
