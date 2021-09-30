import styled from "styled-components";

const Styled = {
  BgLayout: styled.div``,
};

export default function BgLayout({ bgColor = "#fff", children }) {
  return (
    <Styled.BgLayout style={{ backgroundColor: bgColor }}>
      {children}
    </Styled.BgLayout>
  );
}
