import styled from "styled-components";
import { borderStyle } from "../../../utils/makeCss";

const Styled = {
  TruckInfo: styled.div`
    display: grid;
    grid-template-columns: 2.66fr 2.77fr 1fr;
    padding: 30px 100px;
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
    .truck-info {
      .label {
        font-size: 0.88rem;
        font-weight: 600;
      }

      .truck {
        font-size: 0.88rem;
        background-color: #f7f7f7;
        height: 42px;
        line-height: 42px;
        padding-left: 15px;
        margin-top: 7px;
      }
    }
    .truck-info + .truck-info {
      margin-left: 10px;
    }
  `,
};

export default function TruckInfo({
  truckType,
  option,
  truckCount,
  border = "bottom",
}) {
  return (
    <Styled.TruckInfo style={borderStyle(border)}>
      <div className="truck-info">
        <div className="label">Truck Type</div>
        <div className="truck">{truckType}</div>
      </div>
      <div className="truck-info">
        <div className="label">Option</div>
        <div className="truck">{option}</div>
      </div>
      <div className="truck-info">
        <div className="label">Number</div>
        <div className="truck">{truckCount}</div>
      </div>
    </Styled.TruckInfo>
  );
}
