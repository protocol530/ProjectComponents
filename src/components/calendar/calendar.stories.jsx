import CalendarCompo from "./index";
import "react-calendar/dist/Calendar.css";

export default {
  title: "components/CalendarCompo",
  component: CalendarCompo,
};

export const Default = (args) => <CalendarCompo {...args} />;
Default.args = {};
