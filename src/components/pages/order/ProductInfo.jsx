import * as React from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
import { defaultGetApiSet } from "../../../utils/api";
import { URLPATH } from "../../../assets/data/common";
import { borderStyle } from "../../../utils/makeCss";

const Styled = {
  ProductInfo: styled.div`
    padding: 30px 100px;
    display: flex;
    align-items: center;
    background-color: #fff;
    clip-path: polygon(
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px),
      0 10px
    );

    .product-box {
    }

    .product {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .product-info {
      font-size: 0.88rem;
      color: #939393;
      margin-top: 11px;
    }
    .product-imgs-wrap {
      display: flex;
      margin-top: 20px;

      .company-img-box,
      .pick-img-box {
        display: flex;
      }
    }
    .product-img {
      position: relative;
      width: 208px;
      height: 134px;
      border-radius: 5px;
      overflow: hidden;
      text-align: center;
      line-height: 132px;
      color: #939393;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }

      &:hover .cover {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        line-height: 1;
        transform: translateY(100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        opacity: 0;
        visibility: hidden;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-out;

        & p {
          color: #fff;
          text-align: left;
        }
        & p.info {
          font-size: 0.75rem;
        }
        & p.from {
          font-size: 1rem;
          line-height: 1.19rem;
          margin-top: 4px;
        }
      }
    }

    .product-img + .product-img {
      margin-left: 8px;
    }

    .pick-img-box {
      margin-left: 8px;
    }
  `,
};

export default function ProductInfo({
  productInfo = [],
  goodsImagePath = [],
  driverImagePath = [],
  border = "bottom",
}) {
  const makeDefaultImgbox = ({ count, imgPath = [], kind }) => {
    const defaultCount = Array(count).fill("");
    let textArray;
    switch (kind) {
      case "company":
        textArray = ["Company", "Company"];
        break;
      case "pick":
        textArray = ["Pick-up Point", "Drop-off Point"];
        break;
      default:
        break;
    }

    return defaultCount.map((item, idx) => {
      return (
        <div className="product-img">
          {imgPath[idx] ? <img src={imgPath[idx]} /> : textArray[idx]}
        </div>
      );
    });
  };

  const driverImgText = ["From Pick-Up Point", "From Drop-Off Point"];

  return (
    <Styled.ProductInfo style={borderStyle(border)}>
      {productInfo.map((i) => {
        return (
          <div className="product-box">
            <div className="product">{i.info}</div>
            <div className="product-info">{`${i.width}m x ${i.height}m x ${i.depth}m / ${i.count} Number / ${i.weight}T`}</div>
            <div className="product-imgs-wrap">
              <div className="company-img-box">
                {goodsImagePath.map((item, idx) => {
                  return (
                    <div className="product-img from-company" key={idx}>
                      <img src={item} />
                      <div className="cover">
                        <div className="cover-text-wrap">
                          <p className="info">Cargo Pickture</p>
                          <p className="from">From Company</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pick-img-box">
                {driverImagePath.map((item, idx) => {
                  return (
                    item && (
                      <div className="product-img from-driver" key={idx}>
                        <img src={item} />
                        <div className="cover">
                          <div className="cover-text-wrap">
                            <p className="info">Cargo Picture</p>
                            <p className="from">{driverImgText[idx]}</p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </Styled.ProductInfo>
  );
}
