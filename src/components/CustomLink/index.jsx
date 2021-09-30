import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import IconImg from "../IconImg";

const Styled = {
  CustomLink: styled.div`
    position: relative;
    .link-wrap {
      display: flex;
      height: 60px;
      align-items: center;
      font-weight: bold;
      color: ${(props) => (props.active ? props.activeColor : "inherit")};

      .icon {
        display: flex;
        align-items: center;
        margin-left: 5px;
        margin-right: ${(props) => props.gap && props.gap}px;
      }
      &:before {
        content: "";
        visibility: ${(props) => (props.active ? "visible" : "hidden")};
        display: block;
        position: absolute;
        left: -25px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 100%;
        background-color: #acc3f6;
      }

      .label {
        font-size: ${(props) => props.fontSize};
      }
    }
  `,
};

export default function CustomLink({
  label,
  imgType,
  imgTypeActive,
  link,
  exact,
  activeColor,
  gap,
  width = "auto",
  height = "auto",
  singleLabel = false,
  fontSize = "inherit",
  onClick,
}) {
  const [active, setActive] = useState(false);
  return (
    <Styled.CustomLink
      gap={gap}
      activeColor={activeColor}
      active={activeColor && active}
      fontSize={fontSize}
    >
      <NavLink
        onClick={onClick}
        className="link-wrap"
        to={link}
        exact={exact}
        isActive={(match, location) => {
          if (match) {
            activeColor && setActive(true);
          } else {
            setActive(false);
          }
        }}
      >
        <span className="icon">
          {/* <Icon imgType={imgType} width={width} height={height} /> */}
          <IconImg
            imgType={imgType}
            imgTypeActive={imgTypeActive}
            width={width}
            height={height}
            isActive={activeColor && active}
          />
        </span>
        {singleLabel ? null : <span className="label">{label}</span>}
      </NavLink>
    </Styled.CustomLink>
  );
}
