import Icon from "./index";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    fill: { control: "color" },
  },
};

export const Default = (args) => <Icon {...args} />;
Default.args = {
  imgType: "test",
  block: false,
  width: 60,
  height: 60,
};
