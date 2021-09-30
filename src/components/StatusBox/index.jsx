import * as React from "react";
import styled from "styled-components";

const Styled = {
  StatusBox: styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.fontColor};
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: calc(16px + 17px);
      height: 100%;
      background-color: ${(props) => props.statusColor};
    }

    .label-wrap {
      display: flex;
      align-items: center;

      .img-wrap {
        background: ${(props) =>
          `url(${props.labelImg}) no-repeat center ${props.statusColor}`};
        border-radius: 50%;
        width: 33px;
        height: 33px;
        overflow: hidden;
        z-index: 1;
      }

      .label {
        font-size: 0.94rem;
        font-weight: bold;
        margin-left: 9px;
      }
    }

    .score {
      margin-left: 30px;
      font-size: 1.63rem;
      font-weight: bold;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      line-height: 80px;
      text-align: center;
      background-color: #f6f8fa;
    }
  `,
};

export default React.memo(function StatusBox({
  labelImg,
  labelText = "",
  value,
  statusColor = "#fff",
  width = "100%",
  height = "100%",
  bgColor = "#fff",
  fontColor = "#000",
  className,
}) {
  return (
    <Styled.StatusBox
      statusColor={statusColor}
      width={width}
      height={height}
      bgColor={bgColor}
      fontColor={fontColor}
      className={className}
      labelImg={labelImg}
    >
      <div className="label-wrap">
        <div className="img-wrap"></div>
        <div className="label">{labelText}</div>
      </div>
      <div className="score">{value}</div>
    </Styled.StatusBox>
  );
});
