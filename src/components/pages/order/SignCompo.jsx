import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import moment from "moment";
import { borderStyle } from "../../../utils/makeCss";
import { changeUTCtime } from "../../../utils/convertData";
const Styled = {
  SignCompo: styled.div`
    display: flex;
    justify-content: center;
    padding: 46px 0 52px;
    background-color: #fff;
    clip-path: polygon(
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px),
      0 10px
    );

    .sign-box {
      .sign-label {
        font-size: 0.75rem;
      }
      .sign {
        position: relative;
        width: 423px;
        height: 187px;
        border-radius: 5px;
        margin-top: 8px;
        padding: 14px 15px;
        color: #b5b5b5;
      }

      .sign-pick {
        background: url(${(props) => props.pickUpSign}) no-repeat center #f8f8f8;
        background-size: cover;
      }
      .sign-drop {
        background: url(${(props) => props.dropOffSign}) no-repeat center
          #f8f8f8;
        background-size: cover;
      }
      .sign-date {
        text-align: right;
        color: #e3e3e3;
        font-size: 0.75rem;
      }
    }
    .sign-box + .sign-box {
      margin-left: 10px;
    }
  `,
};

export default function SignCompo({
  border = "bottom",
  pickUpSign,
  pickUpTime,
  dropOffSign,
  dropOffTime,
}) {
  return (
    <Styled.SignCompo
      style={borderStyle(border)}
      pickUpSign={pickUpSign}
      dropOffSign={dropOffSign}
    >
      <div className="sign-box">
        <div className="sign-label">Signature from Pick-Up Point</div>
        <div className="sign sign-pick">Person in Charge Signature</div>
        <div className="sign-date">
          {changeUTCtime(pickUpTime, 0).format("DD MM,YYYY. hh:mm A")}
        </div>
      </div>
      <div className="sign-box">
        <div className="sign-label">Signature from Drop-Off Point</div>
        <div className="sign sign-drop">Person in Charge Signature</div>
        {dropOffTime && (
          <div className="sign-date">
            {changeUTCtime(dropOffTime, 0).format("DD MM,YYYY. hh:mm A")}
          </div>
        )}
      </div>
    </Styled.SignCompo>
  );
}
