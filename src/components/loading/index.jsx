import * as React from "react";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import { DEPTH } from "../../assets/data/common";

const LoadingStyle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: ${(props) => props.height && props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${DEPTH.high};
`;

export default function Loading({
  size = 50,
  color = "#ddd",
  loading = false,
  height = "100%",
}) {
  const [delayLoading, setLoading] = React.useState(false);

  return (
    <LoadingStyle height={height}>
      <HashLoader color={color} loading={loading} size={size} />
    </LoadingStyle>
  );
}
