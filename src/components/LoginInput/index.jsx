import styled from "styled-components";
import { InputBase } from "@material-ui/core";
const Styled = {
  LoginInput: styled(InputBase)`
    width: ${(props) => props.width};
    margin: ${(props) => props.custommargin};
    .MuiInputBase-input {
      background-color: ${(props) => props.backgroundcolor};
      color: ${(props) => props.color};
      border: none;
      width: ${(props) => props.width};
      height: ${(props) => props.height};
      padding: ${(props) => props.padding};
      font-family: "Montserrat-Medium";
      font-size: ${(props) => props.fontSize};
    }
    // 구글 자동완성 css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
    input:-webkit-autofill::first-line {
      font-family: "Montserrat-Medium";
      font-size: ${(props) => props.fontSize};
    }
  `,
};
export default function Input(props) {
  const {
    placeholder,
    backgroundcolor,
    width,
    height,
    margin,
    padding,
    type,
    fontSize,
    className,
  } = props;

  return (
    <Styled.LoginInput
      {...props}
      placeholder={placeholder}
      backgroundcolor={backgroundcolor}
      width={width}
      height={height}
      custommargin={margin}
      padding={padding}
      type={type}
      fontSize={fontSize}
      className={className}
    />
  );
}
