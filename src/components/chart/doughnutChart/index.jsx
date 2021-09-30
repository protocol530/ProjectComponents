import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const Styled = {
  DoughnutChart: styled.div`
    position: relative;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: 0 auto;

    .report-title {
      position: absolute;
      left: 50%;
      top: ${(props) => `calc(${props.width} / 2)`};
      transform: translate(-50%, -50%);
      font-size: 0.88rem;
      line-height: 1.13rem;
      text-align: center;
    }
    .report-value {
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.13rem;
      text-align: center;
      margin-top: 27px;
    }
  `,
};

export default React.memo(function DoughnutChart({
  width = "135px",
  height = "auto",
  data,
  totalLabel = "",
  totalValue = 0,
  className,
}) {
  const options = {
    animation: false,
  };

  return (
    <Styled.DoughnutChart width={width} height={height} className={className}>
      <Doughnut data={data} options={options} />
      <div className="total-result">
        <div className="report-title">{totalLabel}</div>
        <div className="report-value">Total {totalValue}</div>
      </div>
    </Styled.DoughnutChart>
  );
});
