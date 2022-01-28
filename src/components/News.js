import React, { Component } from 'react';
import NewsItem from './NewsItem';
import  Spinner  from './Spinner';
// import NewsExample from '../NewsExample.json';
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    constructor(props){
        super(props);
        this.state ={
          articles: [],
          page: 1,
          totalArticles:0,
          loading: false,
          seenItall:false
        };
        document.title = `${this.props.category[0].toUpperCase() + this.props.category.slice(1)} - at NewSance`;
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=6`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
            loading: false,
            seenItall:false
          });

    }

    handleNextClick = async ()=>{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=6`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page+1,
                articles:this.state.articles.concat(parsedData.articles),
                totalArticles:parsedData.totalResults,
                seenItall:true
            }) 
    }

    // handlePrevClick = async ()=>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page-1}&pageSize=6`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({loading:false});
    //     this.setState({
    //         page: this.state.page-1,
    //         articles:parsedData.articles,
    //         loading: false
    //     })
    //     window.scrollTo(0, 0)
    // }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-md-center">
          {this.props.category === "general"
            ? "Today's top headlines at NewSance"
            : `Today's top headlines from ${this.props.category} at NewSance`}
        </h1>
        {this.state.loading&&<Spinner/>}
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.handleNextClick}
          hasMore={this.state.articles.length!==this.state.totalArticles}
          loader= {<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
             {this.state.seenItall && <b>Yay! You have seen it all</b>}
            </p>
          }
        >
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  author={element.author}
                  date={element.publishedAt}
                  imageSrc={element.urlToImage}
                  title={element.title}
                  description={element.description}
                  url={element.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {/* <div className="container">
          <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              disabled={this.state.page <= 1 ? true : false}
              className="btn btn-primary me-md-2"
              onClick={this.handlePrevClick}
              type="button"
            >
              &larr; Prev
            </button>
            <button
              disabled={
                this.state.page < Math.ceil(this.state.totalArticles / 6)
                  ? false
                  : true
              }
              className="btn btn-primary"
              id="next-btn"
              onClick={this.handleNextClick}
              type="button"
            >
              Next &rarr;
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default News;
