import * as React from "react";
import styled from "styled-components";

const Styled = {
  ProgressBar: styled.div`
    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.88rem;
      .label {
        font-weight: 400;
      }
      .value {
        font-weight: 300;
      }
    }

    .progress-bar {
      position: relative;
      height: 8px;
      background-color: #eaeaea;
      border-radius: 4px;
      margin-top: 4px;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 10px;
        width: ${(props) => (props.percent ? props.percent : 0)}%;
        background-color: ${(props) => props.bgColor};
      }
    }
  `,
};

export default React.memo(function ProgressBar({
  label = "",
  value = 0,
  total = 0,
  bgColor = "#129BDB",
}) {
  const percent = Math.floor((value / total) * 100);

  return (
    <Styled.ProgressBar percent={percent} bgColor={bgColor}>
      <div className="progress-label">
        <span className="label">{label}</span>
        <span className="value">
          {value}({percent ? percent : 0}%)
        </span>
      </div>
      <div className="progress-bar"></div>
    </Styled.ProgressBar>
  );
});
