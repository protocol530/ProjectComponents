import styled from "styled-components";
import { useImmer } from "use-immer";

const Styled = {
  LabelInput: styled.input`
    display: block;
    width: 100%;
    padding: 0 16px;
  `,
};

export default function LabelInput({
  setValue,
  width = "100%",
  height = "50px",
  bgColor = "#F7F7F7",
  ...props
}) {
  const [state, setState] = useImmer("");

  const onChange = (e) => {
    const value = e.target.value;
    setState((draft) => {
      draft = value;
    });
    setValue(value);
  };

  return (
    <Styled.LabelInput
      type="text"
      onChange={onChange}
      {...props}
      value={state}
    />
  );
}
