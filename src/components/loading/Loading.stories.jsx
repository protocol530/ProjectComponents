import Loading from "./index";

export default {
  title: "components/Loading",
  component: Loading,
};

export const Default = (args) => <Loading {...args} />;
Default.args = {
  loading: false,
};
