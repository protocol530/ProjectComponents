import styled, { css } from "styled-components";
import { colors } from "../../style/color";
const Styled = {
  SelectBox: styled.div`
    .Inner {
      ${(props) => {
        switch (props.select) {
          default:
            return css`
              background-color: #6d7581;
              border: "none";
              padding-left: 0.9375rem;
              color: ${colors.white};
            `;
          case false:
            return css`
              background-color: ${colors.white};
              border: 2px dotted #6d7581;
              align-items: center;
              color: #939393;
            `;
        }
      }}

      width: ${(props) => props.width};
      height: ${(props) => props.height};
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 3px;
      p {
        font-size: 0.75rem;
      }
      h6 {
        font-size: 1rem;
      }
      :hover {
        cursor: pointer;
      }
    }

    ${(props) => {
      if (
        props.choosedBox[0] === props.index &&
        props.choosedBox[1] === props.type
      ) {
        return css`
          .Inner {
            border: solid;
          }
        `;
      }
    }}
  `,
};

export default function SelectBox(props) {
  const {
    type,
    item,
    index,
    choosedBox,
    setChoosedBox,
    width = "100px",
    height = "80px",
  } = props;
  const onClick = () => {
    setChoosedBox([index, item.type]);
  };

  return (
    <Styled.SelectBox
      select={item.select}
      fontSize="0.75rem"
      onClick={onClick}
      choosedBox={choosedBox}
      index={index}
      type={item.type}
      width={width}
      height={height}
    >
      <div className="Inner">
        {type === "truck" ? (
          item.number ? (
            <>
              <p>Truck</p>
              <h6>{item.number}</h6>
            </>
          ) : (
            <p>Truck</p>
          )
        ) : item.name ? (
          <>
            <p>Driver</p>
            <h6>{item.name}</h6>
          </>
        ) : (
          <p>Driver</p>
        )}

        <p>{item.contact}</p>
      </div>
      <div className="Outer">
        <div />
      </div>
    </Styled.SelectBox>
  );
}
