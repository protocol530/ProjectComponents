import * as React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DEPTH } from "../../../assets/data/common";

const Styled = {
  ModalStyle: styled.div`
    position: relative;
    // 구글 자동완성 css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${DEPTH.modal};
    }
    .modal-wrap {
      display: flex;
      justify-content: center;
      min-width: 1024px;
    }
  `,
};

export default function PortalModal({ children, visible, setVisible }) {
  let ref = React.useRef();
  const modalElement = document.querySelector("#modal");

  const handleClickOutside = (e) => {
    const target = e.target;
    //  className 이 modal이 아닌 ref 는 전부 return 시켜버림
    //  mui-popover, custom Modal 둘 다 ref 사용하는데, 충돌 나서 로직 추가
    if (e.path[0].classList[0] !== "modal") {
      return;
    }
    if (visible && ref.current && !ref.current.contains(target)) {
      setVisible && setVisible(false);
    }
    if (ref.current === "") {
      setVisible(false);
    }
  };

  const escFunction = (e) => {
    const target = e.target;
    if (e.keyCode === 27) {
      if (visible && ref.current && !ref.current.contains(target)) {
        setVisible && setVisible(false);
      }
      if (ref.current === "") {
        setVisible(false);
      }
    }
  };

  React.useEffect((e) => {
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", escFunction);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", escFunction);
    };
  }, []);

  const modal = (
    <Styled.ModalStyle>
      <div className="modal">
        <div className="modal-wrap" ref={ref}>
          {children}
        </div>
      </div>
    </Styled.ModalStyle>
  );
  return ReactDOM.createPortal(modal, modalElement);
}
