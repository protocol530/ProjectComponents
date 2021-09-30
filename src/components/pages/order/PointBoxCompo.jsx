import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { borderStyle } from "../../../utils/makeCss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { changeUTCtime } from "../../../utils/convertData";
const Styled = {
  PointBoxCompo: styled.div`
    padding: 40px 100px 160px;
    background-color: #fff;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px),
      0 0
    );
    .section-title {
      width: 100%;
      font-size: 1.25rem;
      color: #7e95b7;
    }

    .section-box {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .point-box {
      .point-wrap {
        background-color: #f7f7f7;
        border-radius: 5px;

        width: 423px;
        /* height: 176px; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .point-part {
          padding: 23px 20px 0 20px;
        }
        .label {
          color: #939393;
          font-size: 0.88rem;
        }

        .addr {
          font-size: 1.88rem;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .addr-detail {
          color: #939393;
          font-size: 0.88rem;
          margin-top: 5px;
          white-space: pre-wrap;
          height: 54px;
        }
      }

      .info-box {
        margin-top: 10px;

        .responsibility-box {
          height: 83px;
          display: flex;
          align-items: center;
          border: 1px dotted #939393;

          .responsibility {
            color: #939393;
            font-size: 1rem;
          }
          .res-label {
            text-align: center;
            width: 114px;
            height: 100%;
            line-height: 81px;
            border-right: 1px dotted #939393;
          }
          .res-data {
            padding-left: 20px;
          }
        }

        .date {
          margin-top: 11px;
          text-align: right;
          color: #939393;
          font-size: 0.88rem;
        }
      }
    }
    .point-box + .point-box {
      margin-left: 6px;
    }
  `,
  Accordion: styled(Accordion)`
    &.MuiAccordion-root {
      background-color: #f7f7f7;
      width: 423px;
      border: none;
      &.Mui-expanded {
        margin: 0;
      }
      &.MuiPaper-elevation1 {
        box-shadow: none;
      }
      :before {
        height: 0px;
      }
    }

    .MuiAccordionSummary-content {
      display: flex;
      align-items: center;
      column-gap: 10px;
      margin: 20px 0;
    }
    .MuiAccordionDetails-root {
      background-color: #6d7581;
      color: white;
      border-radius: 0 0 10px 10px;
      display: grid;
      grid-template-columns: 1fr 2.7fr;
      height: 120px;
      padding: 0;
      .position {
        padding: 20px;
        border-right: 1px dashed;
        font-weight: bold;
      }
      .info {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-weight: bold;
          margin-bottom: 6px;
        }
        .phone {
          font-size: 0.75rem;
        }
        .company {
          font-weight: bold;
        }
      }
    }
    .badge {
      width: 96px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 0.75rem;
      font-weight: bold;
      color: white;
      border-radius: 30px;
    }
    .pick-up {
      background-color: #5786ed;
    }
    .drop-off {
      background-color: #ff7474;
    }
  `,
};

export default function PointBoxCompo({
  pu_city,
  pu_addr,
  pu_addr_detail,
  pu_datetime,
  pu_pic,
  pu_phone,
  do_city,
  do_addr,
  do_addr_detail,
  do_datetime,
  do_pic,
  do_phone,
  company_name,
  border = "bottom",
}) {
  const [expand, setExpand] = useState({
    pickUp: false,
    dropOff: false,
  });
  const handleChange = (key) => () => {
    setExpand((expand) => ({
      ...expand,
      [key]: !expand[key],
    }));
  };
  return (
    <Styled.PointBoxCompo style={borderStyle(border)}>
      <div className="section-box">
        <div className="point-box">
          <div className="point-wrap">
            <div className="point-part">
              <div className="addr">{pu_city ? pu_city : "-"}</div>
              <div className="addr-detail">
                {pu_addr_detail ? pu_addr_detail : "-"}
                <br />
                {pu_addr ? pu_addr : "-"}
              </div>
            </div>
            <Styled.Accordion
              expanded={expand.pickUp}
              onChange={handleChange("pickUp")}
            >
              <AccordionSummary
                className="inner"
                expandIcon={<ExpandMoreIcon />}
              >
                <div className="pick-up badge">Pick-up</div>
                <div className="date">
                  {changeUTCtime(pu_datetime, 0).format("DD MMM, hh:mm A")}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="position">Manager</div>
                <div className="info">
                  <div>
                    <div className="name">{pu_pic}</div>
                    <div className="phone">{pu_phone}</div>
                  </div>
                  <div className="company">{company_name}</div>
                </div>
              </AccordionDetails>
            </Styled.Accordion>
          </div>
        </div>

        <div className="point-box">
          <div className="point-wrap">
            <div className="point-part">
              <div className="addr">{do_city ? do_city : "-"}</div>
              <div className="addr-detail">
                {do_addr_detail ? do_addr_detail : "-"}
                <br />
                {do_addr ? do_addr : "-"}
              </div>
            </div>
            <Styled.Accordion
              expanded={expand.dropOff}
              onChange={handleChange("dropOff")}
            >
              <AccordionSummary
                className="inner"
                expandIcon={<ExpandMoreIcon />}
              >
                <div className="drop-off badge">Drop-off</div>
                <div className="date">
                  {do_datetime !== null
                    ? changeUTCtime(do_datetime, 0).format("DD MMM, hh:mm A")
                    : null}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="position">Manager</div>
                <div className="info">
                  <div>
                    <div className="name">{do_pic}</div>
                    <div className="phone">{do_phone}</div>
                  </div>
                  <div className="company">{company_name}</div>
                </div>
              </AccordionDetails>
            </Styled.Accordion>
          </div>
        </div>
      </div>
    </Styled.PointBoxCompo>
  );
}
