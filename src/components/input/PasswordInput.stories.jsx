import PasswordInput from "./PasswordInput";

export default {
  title: "Components/PasswordInput",
  components: PasswordInput,
};

export const Default = (args) => <PasswordInput {...args} />;
Default.args = {
  alertMsg: "check your psss",
  onChangeInput: (value) => {
    // console.log("test", value);
  },
  placeholder: "test",
};
