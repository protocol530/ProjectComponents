import styled from "styled-components";
import StatusBox from "../StatusBox";

const Styled = {
  StatusBoxList: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
};

export default function StatusBoxList({ data = [], width, height }) {
  return (
    <Styled.StatusBoxList>
      {data.map((item) => {
        return <StatusBox {...item} width={width} height={height} />;
      })}
    </Styled.StatusBoxList>
  );
}
