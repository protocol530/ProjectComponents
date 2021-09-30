import * as React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { MONTHLY } from "../../../assets/data/common";

const Styled = {
  LineChart: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width};
    min-height: 280px;
  `,
};

export default React.memo(function LineChart({
  tickType = "k", // y축 틱 라벨 표기 form type
  data = [],
  xAxisLabel = MONTHLY,
  width = "100%",
}) {
  const convertTickValue = (type, value) => {
    switch (type) {
      case "k":
        return Number(value) >= 1000 ? `${Number(value) / 1000}K` : value;
      default:
        return value;
    }
  };

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "#fff";
      tooltipEl.style.boxShadow = "0 5px 15px rgba(68,68,79,0.1)";
      tooltipEl.style.borderRadius = "10px";
      tooltipEl.style.color = "#000";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, -100%)";
      tooltipEl.style.transition = "all .1s ease";
      tooltipEl.style.display = "flex";
      tooltipEl.style.alignItems = "center";
      tooltipEl.style.padding = "0 25px";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      bodyLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        th.style.color = "#000";
        th.style.fontSize = "0.75rem";
        th.style.fontWeight = "bold";
        th.style.textAlign = "center";

        const text = document.createTextNode(`${title}₫`);
        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      titleLines.forEach((body, i) => {
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;
        td.style.color = "#696974";
        td.style.fontSize = "0.63rem";
        td.style.textAlign = "center";

        const text = document.createTextNode(body);

        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY - 15 + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
  };

  const options = {
    animation: false,
    scales: {
      yAxis: {
        min: 0,
        grid: {
          display: false,
          borderWidth: 0,
        },
        ticks: {
          padding: 29,
          callback: function (value, index, values) {
            return convertTickValue(tickType, value);
          },
        },
      },
      xAxis: {
        grid: {
          borderWidth: 0,
        },
        ticks: {
          padding: 10,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
      legend: {
        display: false,
      },
    },
  };

  const chartData = {
    labels: xAxisLabel,
    datasets: [
      {
        label: "",
        data: data,
        fill: false,
        borderColor: "#0A72EC",
        borderWidth: 3,
        tension: 0.5,
        pointHoverBackgroundColor: "#0062FF",
        pointBorderWidth: 0,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: "#fff",
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 10,
      },
    ],
  };

  return (
    <Styled.LineChart width={width}>
      {data?.length ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="no-data">No Data</div>
      )}
    </Styled.LineChart>
  );
});
