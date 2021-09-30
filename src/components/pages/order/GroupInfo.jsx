import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { borderStyle } from "../../../utils/makeCss";
import { defaultGetApiSet } from "../../../utils/api";
import { URLPATH } from "../../../assets/data/common";
const Styled = {
  GroupInfo: styled.div`
    padding: 30px 100px;
    display: flex;
    column-gap: 30px;
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
    .group-wrap {
      .group-label {
        font-size: 0.88rem;
        font-weight: 600;
      }
      .group-trucknumber {
        align-items: center;
        height: 37px;
        line-height: 37px;
        font-size: 0.75rem;
        padding: 0 10px;
        background-color: #f7f7f7;
        display: flex;
        align-items: center;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .group-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 62px;
        font-size: 0.75rem;
        padding: 0 10px;
        background-color: #f7f7f7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 6px;

        .name {
        }
        .phone {
          color: #939393;
          white-space: normal;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  `,
  BoxWrapper: styled.div`
    .top {
      margin-top: 6px;
      display: flex;
      column-gap: 6px;
    }
    .bottom {
      margin-top: 6px;
    }
  `,
  Box: styled.div`
    background-color: #f7f7f7;
    width: ${(props) => (!props.width ? "102px" : props.width)};
    height: ${(props) => (!props.height ? "80px" : props.height)};
    border-radius: 5px;
    padding: ${(props) => (props.isPadding ? "21px 15px" : null)};
    .label {
      font-size: 0.75rem;
      color: #939393;
      margin-bottom: 4px;
    }
    .value {
    }
    .garage {
      line-height: 40px;
      padding-left: 10px;
    }
  `,
};

export default function GroupInfo(props) {
  const { order_id } = props;

  const [orderData, setOrderData] = useState([]);
  const Box = (props) => {
    const { label, value, width, height, garage, isPadding = true } = props;
    return (
      <Styled.Box width={width} height={height} isPadding={isPadding}>
        {label && <div className="label">{label}</div>}
        {value && <div className="value">{value}</div>}
        {garage && <div className="garage">{garage}</div>}
      </Styled.Box>
    );
  };
  const Init = async () => {
    const path = `${URLPATH.logisDispatch}/${order_id}`;
    try {
      const res = await defaultGetApiSet("", path);
      setOrderData(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    Init();
  }, []);
  return (
    <Styled.GroupInfo style={borderStyle("bottom")}>
      {orderData.map((item, index) => {
        const { first_name, last_name, phone, regist_num, garage_name } = item;
        const order =
          index.toString().length < 2 ? "0" + index.toString() : index;
        return (
          <div className="group-wrap" key={index}>
            <div className="group-label">
              {index === 0 ? "Leader Group" : `Group ${order}`}
            </div>
            <Styled.BoxWrapper>
              <div className="top">
                <Box label="Trucks" value={regist_num} />
                <Box label="Driver" value={first_name} />
              </div>
              <div className="bottom">
                <Box
                  width="100%"
                  height="40px"
                  garage={garage_name}
                  isPadding={false}
                />
              </div>
            </Styled.BoxWrapper>
          </div>
        );
      })}
    </Styled.GroupInfo>
  );
}
