import * as React from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import moment from "moment";
import { defaultGetApiSet } from "../../../utils/api";
import { URLPATH } from "../../../assets/data/common";
import { changeUTCtime } from "../../../utils/convertData";

const Styled = {
  Wrap: styled.div`
    .point-box-wrap {
      display: flex;
      justify-content: center;
      padding: 0 100px 36px;
      border-bottom: 1px dotted #e3e3e3;
    }

    .transportation-box-wrap {
      display: flex;
      align-items: center;
      padding: 40px 100px;
      border-bottom: 1px dotted #e3e3e3;

      .transportation-img-box {
        flex-basis: 63px;
        height: 66px;
        margin-right: 40px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .transportation-detail-box {
        .transportation-detail-name {
          font-size: 1.3rem;
          line-height: 24px;
        }
        .transportation-detail-phone {
          font-size: 0.9rem;
          color: #939393;
          line-height: 18px;
          margin-top: 12px;
        }
        .transportation-detail-address {
          font-size: 0.9rem;
          color: #939393;
          line-height: 18px;
          margin-top: 6px;
        }
      }
    }

    .consignment-box-wrap {
      padding: 30px 100px;
      border-bottom: 1px dotted #e3e3e3;

      .consignment-detail-name {
        font-size: 1.3rem;
        line-height: 24px;
      }
      .consignment-detail-size {
        font-size: 0.9rem;
        color: #939393;
        line-height: 18px;
        margin-top: 8px;
      }
      .consignment-img-box {
        margin-top: 20px;

        .consignment-img-box-wrap {
          display: inline-block;
          border: 1px dotted #939393;
          width: 232px;
          height: 148px;

          & > img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }

        .consignment-img-box-wrap + .consignment-img-box-wrap {
          margin-left: 5px;
        }
      }
    }

    .condition-box-wrap {
      display: flex;
      padding: 30px 100px;
      border-bottom: 1px dotted #e3e3e3;

      & > div + div {
        margin-left: 10px;
      }
    }
  `,
  PointBox: styled.div`
    width: 50%;
    padding: 0 10px;
    .label {
      font-size: 0.9rem;
      color: #939393;
      margin-bottom: 10px;
    }
    .box {
      border: none;
      border-radius: 5px;
      background-color: #f7f7f7;
      padding: 18px 20px 36px;
      height: 114px;

      .point {
        font-size: 1.9rem;
        font-weight: bold;
        line-height: 37px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pointDetail {
        font-size: 0.9rem;
        color: #939393;
        line-height: 18px;
        margin-top: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .time {
      margin-top: 6px;
      text-align: right;
      font-size: 0.9rem;
      color: rgba(181, 181, 181, 0.5);
      height: 18px;
    }
  `,
  DetailCondition: styled.div`
    font-size: 0.9rem;
    line-height: 18px;

    .detail-condition-value {
      margin-top: 6px;
      min-width: 165px;
      height: 42px;
      line-height: 42px;
      padding: 0 15px;
      background-color: #f7f7f7;
    }
  `,
};

const DetailCondition = ({ conditionLabel, conditionValue }) => {
  return (
    <Styled.DetailCondition>
      <div className="detail-condition-label">{conditionLabel}</div>
      <div className="detail-condition-value">{conditionValue}</div>
    </Styled.DetailCondition>
  );
};

const PointBoxCompo = ({ label, point, pointDetail, time }) => {
  return (
    <Styled.PointBox>
      <div className="label">{label}</div>
      <div className="box">
        <div className="point">{point}</div>
        <div className="pointDetail">{pointDetail}</div>
      </div>
      <div className="time">
        {time ? changeUTCtime(time, 0).format("DD-MM,YYYY hh:mm A") : ""}
      </div>
    </Styled.PointBox>
  );
};

const initState = {
  companyImg:
    "https://abudhabitiming.com/wp-content/uploads/2020/01/test-img.jpg",
  productsImg: [],
};

export default function QuotePageBody({ pageData = {} }) {
  const [s3Img, setS3Img] = useImmer(initState);

  React.useEffect(() => {
    const getData = async () => {
      const imgSrc = await defaultGetApiSet(
        "",
        `${URLPATH.s3Img}/${pageData.files.s3_folder}/${pageData.files.file_id}`
      );
      setS3Img((draft) => {
        draft.productsImg.push(`${imgSrc.config.baseURL}${imgSrc.config.url}`);
      });
    };

    if (pageData.files) {
      getData();
    }
  }, [pageData]);

  return (
    <Styled.Wrap>
      <div className="point-box-wrap">
        <PointBoxCompo
          label="Pick-Up Point"
          point={pageData.pu_addr}
          pointDetail={pageData.pu_addr_detail}
          time={pageData.pu_datetime}
        />
        <PointBoxCompo
          label="Drop-off Point"
          point={pageData.do_addr}
          pointDetail={pageData.do_addr_detail}
        />
      </div>
      <div className="transportation-box-wrap">
        <div className="transportation-img-box">
          <img src={s3Img.companyImg} />
        </div>
        <div className="transportation-detail-box">
          <div className="transportation-detail-name">
            {pageData.transportation && pageData.transportation.name}
          </div>
          <div className="transportation-detail-phone">
            {pageData.transportation && pageData.transportation.phone}
          </div>
          <div className="transportation-detail-address">
            {pageData.transportation && pageData.transportation.address}
          </div>
        </div>
      </div>
      <div className="consignment-box-wrap">
        <div className="consignment-detail-name">
          {pageData.consignment && pageData.consignment.name}
        </div>
        <div className="consignment-detail-size">
          {pageData.consignment && pageData.consignment.detail}
        </div>
        <div className="consignment-img-box">
          {s3Img.productsImg.length ? (
            s3Img.productsImg.map((item, idx) => {
              return (
                <div className="consignment-img-box-wrap">
                  <img src={item} key={idx} />
                </div>
              );
            })
          ) : (
            <div className="consignment-img-box-wrap"></div>
          )}
        </div>
      </div>
      <div className="condition-box-wrap">
        <DetailCondition
          conditionLabel="Truck Type"
          conditionValue={pageData && pageData.truck_type_en}
        />
        <DetailCondition
          conditionLabel="Option"
          conditionValue={pageData && pageData.truck_option_en}
        />
        <DetailCondition
          conditionLabel="Number"
          conditionValue={pageData && pageData.truck_count}
        />
      </div>
    </Styled.Wrap>
  );
}
