import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import PageLabel from "../../components/PageLabel";
import { PATH } from "../../assets/data/common";

const TabNavCompoStyle = styled.div`
  background-color: #f7f7f7;

  .tab-control {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e3e3e3;

    .pageLabel-wrap {
      padding: 30px 100px;
      border-bottom: 1px solid #e3e3e3;
    }

    .tab {
      padding: 0 100px;
      height: 50px;
      display: flex;
      align-items: center;
      .tab-btn {
        position: relative;
        display: block;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 1rem;
        height: 100%;
        line-height: 50px;
        font-weight: bold;
        color: #b5b5b5;

        &.on {
          color: #5786ed;
        }
        &.on:after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 100%;
          height: 6px;
          background-color: #5786ed;
          transform: translateX(-50%);
          border-radius: 4px 4px 0 0;
        }
      }
      .tab-btn + .tab-btn {
        margin-left: 20px;
      }
    }
  }
`;

export default function TabNavLayout({ children }) {
  const tabNavDataSet = [
    {
      label: "Request",
      link: PATH.orderManagement_req,
    },
    {
      label: "Accept",
      link: PATH.orderManagement_accept,
    },
    {
      label: "Before shipping",
      link: PATH.orderManagement_before,
    },
    {
      label: "Shipping",
      link: PATH.orderManagement_shipping,
    },
    {
      label: "Completed",
      link: PATH.orderManagement_account,
    },
  ];

  return (
    <TabNavCompoStyle>
      <div className="tab-control">
        <div className="pageLabel-wrap">
          <PageLabel imgType="icon_dispatch" labelText="Order Management" />
        </div>
        <div className="tab">
          {tabNavDataSet.map((item, idx) => {
            return (
              <NavLink
                exact
                to={item.link}
                className="tab-btn"
                activeClassName="on"
                data-index={idx}
                key={idx}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="">{children}</div>
    </TabNavCompoStyle>
  );
}
