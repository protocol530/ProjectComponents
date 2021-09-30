import * as React from "react";
import styled from "styled-components";
import searchImg from "../../assets/img/search.svg";

const Styled = {
  SearchStyle: styled.div`
    position: relative;
    width: ${(props) => (props.width ? props.width : "auto")};
    input {
      display: block;
      width: 100%;
      height: 100%;
      padding: 11px 49px;
      font-size: 0.9rem;
      border: none;
      border-radius: 5px;
      background-color: #e3e3e3;
    }

    &:before {
      content: "";
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 19px;
      height: 19px;
      background: url(${searchImg}) no-repeat center;
    }
  `,
};

export default function Search({ setValue, ...props }) {
  const [state, setState] = React.useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setState(value);
    setValue(value);
  };

  return (
    <Styled.SearchStyle width={props.width}>
      <input type="text" value={state} onChange={onChange} {...props} />
    </Styled.SearchStyle>
  );
}
