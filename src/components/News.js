import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      loading: false,
      page: 1,
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - Newzzer`;
  }

  async updateNews() {
    const url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&max=100&apikey=49a83d33f62c7cd75f017685b73cbc9d`;
    //const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5ff1698c0b4472d9718777851313c99&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({ loading: false });

    this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-3">
          {/* heading */}
          <h2 className="text-center">Newzzer - Top {this.capatalizeFirstLetter(this.props.category)} Headline </h2>

          {this.state.loading && <Spinner />}
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} source={element.source.name} author={element.author} time={element.publishedAt} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-2">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
