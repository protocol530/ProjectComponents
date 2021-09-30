import * as React from "react";
import styled from "styled-components";
import { borderStyle } from "../../../utils/makeCss";
const Styled = {
  MemoInfo: styled.div`
    padding: 33px 100px 40px;
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

    .memo-label {
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .memo-cont {
      padding: 13px 15px;
      background-color: #f7f7f7;
      height: 120px;
    }
  `,
};

export default function MemoInfo({ memo = "", border = "bottom" }) {
  return (
    <Styled.MemoInfo style={borderStyle(border)}>
      <div className="memo-label">Memo</div>
      <div className="memo-cont">
        {memo?.length ? memo : "메모칸입니다. 최대 길이 200자 제한"}
      </div>
    </Styled.MemoInfo>
  );
}
