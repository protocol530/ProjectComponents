import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../table/Table";
import CommonFilterCompo from "../CommonFilterCompo";
import { Select } from "../search";
import Pagination from "../pagination";
import { colors } from "../../style/color";
import { defaultGetApiSet } from "../../utils/api";
import { URLPATH } from "../../assets/data/common";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
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
      font-weight: 600;
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
  PagenationStyle: styled(Pagination)`
    justify-content: flex-end;
    margin: 46px 100px 77px 0;
  `,
};

export default function SelectForm(props) {
  const {
    tdDatas,
    innerDispatch,
    thDatas,
    truckTypes,
    truckOptions,
    garageList,
    type,
    select,
    setSelect,
    pageCount,
    boxValue,
    setBoxValue,
    choosedBox,
    setChoosedBox,
  } = props;

  const [reset, setReset] = useState(false);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const onChangeSelect = (key) => (value) => {
    setSelect({
      ...select,
      [key]: value,
    });
  };

  useEffect(() => {
    if (select !== undefined) {
      Object.values(select).map((value) => {
        if (value !== null) {
          setSearchDisabled(false);
        }
      });
    }
  }, [select]);

  const onSearch = async () => {
    const path = URLPATH.logisOrderTruckList;
    const params = {
      count: 10,
      type_id: select.truck,
      opt_id: select.option,
      garage_id: select.garage,
    };

    try {
      const res = await defaultGetApiSet(params, path);
      innerDispatch(res.data);
    } catch (err) {}
  };

  const onReset = async () => {
    const path = URLPATH.logisOrderTruckList;
    const params = {
      count: pageCount,
    };
    const res = await defaultGetApiSet(params, path);
    innerDispatch(res.data);
    setReset(true);
    setReset(false);
    setSearchDisabled(true);
    setSelect({
      truck: null,
      option: null,
      garage: null,
    });
  };

  const clickTableRow = (row, rowIdx) => {
    const newBoxValue = [...boxValue];
    const length = Object.keys(boxValue).length;
    const newTdValue = tdDatas;
    if (newTdValue.data[rowIdx].select) {
      return;
    }

    if (choosedBox[0] < length) {
      newBoxValue[choosedBox[0]][type].id = row.id;
      newBoxValue[choosedBox[0]][type].select = true;
      newBoxValue[choosedBox[0]][type].idx = rowIdx;
      if (type === "truck") {
        newBoxValue[choosedBox[0]][type].number = row.number;
        setChoosedBox([choosedBox[0], "driver"]);
      } else {
        newBoxValue[choosedBox[0]][type].name = row.name;
        setChoosedBox([choosedBox[0] + 1, "truck"]);
      }
      setBoxValue(newBoxValue);

      let boxTruckIdList = [];
      let boxDriverIdList = [];
      newBoxValue.forEach((item) => {
        const { truck, driver } = item;
        boxTruckIdList.push(truck.id);
        boxDriverIdList.push(driver.id);
      });

      newTdValue.data.forEach((value) => {
        if (value.select !== "deny") {
          value.select = false;
        }
        let req = false;
        if (type === "truck") {
          req = boxTruckIdList.includes(value.id);
        } else {
          req = boxDriverIdList.includes(value.id);
        }
        if (req) {
          value.select = true;
        }
      });
      innerDispatch(newTdValue);
    }
  };

  const clickPageNum = async (page) => {
    let truckIdList = [];
    let driverIdList = [];
    boxValue.forEach((item) => {
      const { truck, driver } = item;
      truckIdList.push(truck.id);
      driverIdList.push(driver.id);
    });

    const path =
      type === "truck"
        ? URLPATH.logisOrderTruckList
        : URLPATH.logisOrderDriverList;
    const params = {
      count: pageCount,
      page: page,
    };
    if (type === "truck" && select.truck) {
      params["type"] = select.truck;
      params["opt"] = select.option;
    }

    try {
      const res = await defaultGetApiSet(params, path);
      res.data.data.forEach((item) => {
        let req = "";
        if (type === "truck") {
          req = truckIdList.includes(item.truck_id);
        } else {
          req = driverIdList.includes(item.driver_id);
        }
        if (req) {
          item.select = true;
        }
      });
      innerDispatch(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const SelectTruckModel = [
    <Select
      width="240px"
      options={truckTypes}
      label="Model Type"
      className="select"
      onChange={onChangeSelect("truck")}
      reset={reset === true}
    />,
  ];
  const SelectTruckOption = [
    <Select
      width="240px"
      options={truckOptions}
      label="Option"
      className="select"
      onChange={onChangeSelect("option")}
      reset={reset === true}
      disabled={select && select.truck === null ? true : false}
    />,
  ];
  const SelectGarage = [
    <Select
      width="240px"
      options={garageList}
      label="Garage"
      className="select"
      onChange={onChangeSelect("garage")}
      reset={reset === true}
    />,
  ];

  return (
    <Styled.Accordion defaultExpanded={true}>
      <Styled.Header expandIcon={<ExpandMoreIcon />}>
        {thDatas.title}
      </Styled.Header>
      <Styled.Detail>
        {type === "truck" ? (
          <CommonFilterCompo
            selectCompo={[SelectTruckModel, SelectTruckOption, SelectGarage]}
            onSearch={onSearch}
            onReset={onReset}
            disabled={searchDisabled}
          />
        ) : null}
        <Styled.ShowingCount>
          Showing {tdDatas.pageInfo?.currentPage}page of{" "}
          {tdDatas.pageInfo?.totalPages} result
        </Styled.ShowingCount>
        <Table
          data={tdDatas.data}
          columns={thDatas.columns}
          page={type === "truck" ? "vehicle" : "driver"}
          headAlign="left"
          bodyAlign="left"
          onClick={clickTableRow}
        />
        {tdDatas.length !== 0 ? (
          <Styled.PagenationStyle
            currentPage={tdDatas && tdDatas.pageInfo.currentPage}
            totalData={tdDatas && tdDatas.pageInfo.totalData}
            cb={clickPageNum}
          />
        ) : null}
      </Styled.Detail>
    </Styled.Accordion>
  );
}
