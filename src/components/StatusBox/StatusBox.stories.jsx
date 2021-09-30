import StatusBox from "./index";

export default {
  title: "components/StatusBox",
  component: StatusBox,
  argTypes: {
    statusColor: { control: "color" },
    bgColor: { control: "color" },
    fontColor: { control: "color" },
  },
};

export const Default = (args) => <StatusBox {...args} />;
Default.args = {
  label: "request",
  value: 10,
  width: 500,
  height: 137,
};
