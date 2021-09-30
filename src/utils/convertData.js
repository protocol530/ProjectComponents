import styled from "styled-components";
import lc_start from "../assets/img/location_start.svg";
import lc_end from "../assets/img/location_end.svg";
import dot from "../assets/img/dot.svg";
import { STATUS } from "../assets/data/common";
import CheckIcon from "@material-ui/icons/Check";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import MenuButton from "../components/menuButton";
// images
import en from "../assets/img/en.svg";
import kr from "../assets/img/kr.svg";

const statusCheck = (value) => {
  const _value = value.toString();

  switch (_value) {
    case "0":
      return "#FF9B45";
    case "1":
      return "#5786ED";
    case "2":
      return "#03D078";
    case "3":
      return "#FF7474";
    case "4":
      return "#19A500";
    default:
      return "#000";
  }
};

const LocationStyle = styled.div`
  display: flex;
  align-items: center;
  .location {
    width: 125px;
    height: 34px;

    .start,
    .end {
      position: relative;
      padding-left: 28px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .start {
      &:before {
        width: 19px;
        height: 19px;
        background: url(${lc_start}) no-repeat center;
      }
    }
    .end {
      &:before {
        width: 19px;
        height: 19px;
        background: url(${lc_end}) no-repeat center;
      }
    }
    .date {
      padding-left: 28px;
      margin-top: 7px;
      text-align: left;
      color: #b5b5b5;
      font-size: 12px;
      line-height: 17px;
    }
  }

  .dot {
    width: 20px;
    height: 1px;
    background: url(${dot}) no-repeat center;
    margin: 0 12px;
  }
`;

const Location = ({ start, end, puDate, doDate }) => {
  return (
    <LocationStyle>
      <div className="location">
        <div className="start">{start}</div>
        <div className="date">
          {puDate && changeUTCtime(puDate, 0).format("YY/MM/DD, hh:mm A")}
        </div>
      </div>
      <div className="dot"></div>
      <div className="location">
        <div className="end">{end}</div>
        <div className="date">
          {doDate && changeUTCtime(doDate, 0).format("YY/MM/DD, hh:mm A")}
        </div>
      </div>
    </LocationStyle>
  );
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertTableDataValue = (value, key) => {
  return STATUS[key][value];
};
const Deny = styled.div`
  color: #ff7474;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
`;
const Select = styled.div`
  color: #499f00;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
`;
const Icon = styled.div`
  margin-left: 20px;
`;
export const convertTableData = (
  format,
  value,
  key,
  menuList,
  onDelete,
  onModifyModal
) => {
  const menuIcon = () => {
    return <MoreHorizIcon />;
  };
  switch (format) {
    case "status":
      return (
        <span style={{ color: statusCheck(value) }}>
          {key ? STATUS[key][value] : value}
        </span>
      );
    case "location":
      return (
        <Location
          puDate={value?.pu_datetime}
          start={value?.pu_city}
          doDate={value?.do_datetime}
          end={value?.do_city}
        />
      );
    case "trucks":
      return <span className="unit">{value ? `${value}Trucks` : "-"}</span>;
    case "T":
      return <span className="unit">{value ? `${value}T` : "-"}</span>;
    case "dong":
      return (
        <span className="unit">
          {value ? `${numberWithCommas(value)}₫` : "-"}
        </span>
      );
    case "select":
      if (value === "deny") {
        return (
          <Deny>
            <ClearIcon />
            Deny
          </Deny>
        );
      } else if (value) {
        return (
          <Select>
            <CheckIcon />
            Select
          </Select>
        );
      } else {
        return;
      }

    case "date":
      return value ? changeUTCtime(value, 0).format("DD/MM/YYYY") : "-";
    case "distance":
      return <span className="unit">{value ? `${value}km` : "-"}</span>;
    case "menu":
      return (
        <MenuButton
          menuList={menuList}
          Icon={menuIcon}
          onDelete={onDelete}
          onModifyModal={onModifyModal}
        />
      );
    case "icon":
      return <Icon>{value}</Icon>;
    case "dashHistory":
      return (
        <span
          style={{
            display: "block",
            backgroundColor: "#FFF5EC",
            borderRadius: "5px",
            color: "#FF9B45",
            height: "26px",
            lineHeight: "26px",
            width: "70px",
            textAlign: "center",
          }}
        >
          {value}
        </span>
      );
    default:
      return value ? value : "-";
  }
};

export const convertLanguage = (lang) => {
  switch (lang) {
    case "en":
      return "English";
    case "kr":
      return "Korean";
    default:
      break;
  }
};

const imgList = {
  en: en,
  kr: kr,
};

export const convertImgFromText = (text) => {
  return imgList[text];
};

export const calcTotalPage = (totalData, dataPerPage) => {
  return totalData % dataPerPage
    ? parseInt(totalData / dataPerPage) + 1
    : parseInt(totalData / dataPerPage);
};

export const transformDriverData = (data) => {
  const _driver = data.drivers.map((i) => {
    return { ...i, id: i.driver_id };
  });

  return { ...data, drivers: _driver };
};

// data는 list , pageInfo 포함한 전체 데이터
// dataKey는 list를 가리키는 키
// idName은 받아온 데이터리스트에서 고유 아이디 키
export const transformCheckTableId = (data, dataKey, idName) => {
  const _data = data[dataKey].map((i) => {
    return { ...i, id: i[idName] };
  });

  return { ...data, [dataKey]: _data };
};

export const changeUTCtime = (date = undefined, addTime) => {
  return moment(date).hour(addTime);
};
