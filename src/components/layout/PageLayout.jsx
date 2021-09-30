import styled from "styled-components";
import TopNav from "../TopNav";
import { useSelector } from "react-redux";
const Styled = {
  PageLayout: styled.div`
    position: relative;
    /* background-color: #f7f7f7; */
    padding-top: 50px;
    width: ${(props) => `calc(100% - ${props.sideNavWidth})`};
    overflow: hidden;
  `,
};

function PageLayout({ children }) {
  const navToggle = useSelector((state) => {
    return state.commonSlice.navToggle;
  });

  const sideNavWidth = navToggle ? "70px" : "300px";
  return (
    <Styled.PageLayout sideNavWidth={sideNavWidth}>
      <TopNav />
      {children}
    </Styled.PageLayout>
  );
}

export default PageLayout;
