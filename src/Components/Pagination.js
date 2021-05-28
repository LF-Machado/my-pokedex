import React from "react";
import { Pagination, Card } from "react-bootstrap";

function PageButton({
  pagesArray,
  handlePageClick,
  maxPage,
  goToFirst,
  goToLast,
  currPage,
}) {
  return (
    <Card
      className="m-auto p-3 align-content-center w-75 align-self-center fixed-top"
      bg="danger"
    >
      <Pagination className="align-self-center m-auto">
        {pagesArray[0] === 1 ? false : <Pagination.First onClick={goToFirst} />}
        {pagesArray.map(page => {
          if (page > maxPage) return false;
          return (
            <Pagination.Item
              key={page}
              onClick={handlePageClick}
              active={page === currPage}
            >
              {page}
            </Pagination.Item>
          );
        })}

        {pagesArray.includes(maxPage) ? (
          false
        ) : (
          <Pagination.Last onClick={goToLast} />
        )}
      </Pagination>
    </Card>
  );
}

export default PageButton;
