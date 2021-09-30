import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import calendarImg from "../../assets/img/calendarImg.svg";
import { DEPTH } from "../../assets/data/common";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { changeUTCtime } from "../../utils/convertData";

const Styled = {
  CalendarWrap: styled.div`
    position: relative;
    width: max-content;
    background-color: #fff;
    .dateInput {
      position: relative;
      & input {
        padding: 11px 20px;
        font-size: 14px;
        color: #333333;
        border: none;
      }

      &:after {
        content: "";
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: url(${calendarImg}) no-repeat center;
      }
    }
  `,
  CalendarStyle: styled(Calendar)`
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(calc(100% + 5px));
    width: 350px;
    max-width: inherit !important;
    z-index: ${DEPTH.middle};
  `,
};

export default function CalendarCompo({
  getDate,
  parentValue, // new Date 타입
  placeholder = "",
  className,
  reset = false,
  ...props
}) {
  const [date, setDate] = React.useState(new Date());
  const [input, setInput] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  // const visibleRef = React.useRef(false);
  // const ref = React.useRef();
  const onChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // date로 사용할 수 있는 value인지 체크 후 안되면 상태 업데이트 하지 않음
    if (isNaN(new Date(value))) {
      return;
    }
    setDate(new Date(value));
    getDate && getDate(changeUTCtime(value, 0).format("YYYYMMDD"));
  };

  const changeCalendar = (date) => {
    setInput(changeUTCtime(date, 0).format("YYYY-MM-DD"));
    setDate(date);
    getDate && getDate(changeUTCtime(date, 0).format("YYYYMMDD"));
    // visibleRef.current = false;
    // setVisible(visibleRef.current);
    setVisible(false);
  };

  useDidUpdate(() => {
    if (reset) {
      setInput("");
    }
  }, [reset]);
  const openCalendar = (e) => {
    e.stopPropagation();
    // visibleRef.current = !visibleRef.current;
    // setVisible(visibleRef.current);
    setVisible(!visible);
  };

  // const handleClickOutside = (e) => {
  //   const target = e.target;
  //   if (visibleRef.current && !ref.current.contains(target)) {
  //     visibleRef.current = false;
  //     setVisible(visibleRef.current);
  //   }
  //   setVisible(false);
  // };

  // React.useEffect(() => {
  //   if (!!ref.current) {
  //     window.addEventListener("click", handleClickOutside);
  //   }
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <Styled.CalendarWrap className={className}>
      <div className="dateInput" onClick={openCalendar}>
        <input
          type="text"
          value={
            parentValue !== null
              ? changeUTCtime(parentValue, 0).format("YYYY-MM-DD")
              : input
          }
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      <Styled.CalendarStyle
        onChange={changeCalendar}
        calendarType="US"
        value={parentValue !== null ? parentValue : date}
        visible={visible}
        {...props}
      />
    </Styled.CalendarWrap>
  );
}
