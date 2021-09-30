import ProgressBar from "./index";

export default {
  title: "components/ProgressBar",
  component: ProgressBar,
};

export const Default = (args) => <ProgressBar {...args} />;
Default.args = {
  label: "test",
  value: 200,
  total: 400,
  bgColor: "#129BDB",
};
