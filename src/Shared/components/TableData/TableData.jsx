import React from "react";

export default function TableData() {
  return (
    <>
      <div className="table-container p-3">
        <div className="">
          {categories.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CategoryName</th>
                  <th>Category Creation Date</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
