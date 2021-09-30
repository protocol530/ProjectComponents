import Select from "./Select";

export default {
  title: "components/Select",
  component: Select,
};

export const Default = (args) => <Select {...args} />;
Default.args = {
  id: "id",
  options: ["base1", "base2", "base3"],
  label: "default",
};
