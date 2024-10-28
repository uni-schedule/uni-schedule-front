import React from "react";
import styles from "./Paginator.module.css";

interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: number[] = [];
    const visiblePages = 7;
    const halfVisible = Math.floor(visiblePages / 2);

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - halfVisible + 1);
      let end = Math.min(totalPages - 1, currentPage + halfVisible - 1);

      if (currentPage <= halfVisible) {
        start = 2;
        end = visiblePages - 1;
      } else if (currentPage > totalPages - halfVisible) {
        start = totalPages - visiblePages + 2;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className={styles.paginator}>
      {getPages().map((page, index) => (
        <button
          key={index}
          className={`${styles.pageItem} ${page === currentPage ? styles.active : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default Paginator;
