import "../../assets/pagination.css";
import { AnyObject } from "yup";
import SkipBackward from "../../assets/images/skipBackwardLeft.svg";
import SkipForward from "../../assets/images/skipForwardRight.svg";
import SkipLeft from "../../assets/images/skipLeft.svg";
import SkipRight from "../../assets/images/skipRight.svg";

export const CustomPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  currentPage,
}: AnyObject) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChangePage(page);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = [];

    for (let i = currentPage; i < currentPage + 5 && i <= totalPages; i++) {
      visiblePages.push(i);
    }

    return visiblePages.map((page) => (
      <button
        key={page}
        className={`pagination-page-button ${
          page === currentPage ? "active" : ""
        }`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="pagination-container">
      <div className="flex gap-2">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <img src={SkipBackward} alt="Skip Backward" width={13} />
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={SkipLeft} alt="Skip Backward" width={13} />
        </button>

        {renderPageNumbers()}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={SkipRight} alt="Skip Backward" width={13} />
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <img src={SkipForward} alt="Skip Backward" width={13} />
        </button>
      </div>
      <div className="pagination-info">
        {currentPage} of {totalPages} Pages ({rowCount} Items)
      </div>
    </div>
  );
};
