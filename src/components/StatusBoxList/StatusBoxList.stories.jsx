import StatusBoxList from "./index";

export default {
  title: "components/StatusBoxList",
  component: StatusBoxList,
};

export const Default = (args) => <StatusBoxList {...args} />;
Default.args = {
  data: [
    {
      label: "Requested",
      statusColor: "#dfdf",
      value: 20,
      bgColor: "#ffff",
      fontColor: "#000",
    },
    {
      label: "Processed",
      statusColor: "#129BDB",
      value: 220,
      bgColor: "#ffffdd",
      fontColor: "#000",
    },
    {
      label: "Requested",
      statusColor: "yellow",
      value: 20,
      bgColor: "#129BDB",
      fontColor: "#000",
    },
  ],
  width: 500,
  height: 137,
};
