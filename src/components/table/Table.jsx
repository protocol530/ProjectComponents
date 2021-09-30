import * as React from "react";
import styled from "styled-components";
import { convertTableData } from "../../utils/convertData";

const Styled = {
  TableWrap: styled.div`
    overflow: auto;
    margin: 0 auto;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  `,
  Table: styled.table`
    width: 100%;
    border: 1px solid #e3e3e3;
    border-left: none;
    border-right: none;
    border-spacing: 0;
    th {
      position: sticky;
      top: 0;
      border-bottom: 1px solid #e3e3e3;
      background-color: #f7f7f7;
      padding: 12px 30px;
      color: #a3a3a3;
      text-align: ${(props) => props.headAlign && props.headAlign};
    }

    td {
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
      height: 63px;
      padding: 10px 30px;
      vertical-align: middle;
      text-align: ${(props) => props.bodyAlign && props.bodyAlign};
    }

    th:first-child,
    td:first-child {
      padding-left: 100px;
    }
    th:last-child,
    td:last-child {
      padding-right: 100px;
    }

    tr:last-of-type td {
      border-bottom: none;
    }
  `,
  TableHead: styled.th`
    width: ${(props) => props.thwidth};
    min-width: ${(props) => props.thminwidth};
  `,
  TableRow: styled.tr`
    :hover {
      cursor: ${(props) => (props.isClick ? "pointer" : "default")};
      background-color: ${(props) =>
        props.isClick ? "rgba(172, 195, 246, 0.2)" : null};
    }
  `,
};

export default React.memo(function Table({
  width = "100%",
  height = "auto",
  columns = [],
  data = [],
  headAlign = "center",
  bodyAlign = "center",
  onClick,
  className,
  page,
  menuList,
  onDelete,
  onModifyModal,
}) {
  return (
    <Styled.TableWrap width={width} height={height} className={className}>
      <Styled.Table headAlign={headAlign} bodyAlign={bodyAlign}>
        <thead>
          <tr>
            {columns.map((column, idx) => {
              return (
                <Styled.TableHead
                  thwidth={column.width}
                  thminwidth={column.minwidth}
                  key={idx}
                >
                  {column.label}
                </Styled.TableHead>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <Styled.TableRow
                key={idx}
                isClick={onClick && item.select !== "deny" ? true : false}
                onClick={onClick && (() => onClick(item, idx))}
              >
                {columns.map((column, idx) => {
                  return (
                    <td key={idx}>
                      {convertTableData(
                        column.format,
                        item[column.key],
                        page,
                        menuList,
                        (e) => onDelete(e, item),
                        (e) => onModifyModal(e, item)
                      )}
                    </td>
                  );
                })}
              </Styled.TableRow>
            );
          })}
        </tbody>
      </Styled.Table>
    </Styled.TableWrap>
  );
});
