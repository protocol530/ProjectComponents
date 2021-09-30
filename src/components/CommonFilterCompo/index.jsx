import * as React from "react";
import styled from "styled-components";
import reset from "../../assets/img/reset.svg";
import { colors } from "../../style/color";
const Styled = {
  CommonFilterStyle: styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.tableBackground};
    padding: 20px 100px;
    justify-content: space-between;
    .filter-panel-box {
      display: flex;
      align-items: center;
    }
    .wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .wrap:not(:last-child) {
      padding-right: 20px;
    }
    .wrap:not(:first-child) {
      padding-left: 20px;
    }
    .wrap + .wrap:before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 23px;
      background-color: #e6e6e6;
    }

    .search-wrap {
    }
    .date-wrap {
      .date + .date {
        position: relative;
        padding-left: 17px;
      }
      .date + .date:before {
        content: "-";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #adadad;
        display: inline-block;
        padding: 0 5px;
      }
    }
    .select-wrap {
      .selector:not(:first-child) {
        margin-left: 18px;
      }
    }
    .filter-btn-wrap {
      .btn + .btn {
        margin-left: 20px;
      }
    }
    .action-btn-wrap {
      .action-btn:not(:first-child) {
        margin-left: 10px;
      }
    }
  `,
  SearchBtn: styled.button`
    width: 90px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    background-color: ${(props) => (props.disabled ? "#B5B5B5" : "#004cf2")};
    :hover {
      cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
    }
  `,
  ResetBtn: styled.button`
    display: block;
    text-indent: -9999px;
    width: 40px;
    height: 40px;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    background: url(${reset}) no-repeat center #fff;
  `,
};

export default function CommonFilterCompo({
  searchCompo,
  dateCompo = [],
  selectCompo = [],
  onSearch,
  onReset,
  actionBtnComp = [],
  disabled = true,
}) {
  return (
    <Styled.CommonFilterStyle>
      <div className="filter-panel-box">
        {searchCompo && <div className="search-wrap wrap">{searchCompo}</div>}

        {!!dateCompo.length && (
          <div className="date-wrap wrap">
            {dateCompo.map((Compo, idx) => {
              return (
                <div key={idx} className="date">
                  {Compo}
                </div>
              );
            })}
          </div>
        )}
        {!!selectCompo.length && (
          <div className="select-wrap wrap">
            {selectCompo.map((Compo, idx) => {
              return (
                <div key={idx} className="selector">
                  {Compo}
                </div>
              );
            })}
          </div>
        )}

        <div className="filter-btn-wrap wrap">
          <div className="btn">
            <Styled.SearchBtn disabled={disabled} onClick={onSearch}>
              Search
            </Styled.SearchBtn>
          </div>
          <div className="btn">
            <Styled.ResetBtn onClick={onReset}>reset</Styled.ResetBtn>
          </div>
        </div>
      </div>
      {!!actionBtnComp.length && (
        <div className="action-btn-wrap wrap">
          {actionBtnComp.map((Compo, idx) => {
            return (
              <div key={idx} className="action-btn">
                {Compo}
              </div>
            );
          })}
        </div>
      )}
    </Styled.CommonFilterStyle>
  );
}
