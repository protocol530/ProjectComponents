import React, { useState, useEffect, useReducer } from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import moment from "moment";
import Table from "../table/Table";
import CommonFilterCompo from "../CommonFilterCompo";
import { Select } from "../search";
import CalendarCompo from "../calendar";
import Pagination from "../pagination";
import { colors } from "../../style/color";
import { defaultGetApiSet } from "../../utils/api";
import { URLPATH } from "../../assets/data/common";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  truckSurchargeReducer,
  truckDispatchReducer,
} from "../../hooks/useReducer";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { calcTotalPage } from "../../utils/convertData";
import { useDispatch } from "react-redux";
import { vehicleManagementSurchargeRow } from "../../store/reducers/vehicleManagementSlice";
const Styled = {
  Accordion: styled(Accordion)`
    &.MuiAccordion-root {
      margin-bottom: 10px;
      box-shadow: none;
    }
    &.MuiAccordion-root.Mui-expanded {
      margin: 0;
    }
  `,
  Header: styled(AccordionSummary)`
    &.MuiAccordionSummary-root {
      background-color: ${colors.tableBackground};
      padding-left: 100px;
      height: 68px;
      display: flex;
      align-items: center;
      border: solid 1px #e3e3e3;
      font-size: 1.25rem;
    }
  `,
  Detail: styled(AccordionDetails)`
    &.MuiAccordionDetails-root {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  `,
  ShowingCount: styled.div`
    height: 48px;
    font-size: 0.875rem;
    padding-left: 100px;
    display: flex;
    align-items: center;
    color: #b5b5b5;
  `,
  AddSurchargeWrapper: styled.div`
    padding: 20px 100px 50px 100px;
    div {
      display: flex;
      justify-content: flex-end;
      color: #9b9b9b;
    }
    .money {
      font-size: 1.875rem;
      font-weight: bold;
      color: black;
      margin-top: 10px;
    }
    button {
      background-color: #004cf2;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: bold;
      color: white;
    }
  `,
  PagenationStyle: styled(Pagination)`
    justify-content: flex-end;
    margin: 46px 100px 77px 0;
  `,
};
const initDatas = {
  data: [],
  pageInfo: {
    totalData: "",
    currentPage: "",
    dataPerPage: "",
    totalPages: "",
    startRow: "",
  },
  total: "",
};
const initState = {
  date: {
    from: null,
    to: null,
  },
};
export default function ListForm(props) {
  const {
    truckId,
    thDatas,
    type,
    onAdd,
    upload,
    openModifyMain,
    openDelete,
  } = props;

  const initReducer =
    type === "surcharge" ? truckSurchargeReducer : truckDispatchReducer;
  const [tdDatas, tdDatasDispatch] = useReducer(initReducer, initDatas);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [state, setState] = useImmer(initState);
  const dispatch = useDispatch();
  const getDate = (key) => (date) => {
    setState((draft) => {
      draft.date[key] = date;
    });
  };
  const setDatasApi = async (params, path) => {
    try {
      const res = await defaultGetApiSet(params, path);
      if (type === "surcharge") {
        dispatch(vehicleManagementSurchargeRow(...res.data.surcharges));
      }
      tdDatasDispatch(res.data);
    } catch (err) {}
  };
  const onReset = () => {
    setSearchDisabled(true);
    setState((draft) => {
      draft.date = initState.date;
    });
    Init();
  };
  const onSearch = async () => {
    const path = `${URLPATH.logisTruck}/${truckId}/${type}`;
    const params = {
      count: 10,
      from: state.date.from,
      to: state.date.to,
    };
    setDatasApi(params, path);
  };
  useEffect(() => {
    if (state.date.from !== null && state.date.to !== null) {
      setSearchDisabled(false);
    }
  }, [state]);

  const Init = async (page) => {
    try {
      const path = `${URLPATH.logisTruck}/${truckId}/${type}`;
      const params = {
        count: 10,
        page: page,
      };
      setDatasApi(params, path);
    } catch (err) {}
  };
  useEffect(() => {
    Init();
  }, [upload]);
  const DateCompo = [
    <CalendarCompo
      placeholder="Pick Up From"
      getDate={getDate("from")}
      parentValue={state.date?.from && moment.utc(state.date?.from)._d}
      reset={state.date.from === null}
    />,
    <CalendarCompo
      placeholder="Pick Up to"
      getDate={getDate("to")}
      parentValue={state.date?.to && moment.utc(state.date?.to)._d}
      reset={state.date.to === null}
    />,
  ];
  const moreList = [
    {
      key: "delete",
      label: "Delete",
    },
    {
      key: "modifyModal",
      label: "Modify",
    },
  ];

  const totalPage = calcTotalPage(
    tdDatas.pageInfo.totalData,
    tdDatas.pageInfo.dataPerPage
  );
  return (
    <Styled.Accordion defaultExpanded={true}>
      <Styled.Header expandIcon={<ExpandMoreIcon />}>
        {thDatas.title}
      </Styled.Header>
      <Styled.Detail>
        {type === "dispatch" ? (
          <CommonFilterCompo
            dateCompo={DateCompo}
            onSearch={onSearch}
            onReset={onReset}
            disabled={searchDisabled}
          />
        ) : null}
        <Styled.ShowingCount>
          Showing {tdDatas.pageInfo.currentPage}page of{" "}
          {totalPage ? totalPage : "0"} result
        </Styled.ShowingCount>
        <Table
          data={tdDatas.data}
          columns={thDatas.columns}
          headAlign="left"
          bodyAlign="left"
          // onClick={clickTableRow}
          menuList={moreList}
          onDelete={openDelete}
          onModifyModal={openModifyMain}
        />
        {type === "surcharge" ? (
          <Styled.AddSurchargeWrapper>
            <button onClick={onAdd}>+ Add</button>
            <div>Total</div>
            <div className="money">{tdDatas.total}</div>
          </Styled.AddSurchargeWrapper>
        ) : null}
        <Styled.PagenationStyle
          currentPage={tdDatas.pageInfo.currentPage}
          totalData={tdDatas.pageInfo.totalData}
          cb={Init}
        />
      </Styled.Detail>
    </Styled.Accordion>
  );
}
