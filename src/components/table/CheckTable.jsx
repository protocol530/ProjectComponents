import styled from "styled-components";
import { useImmer } from "use-immer";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { convertTableData } from "../../utils/convertData";

const Styled = {
  TableWrap: styled.div`
    overflow: auto;
    margin: 0 auto;
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "auto")};
  `,
  CheckTable: styled.table`
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
      text-align: center;
    }
    th:last-child,
    td:last-child {
      padding-right: 100px;
    }

    tr:last-of-type td {
      border-bottom: none;
    }

    tbody tr:hover {
      cursor: ${(props) => (props.isClick ? "pointer" : "default")};
      background-color: rgba(172, 195, 246, 0.2);
    }
  `,
  TableHead: styled.th`
    width: ${(props) => props.thwidth};
  `,
};

const initState = {
  allCheck: false,
  checkList: [],
};

export default function CheckTable({
  width,
  height = 500,
  columns = [],
  data = [],
  headAlign = "center",
  bodyAlign = "center",
  onClick,
  className,
  getCheckList,
  page, //convert state column data key
}) {
  const [state, setState] = useImmer(initState);
  const allCheck = (e) => {
    const isCheck = e.target.checked;
    if (isCheck) {
      setState((draft) => {
        data.map((item) => {
          if (!draft.checkList.includes(item.id)) draft.checkList.push(item.id);
        });
      });
    } else {
      setState((draft) => {
        draft.checkList = [];
      });
    }
  };

  const onCheck = (id) => {
    const find = state.checkList.indexOf(id);
    if (find > -1) {
      setState((draft) => {
        draft.checkList.splice(find, 1);
      });
    } else {
      setState((draft) => {
        draft.checkList.push(id);
      });
    }
  };

  useDidUpdate(() => {
    getCheckList(state.checkList);
  }, [state.checkList]);

  return (
    <Styled.TableWrap width={width} height={height} className={className}>
      <Styled.CheckTable
        headAlign={headAlign}
        bodyAlign={bodyAlign}
        isClick={onClick ? true : false}
      >
        <thead>
          <tr>
            <Styled.TableHead thwidth="12%" className="checkbox">
              <span>
                <input type="checkbox" onChange={allCheck} />
              </span>
            </Styled.TableHead>
            {columns.map((column, idx) => {
              return (
                <Styled.TableHead thwidth={column.width} key={idx}>
                  {column.label}
                </Styled.TableHead>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr
                key={idx}
                onClick={
                  onClick &&
                  ((e) => {
                    const target = e.target;
                    target.className !== "checkbox" &&
                      target.tagName !== "INPUT" &&
                      onClick(item);
                  })
                }
              >
                <td className="checkbox">
                  <span>
                    <input
                      type="checkbox"
                      onChange={() => onCheck(item.id)}
                      checked={state.checkList.includes(item.id)}
                    />
                  </span>
                </td>
                {columns.map((column, idx) => {
                  return (
                    <td key={idx}>
                      {convertTableData(column.format, item[column.key], page)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Styled.CheckTable>
    </Styled.TableWrap>
  );
}
