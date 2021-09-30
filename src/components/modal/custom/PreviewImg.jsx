import * as React from "react";
import styled from "styled-components";

const Styled = {
  PreviewImg: styled.div`
    width: 50%;
    /* height: ; */
    & > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
};

export default function PreviewImg({ imgPath }) {
  return (
    <Styled.PreviewImg>
      <img src={imgPath} alt="preview img" />
    </Styled.PreviewImg>
  );
}
