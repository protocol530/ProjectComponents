import * as React from "react";
import styled from "styled-components";
import IconImg from "../IconImg";
import { useImmer } from "use-immer";

const PaginationStyle = styled.div`
  display: flex;
  align-items: center;
  button {
    border: 0;
    cursor: pointer;
  }
  .next button,
  .prev button {
    background-color: white;
    display: flex;
    align-items: center;

    .text {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .prev span.text {
    margin-left: 4px;
  }
  .next span.text {
    margin-right: 4px;
  }
  .page {
    padding: 0 22px;
  }
`;
const PageButton = styled.button`
  background-color: ${(props) => (props.isNowPage ? "#F7F7F7" : "inherit")};
  width: 32px;
  height: 32px;
`;

function paginate(totalItems, currentPage = 1, pageSize = 10, maxPages = 10) {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
}

const initState = {
  pages: [],
  startPage: 1,
  endPage: null,
  currentPage: null,
};

export default function Pagenation({
  currentPage = 1,
  totalData,
  dataPerPage = 10,
  showPage = 5,
  className,
  cb,
}) {
  const [state, setState] = useImmer(initState);
  const isCanPrev =
    state.startPage !== state.currentPage && state.currentPage > 1;
  const isCanNext =
    state.endPage !== state.currentPage && state.endPage > state.currentPage;

  const prevClick = () => {
    if (!isCanPrev) return;
    const prevPage = state.currentPage - 1;
    cb && cb(prevPage);
  };

  const nextClick = () => {
    if (!isCanNext) return;
    const nextPage = state.currentPage + 1;
    cb && cb(nextPage);
  };

  const pageClick = (item) => {
    cb && cb(item);
  };

  React.useEffect(() => {
    const pagination = paginate(totalData, currentPage, dataPerPage, showPage);
    setState((draft) => {
      draft.pages = pagination.pages;
      draft.startPage = pagination.startPage;
      draft.endPage = pagination.endPage;
      draft.currentPage = pagination.currentPage;
    });
  }, [currentPage, totalData, dataPerPage, showPage]);

  return (
    <PaginationStyle className={className}>
      <div className="prev">
        <button onClick={prevClick}>
          <IconImg imgType="prevArrow" />
          <span className="text">Prev</span>
        </button>
      </div>
      <div className="page">
        {state.pages.map((item, idx) => {
          return (
            <PageButton
              onClick={() => pageClick(item)}
              isNowPage={currentPage === item}
              key={idx}
            >
              {item}
            </PageButton>
          );
        })}
      </div>
      <div className="next">
        <button onClick={nextClick}>
          <span className="text">Next</span>
          <IconImg imgType="nextArrow" />
        </button>
      </div>
    </PaginationStyle>
  );
}
