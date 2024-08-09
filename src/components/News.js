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
    props.setProgress(10);
    //const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&max=100&apikey=${props.apiKey}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();

    props.setProgress(50);
    setArticle(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capatalizeFirstLetter(props.category)} - Newzzer`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    //const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&max=100&apikey=49a83d33f62c7cd75f017685b73cbc9d`;

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
      <InfiniteScroll dataLength={article.length} next={fetchMoreData} hasMore={article.length !== totalResults && article.length <= totalResults} loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem key={element.id} title={element.title ? element.title : ""} source={element.source.name} author={element.author} time={element.publishedAt} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
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
