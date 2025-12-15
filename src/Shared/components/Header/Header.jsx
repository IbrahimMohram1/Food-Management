import React from "react";
export default function Header({
  spanText,
  title,
  description,
  imgUrl,
  imageSize,
}) {
  return (
    <>
      <header className="mt-4">
        <div className="container-fluid text-white  ">
          <div className="row px-5">
            <div className="col-md-8">
              <div className="d-flex justify-content-center h-100 flex-column">
                <h4>
                  <span className="fs-2 fw-bolder">{spanText}</span> {title}
                </h4>
                <p>{description}</p>
              </div>
            </div>
            <div className="col-md-4 text-center ">
              <img className={imageSize} src={imgUrl} alt="" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
