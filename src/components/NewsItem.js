import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    // declaring a default image
    const placeholderImage = "https://static.semrush.com/blog/uploads/media/00/ec/00ecd2aa2fb3e40ff9bc7315222672f6/what-does-error-404-not-found-mean.svg";

    // <img> takes a onError parameter so we have made a error handling fuction
    const onImageError = (e) => {
      e.target.src = placeholderImage;
    };

    // we have define the props
    let { title, description, imgUrl, newsUrl, time, author, source } = this.props;
    return (
      <>
        <div className="card">
          <span style={{ zIndex: "1", left: "85%" }} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img onError={onImageError} src={!imgUrl ? placeholderImage : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on {new Date(time).toGMTString()}
              </small>
            </p>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
