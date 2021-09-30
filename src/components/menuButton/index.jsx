import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { Popover } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
const Styled = {
  Wrapper: styled.div`
    :hover {
      cursor: pointer;
      background-color: #dedede;
    }
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    color: #939393;
  `,
  Label: styled.div`
    color: #b5b5b5;
    ${(props) => {
      switch (props.status) {
        case true:
          return css``;
        default:
          return css`
            :hover {
              background-color: #eef3fd;
              cursor: pointer;
              color: #5786ed;
            }
          `;
      }
    }}

    font-family: "Montserrat-Regular";
    padding: 10px 20px;
    display: flex;
    align-items: center;
  `,
  CheckIcon: styled(CheckIcon)`
    &.MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      visibility: ${(props) => (props.status ? "visible" : "hidden")};
    }
  `,
};
export default function MenuButton(props) {
  const { Icon, menuList, onDelete, onModifyModal, onClickStatus } = props;
  const [popover, setPopover] = useState(null);
  const divRef = useRef();

  const history = useHistory();
  const menuOpen = () => {
    setPopover(divRef.current);
  };

  const menuClose = () => {
    setPopover(null);
  };

  const moveModify = (path) => {
    setPopover(null);
    history.push(path);
  };

  const open = Boolean(popover);
  return (
    <>
      <Styled.Wrapper variant="contained" onClick={menuOpen} ref={divRef}>
        <Icon />
      </Styled.Wrapper>
      <Popover
        open={open}
        anchorEl={popover}
        onClose={menuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuList.map((item, index) => {
          const { key, label, format, status, path } = item;
          switch (key) {
            case "delete":
              return (
                <Styled.Label
                  key={index}
                  onClick={(e) => {
                    onDelete(e);
                    setPopover(null);
                  }}
                >
                  {label}
                </Styled.Label>
              );
            case "modify":
              return (
                <Styled.Label key={index} onClick={() => moveModify(path)}>
                  {label}
                </Styled.Label>
              );
            case "modifyModal":
              return (
                <Styled.Label
                  key={index}
                  onClick={() => {
                    onModifyModal();
                    setPopover(null);
                  }}
                >
                  {label}
                </Styled.Label>
              );

            default:
              switch (format) {
                case "check":
                  return (
                    <Styled.Label
                      key={index}
                      onClick={() => {
                        onClickStatus(label);
                        setPopover(null);
                      }}
                    >
                      <Styled.CheckIcon status={status} />
                      {label}
                    </Styled.Label>
                  );
                case "status":
                  return (
                    <Styled.Label key={index} status={true}>
                      {label}
                    </Styled.Label>
                  );
                default:
                  return <Styled.Label key={index}>{label}</Styled.Label>;
              }
          }
        })}
      </Popover>
    </>
  );
}
