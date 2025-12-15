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
        <div className="container px-lg-5 text-white">
          <div className="row">
            <div className="col-md-8 d-flex  flex-column justify-content-center h-100">
              <h4>
                <span className="fs-2 fw-bolder">{spanText}</span> {title}
              </h4>
              <p className="text-wrap">{description}</p>
            </div>
            <div className="col-md-4 text-center">
              <img className={`img-fluid ${imageSize}`} src={imgUrl} alt="" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
