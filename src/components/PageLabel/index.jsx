import styled from "styled-components";

const Styled = {
  PageLabel: styled.h2`
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
    img {
      margin-right: 20px;
      vertical-align: text-top;
    }
  `,
};

export default function PageLabel({ imgType = "", labelText = "" }) {
  return (
    <Styled.PageLabel>
      {/* <IconImg width={30} height={30} imgType={imgType} /> */}
      <span>{labelText}</span>
    </Styled.PageLabel>
  );
}
