import styled from "styled-components";
import SideNav from "../SideNav";
import PageLayout from "./PageLayout";

const Styled = {
  BaseLayout: styled.div`
    display: flex;
    flex-direction: row;
    // 구글 자동완성 css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  `,
};

function BaseLayout({ children }) {
  return (
    <Styled.BaseLayout>
      <SideNav />
      <PageLayout>{children}</PageLayout>
    </Styled.BaseLayout>
  );
}

export default BaseLayout;
