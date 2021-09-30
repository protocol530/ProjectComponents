import styled from "styled-components";

const Styled = {
  DetailPageLayout: styled.div`
    padding-top: 30px;
    background-color: #f7f7f7;
    .wrap {
      width: ${(props) => (props.shortWidth ? "806px" : "1056px")};
      min-height: calc(100vh - 80px);
      margin: 0 auto;
      /* background-color: #fff; */
    }
  `,
};

export default function DetailPageLayout({ children, shortWidth = false }) {
  return (
    <Styled.DetailPageLayout shortWidth={shortWidth}>
      <div className="wrap">{children}</div>
    </Styled.DetailPageLayout>
  );
}
