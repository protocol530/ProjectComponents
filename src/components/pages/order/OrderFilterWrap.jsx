import * as React from "react";
import { Select } from "../../search";
import CalendarCompo from "../../calendar";
import CommonFilterCompo from "../../CommonFilterCompo";
import moment from "moment";
import { changeUTCtime } from "../../../utils/convertData";
const initState = {
  date: {
    from: null,
    to: null,
  },
  status: null,
};
export default function OrderFilterWrap({
  selectOption = [],
  setState,
  state,
  onSearch,
  resetApi,
  type = "A",
}) {
  const [searchDisabled, setSearchDisabled] = React.useState(true);
  React.useEffect(() => {
    if (state.date.from !== null && state.date.to !== null) {
      setSearchDisabled(false);
    }
    if (state.status === undefined) {
    } else if (state.status !== null) {
      setSearchDisabled(false);
    }
  }, [state]);

  const onChangeSelect = (value) => {
    setState((draft) => {
      draft.status = value;
    });
  };

  const getDate = (key) => (date) => {
    setState((draft) => {
      draft.date[key] = date;
    });
  };

  const onReset = () => {
    resetApi && resetApi();
    setSearchDisabled(true);
    if (initState.date !== state.date) {
      setState((draft) => {
        draft.date = initState.date;
      });
    }
    if (initState.status !== state.status) {
      setState((draft) => {
        draft.status = initState.status;
      });
    }
  };

  const DateCompo = {
    A: [
      <CalendarCompo
        placeholder="Pick Up From"
        getDate={getDate("from")}
        parentValue={state.date.from && changeUTCtime(state.date.from, 0)._d}
      />,
      <CalendarCompo
        placeholder="Pick Up To"
        getDate={getDate("to")}
        parentValue={state.date.to && changeUTCtime(state.date.to, 0)._d}
      />,
    ],
    B: [
      <CalendarCompo
        placeholder="Pick Up From"
        getDate={getDate("from")}
        parentValue={state.date.from && changeUTCtime(state.date.from, 0)._d}
      />,
      <CalendarCompo
        placeholder="Pick Up To"
        getDate={getDate("to")}
        parentValue={state.date.to && changeUTCtime(state.date.to, 0)._d}
      />,
    ],
  };
  const SelectCompo = {
    A: [
      <Select
        id="status"
        parentValue={state.status}
        width="200px"
        options={selectOption}
        label="Status"
        className="select"
        onChange={onChangeSelect}
        reset={state.status === null}
        status="status"
      />,
    ],
    B: [],
  };

  return (
    <CommonFilterCompo
      dateCompo={DateCompo[type]}
      selectCompo={SelectCompo[type]}
      onSearch={onSearch}
      onReset={onReset}
      disabled={searchDisabled}
    />
  );
}
