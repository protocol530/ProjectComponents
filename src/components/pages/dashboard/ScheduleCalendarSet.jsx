import * as React from "react";
import styled from "styled-components";
import ScheduleCalendar from "../../calendar/ScheduleCalendar";

import scheduleImg from "../../../assets/img/schedule.svg";

const Styled = {
  ScheduleCalendarSet: styled.div`
    display: flex;
    height: 100%;
    .calendar-box {
      display: flex;
      width: 523px;
      margin-top: 20px;
    }

    .schedule-list-box {
      width: 395px;
      border-left: 1px solid #e3e3e3;
    }
  `,
  ScheduleList: styled.div`
    height: 100%;
    h3.label {
      color: #fff;
      background-color: #5786ed;
      height: 56px;
      line-height: 56px;
      font-size: 1rem;
      padding: 0 20px;
    }

    .schedule-list {
      overflow-y: scroll;
      height: calc(100% - 56px);
      padding: 20px;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  `,
  ScheduleListItem: styled.li`
    position: relative;
    padding-left: 30px;
    & + & {
      margin-top: 30px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      background: url(${scheduleImg}) no-repeat center;
      width: 20px;
      height: 20px;
    }

    .schedule-info {
      font-size: 0.88rem;
      font-weight: bold;

      .do-time {
        color: #5786ed;
        margin-left: 10px;
      }
    }

    .cargo {
      margin-top: 6px;
      color: #b5b5b5;
      font-size: 0.75rem;
    }
  `,
};

export default function ScheduleCalendarSet({
  getDate,
  getMonth,
  schedule = [], // 달력 표시 스케줄 날짜
  scheduleList = [], // 우측 스케줄리스트
  selectDate,
}) {
  const scheduleListRender = () => {
    return scheduleList.map((item) => {
      return (
        <Styled.ScheduleListItem>
          <div className="schedule-info">
            <span className="location">
              {item.pu_city} - {item.do_city}
            </span>
            <span className="do-time">{item.pu_datetime}</span>
          </div>
          <div className="cargo">
            <span className="cargo-name">{item.driver_name}</span>
            <span className="cargo-count">
              {item.driver_crew_count ? `+ ${item.driver_crew_count}` : ""}
            </span>
          </div>
        </Styled.ScheduleListItem>
      );
    });
  };

  return (
    <Styled.ScheduleCalendarSet>
      <div className="calendar-box">
        <ScheduleCalendar
          getDate={getDate}
          getMonth={getMonth}
          schedule={schedule}
          selectDate={selectDate}
        />
      </div>
      <div className="schedule-list-box">
        <Styled.ScheduleList>
          <h3 className="label">Schedule</h3>
          <ul className="schedule-list">{scheduleListRender()}</ul>
        </Styled.ScheduleList>
      </div>
    </Styled.ScheduleCalendarSet>
  );
}
