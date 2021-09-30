import * as React from "react";
import styled from "styled-components";
import { DEPTH } from "../../assets/data/common";
import selectArrow from "../../assets/img/selectArrow.svg";
import selectAllowDisabe from "../../assets/img/selectAllowDisabe.svg";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import _ from "lodash";
import { useEffect } from "react";

const Styled = {
  Select: styled.div`
    z-index: ${DEPTH.middle};
    width: ${(props) => props.width};
    .select {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 14px;
      background-color: #fff;
      color: #000;
      font-size: 14px;
      border: 1px solid #ededed;
      border-radius: 5px;
      padding: 11px 31px 11px 20px;
      cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
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
        font-weight: ${(props) => (props.status === "status" ? "bold" : null)};
        padding: 0 20px;
        cursor: pointer;
        height: fit-content;
        min-height: 38px;
        display: flex;
        align-items: center;

        &:hover {
          color: #004cf2;
          background-color: #eef3fd;
        }
      }
    }
  `,
};

export default function Select({
  id,
  parentValue,
  width = "auto",
  options = [],
  label,
  onChange,
  reset = false,
  optionConvert,
  disabled = false,
  className,
  update,
  detail,
  status = "",
}) {
  const [showOption, setOption] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState(label);
  const ref = React.useRef();
  const visibleRef = React.useRef(false);

  const onClick = () => {
    visibleRef.current = !visibleRef.current;
    setOption(visibleRef.current);
  };

  // 숫자 상태 텍스트로 변환
  const converOptionTextFromValue = (value) => {
    const textValueIndex = _.findIndex(options, (i) => i.key == value);
    return options[textValueIndex].value;
  };

  const onClickOption = (e) => {
    let value = e.target.dataset.value;
    if (!value) {
      value = e.target.parentNode.dataset.value;
    }

    const text = converOptionTextFromValue(value);
    setSelectValue(text);
    onChange && onChange(value);
  };

  const handleClickOutside = (e) => {
    const target = e.target;
    if (visibleRef.current && !ref.current?.contains(target)) {
      visibleRef.current = false;
      setOption(visibleRef.current);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useDidUpdate(() => {
    if (reset) {
      setSelectValue(label);
    }
  }, [reset]);
  useEffect(() => {
    if (update !== undefined) {
      if (options !== []) {
        if (!label.includes("Select") && !label.includes("Garage")) {
          const text = label && converOptionTextFromValue(options[0].key);
          setSelectValue(text);
        }
      }
    }
  }, [update]);

  return (
    <Styled.Select
      ref={ref}
      width={width}
      className={className}
      status={status}
      disabled={disabled}
    >
      <div
        className={`select ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && onClick()}
      >
        {parentValue ? converOptionTextFromValue(parentValue) : selectValue}
        <>
          {!!options.length && (
            <div
              className="options"
              style={{ display: showOption ? "flex" : "none" }}
            >
              {options.map((item, idx) => {
                return (
                  <span
                    className="option"
                    key={idx}
                    data-value={item.key}
                    onClick={onClickOption}
                  >
                    {optionConvert ? optionConvert(item.value) : item.value}
                  </span>
                );
              })}
            </div>
          )}
        </>
      </div>
    </Styled.Select>
  );
}
