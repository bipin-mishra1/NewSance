import React, { Component } from 'react';
export class NewsItem extends Component {

  render() {
    let  {title , description, imageSrc, url ,author,date} = this.props;
    return <div className='my-3 mx-3'>
      <div className="card">
  {imageSrc!==null && <img src={imageSrc} className="card-img-top" alt="not available..."/>}
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    {author!==null && date!==null && (<p className="card-text">By {author} on {new Date(date).toDateString()} </p>)}
    <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary shadow-none" >Know more</a>
  </div>
</div>
    </div>;
  }
}

export default NewsItem;
