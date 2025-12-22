import React from "react";
import ResponsivePagination from "react-responsive-pagination";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <>
      <div className="my-5">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={onPageChange}
          maxWidth={2}
        />
      </div>
    </>
  );
}
