import React from "react";
import { Pagination, Card, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Pagination.css";

function PageButton({
  pagesArray,
  handlePageClick,
  maxPage,
  goToFirst,
  goToLast,
  currPage,
  goToPrev,
  goToNext,
}) {
  return (
    <Card
      className="m-auto p-3 align-content-center flex-row w-75 align-self-center fixed-top"
      bg="danger"
    >
      <div style={{ display: "flex", flex: "1 1 0px" }}>
        <LinkContainer to="/home">
          <Navbar.Brand className="align-self-start justify-content-start ml-3 link">
            My Pokédex
          </Navbar.Brand>
        </LinkContainer>
      </div>
      <Pagination
        className="align-self-center m-auto justify-content-center"
        style={{ flex: "1 1 0px" }}
      >
        {pagesArray[0] === 1 ? false : <Pagination.First onClick={goToFirst} />}
        {currPage === 1 ? false : <Pagination.Prev onClick={goToPrev} />}
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

        {currPage === maxPage ? false : <Pagination.Next onClick={goToNext} />}
        {pagesArray.includes(maxPage) ? (
          false
        ) : (
          <Pagination.Last onClick={goToLast} />
        )}
      </Pagination>
      <div style={{ flex: "1 1 0px" }} />
    </Card>
  );
}

export default PageButton;
