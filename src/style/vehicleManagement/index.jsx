import styled from "styled-components";

export const InputWrapper = styled.div`
  .size-input-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 6px;
  }

  .number-input {
    width: 208px;
  }

  .chassisNumber-input {
    width: 290px;
  }
`;
export const InputContent = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: #f7f7f7;
  ::placeholder {
    color: ${(props) => (props.isExist ? "black" : "#b5b5b5")};
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  border: none;
  border-radius: 5px;
`;
