import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CustomLink from "./CustomLink";
import { DEPTH, PATH } from "../assets/data/common";
import alert from "../assets/img/alert.svg";
import selectArrow from "../assets/img/selectArrow.svg";
import selectAllowDisabe from "../assets/img/selectAllowDisabe.svg";
import { convertLanguage, convertImgFromText } from "../utils/convertData";

const Styled = {
  TopNavStyle: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding: 0 100px;
    background-color: #fff;

    .btn-wrap {
      display: flex;
      align-items: center;
      margin-right: 30px;

      .btn {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        text-indent: -9999px;
      }

      .alert {
        background: url(${alert}) no-repeat center;
      }
    }

    .language-btn-wrap {
      margin-left: 50px;
    }
  `,
  LanguageSelect: styled.div`
    z-index: ${DEPTH.middle};

    .select {
      position: relative;
      font-size: 14px;
      background-color: #fff;
      color: #000;
      font-size: 14px;
      padding: 11px 31px 11px 20px;
      cursor: pointer;
      width: ${(props) => props.width};

      &:after {
        content: "";
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 17px;
        background: url(${selectArrow}) no-repeat center;
      }

      &.disabled {
        color: #e3e3e3;
        &:after {
          background: url(${selectAllowDisabe}) no-repeat center;
        }
      }

      .default-option {
        display: flex;
        align-items: center;

        .flag {
          display: inline-block;
          width: 30px;
          height: 16px;
          margin-right: 14px;
        }
      }
    }

    .options {
      position: absolute;
      display: flex;
      width: 100%;
      flex-direction: column;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, calc(100% + 5px));
      background-color: #fff;
      border: 1px solid #d5d5d5;
      border-radius: 5px;
      margin-top: 5px;
      max-height: 192px;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      z-index: ${DEPTH.middle + 1};

      &::-webkit-scrollbar {
        display: none;
      }
      .option {
        display: block;
        width: 100%;
        font-weight: bold;
        padding: 0 20px;
        cursor: pointer;
        height: 38px;
        line-height: 38px;

        &:hover {
          color: #ff9b45;
          background-color: #eef3fd;
        }
      }
    }
  `,
};

const initState = {
  userName: "Hi, Devijohns",
  language: {
    select: "en",
    options: ["en", "kr"],
  },
  showOption: false,
};

export default function TopNav() {
  const [state, setState] = useImmer(initState);
  const ref = React.useRef();
  const visibleRef = React.useRef(false);

  const checkDefaultLang = (lang) => convertLanguage(lang);

  const onClickOption = (e) => {
    let value = e.target.dataset.value;
    if (!value) {
      value = e.target.parentNode.dataset.value;
    }
    setState((draft) => {
      draft.language.select = value;
    });
  };

  const onClick = () => {
    visibleRef.current = !visibleRef.current;
    setState((draft) => {
      draft.showOption = visibleRef.current;
    });
  };

  const handleClickOutside = (e) => {
    const target = e.target;
    if (visibleRef.current && !ref.current.contains(target)) {
      visibleRef.current = false;
      setState((draft) => {
        draft.showOption = visibleRef.current;
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Styled.TopNavStyle>
      <div className="btn-wrap">
        <button className="alert btn">alert</button>
      </div>
      <CustomLink
        imgType="profileImg"
        label={state.userName}
        link={PATH.setting}
        exact
        gap={10}
        width={30}
        height={30}
        singleLabel={false}
        fontSize="14px"
      />
      <div className="language-btn-wrap">
        <Styled.LanguageSelect ref={ref}>
          <div className="select" onClick={onClick}>
            <div className="default-option">
              <img
                className="flag"
                src={`${convertImgFromText(state.language.select)}`}
                alt="flag"
              />
              {checkDefaultLang(state.language.select)}
            </div>
            <>
              {!!state.language.options.length && (
                <div
                  className="options"
                  style={{ display: state.showOption ? "flex" : "none" }}
                >
                  {state.language.options.map((item, idx) => {
                    return (
                      <span
                        className="option"
                        key={idx}
                        data-value={item}
                        onClick={onClickOption}
                      >
                        {convertLanguage(item)}
                      </span>
                    );
                  })}
                </div>
              )}
            </>
          </div>
        </Styled.LanguageSelect>
      </div>
    </Styled.TopNavStyle>
  );
}
