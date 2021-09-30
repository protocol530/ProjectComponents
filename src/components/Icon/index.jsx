import styled from "styled-components";
import icons from "../../assets/img/icons";

const Svg = styled.svg`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;

const Path = styled.path``;

export default function Icon({
  imgType,
  block = false,
  width,
  height,
  ...props
}) {
  return (
    <Svg
      viewBox="0 0 1024 1024"
      width={width}
      height={height}
      block={block}
      {...props}
    >
      <Path d={icons[imgType]} fill="current" />
    </Svg>
  );
}
