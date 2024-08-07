import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capatalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - Newzzer`;
  }

  async updateNews() {
    this.props.setProgress(10);
    //  const url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&max=100&apikey=49a83d33f62c7cd75f017685b73cbc9d`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(50);

    this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    // const url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&max=100&apikey=49a83d33f62c7cd75f017685b73cbc9d`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5ff1698c0b4472d9718777851313c99&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ article: this.state.article.concat(parsedData.articles), totalResults: parsedData.totalResults });
  };

  render() {
    return (
      <>
        {/* heading */}
        <h2 className="text-center my-3">Newzzer - Top {this.capatalizeFirstLetter(this.props.category)} Headline </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll dataLength={this.state.article.length} next={this.fetchMoreData} hasMore={this.state.article.length !== this.state.totalResults && this.state.article.length <= this.state.totalResults} loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {this.state.article.map((element) => {
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
  }
}

export default News;
