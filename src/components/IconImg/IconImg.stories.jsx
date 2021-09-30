import IconImg from "./index";

export default {
  title: "Components/IconImg",
  component: IconImg,
};

export const Default = (args) => <IconImg {...args} />;
Default.args = {
  imgType: "icon_dispatch",
  imgTypeActive: "icon_dispatch_active",
  block: false,
  isActive: false,
  width: 60,
  height: 60,
};
