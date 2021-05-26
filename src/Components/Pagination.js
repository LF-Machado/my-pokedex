import React from "react";

function PageButton({
  pagesArray,
  handlePageClick,
  maxPage,
  goToFirst,
  goToLast,
}) {
  return (
    <div>
      {pagesArray[0] === 1 ? (
        false
      ) : (
        <button onClick={goToFirst}>{"<<<"}</button>
      )}
      {pagesArray.map(page => {
        if (page > maxPage) return false;
        return (
          <button key={page} onClick={handlePageClick}>
            {page}
          </button>
        );
      })}

      {pagesArray.includes(maxPage) ? (
        false
      ) : (
        <button onClick={goToLast}>{">>>"}</button>
      )}
    </div>
  );
}

export default PageButton;
