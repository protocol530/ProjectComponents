import Input from "./index";

export default {
  title: "Components/Input",
  component: Input,
};

export const Default = (args) => <Input {...args} />;
Default.args = {
  width: 60,
  height: 60,
};
