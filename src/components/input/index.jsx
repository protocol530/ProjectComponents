import styled from "styled-components";
const Styled = {
  Input: styled.input`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    opacity: ${(props) => props.opacity};
    background-color: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.color};
    border: none;
    border-radius: 5px;
  `,
};
export default function Input(props) {
  const { width, height, opacity, color } = props;
  return (
    <Styled.Input
      width={width}
      height={height}
      opacity={opacity}
      color={color}
    />
  );
}
