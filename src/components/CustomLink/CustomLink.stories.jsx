import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomLink from "./index";

export default {
  title: "Components/CustomLink",
  component: CustomLink,
  argTypes: {
    activeColor: { control: "color" },
  },
};

export const Default = (args) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <div>root</div>;
          }}
        />
        <Route
          path="/home"
          rendering={() => {
            return <div>home</div>;
          }}
        />
        <Route
          render={() => {
            return <CustomLink {...args} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};
Default.args = {
  label: "test",
  imgType: "icon_home",
  imgTypeActive: "icon_home_active",
  link: "/home",
  activeColor: "#acc3f6",
  gap: 20,
  width: 20,
  height: 20,
  singleLabel: false,
  fontSize: 15,
};
