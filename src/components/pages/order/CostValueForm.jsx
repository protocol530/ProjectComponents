import styled from "styled-components";
import { numberWithCommas } from "../../../utils/convertData";

const Styled = {
  CostValueForm: styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 80px 100px 70px;
    background-color: #fff;
    clip-path: polygon(
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% 100%,
      100% 100%,
      0 100%,
      0 100%,
      0 10px
    );

    .cost-value-form {
      min-width: 337px;
      .subtotal-input,
      .cost-tax,
      .cost-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .subtotal-input {
        & > label {
          color: #939393;
        }
        #subtotal {
          font-size: 1rem;
          text-align: right;
          border: none;
          border-bottom: 1px solid #000;
          padding: 5px;

          &:disabled {
            border: none;
            background-color: transparent;
          }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }

      .cost-tax {
        margin-top: 22px;
        & > label {
          color: #939393;
        }

        .cost-tax-value {
          font-size: 1rem;
          text-align: right;
          padding: 5px;
        }
      }

      .cost-total {
        margin-top: 39px;
        color: #5786ed;
        & > label {
          font-weight: bold;
          font-size: 1.3rem;
        }

        .cost-total-value {
          text-align: right;
          min-width: 173px;
          font-size: 1.9rem;
          font-weight: 600;
        }
      }
    }
  `,
};

export default function CostValueForm({
  modifyMode = false,
  getValue,
  costValue = 0,
}) {
  const TaxRate = 10 / 100;
  const TotalCost = Math.floor(costValue * (1 + TaxRate));

  const onChange = (e) => {
    const value = e.target.value;
    if (Number(value) !== 0 && !Number(value)) return;
    getValue((draft) => {
      draft.costInput = value;
    });
  };

  return (
    <Styled.CostValueForm>
      <div className="cost-value-form">
        <div className="subtotal-input">
          <label htmlFor="subtotal">Subtotal:</label>
          <input
            id="subtotal"
            type="number"
            onChange={getValue && onChange}
            value={costValue}
            disabled={!modifyMode}
          />
        </div>
        <div className="cost-tax">
          <label>Tax</label>
          <span className="cost-tax-value">
            {numberWithCommas(Math.floor(costValue * TaxRate))}
          </span>
        </div>
        <div className="cost-total">
          <label>TOTAL:</label>
          <span className="cost-total-value">
            {numberWithCommas(TotalCost)} ₫
          </span>
        </div>
      </div>
    </Styled.CostValueForm>
  );
}
