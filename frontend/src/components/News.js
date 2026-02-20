import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capatalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);

      const url = `https://newzzer-backend.onrender.com/news?country=${props.country}&category=${props.category}`;

      setLoading(true);

      let data = await fetch(url);
      props.setProgress(30);

      let parsedData = await data.json();

      props.setProgress(50);
      setArticle(parsedData.articles || []);
      setLoading(false);
      setTotalResults(parsedData.totalResults || 0);

      props.setProgress(100);
    } catch (error) {
      console.error(error);
      setArticle([]); // ✅ NEVER undefined
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capatalizeFirstLetter(props.category)} - Newzzer`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newzzer-backend.onrender.com/news?country=${props.country}&category=${props.category}`;

    let data = await fetch(url);

    let parsedData = await data.json();

    setArticle(article.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      {/* heading */}
      <h2 className="text-center" style={{ marginTop: "80px" }}>
        Newzzer - Top {capatalizeFirstLetter(props.category)} Headline{" "}
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={
          article.length !== totalResults && article.length <= totalResults
        }
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    key={element.id}
                    title={element.title ? element.title : ""}
                    source={element.source.name}
                    author={element.author}
                    time={element.publishedAt}
                    description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};

News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
