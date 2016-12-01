import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: null,
      urlInput: null,
      urls: null,
      hasBeenSortedByDate: false,
      hasBeenSortedByClicks: false,
      errorMessage: null,
      filterInput: ''
    }
  }

  getTitleInput(e) {
    e.preventDefault();
    this.setState({ titleInput: e.target.value })
  }

  getUrlInput(e) {
    e.preventDefault();
    this.setState({ urlInput: e.target.value })
  }

  getFilterInput(e) {
    e.preventDefault();
    this.setState({ filterInput: e.target.value })
  }

  getUrls() {
    axios.get('/urls', {})
    .then((response) => {
      this.setState({ urls: response.data.urls })
    })
  }

  postUrls(title, url) {
    const { urls } = this.state;
    if (urls.map((url) => url.longUrl)[0]===url) { return this.setState({ errorMessage: 'That url already exists, sorry.'})}
    else { this.setState({ errorMessage: null })}
    axios.post('/urls',  {title: title, url: url})
    .then((response) => {
      console.log('response received, hooray!')
    })
    .catch(() => {
      console.log('Invalid request')
    })
  }

  componentWillMount() {
    this.getUrls();
  }


  displayUrls() {
    const { urls, filterInput } = this.state;
    const filteredUrls = urls.filter(url => url.title.toLowerCase().indexOf(filterInput.toLowerCase()) !== -1);


    return filteredUrls.map((url) =>{
      const shortenedLink = "http://localhost:3001/urls/" + url.shortUrl
      return (
        <li key={url.id}>
          <h1>{url.title}</h1>
          <a href={shortenedLink}>
            {url.shortUrl}
          </a>
          {url.counter}
          {url.dateAdded}
        </li>
        )
      }
    )
  }

  sortByDate() {
    const { urls } = this.state
    if (this.state.hasBeenSortedByDate) { return this.setState({ urls: urls.reverse() }) }
    else {
      this.setState({ urls: urls.sort((a,b) => a.unix - b.unix), hasBeenSortedByDate: true})
    }
  }

  sortByClick() {
    const { urls}  = this.state
    if (this.state.hasBeenSortedByClicks) { return this.setState({ urls: urls.reverse() }) }
    else {
      this.setState({ urls: urls.sort((a,b) => b.counter - a.counter), hasBeenSortedByClicks: true})
    }
  }

  render() {
    const { urls, urlInput, titleInput, errorMessage } = this.state;
    return (
      <div className="App">
        <form className="url-form" onSubmit={(e) => this.postUrls(titleInput, urlInput)}>
          <input className="title-input" onChange={e => this.getTitleInput(e)}/>
          <input className="url-input" onChange={e => this.getUrlInput(e)}/>
          <button className="url-submit-button">
            submit
          </button>
          <br />
          <p>Search Filter: </p><input className="search-filter" onChange={e => this.getFilterInput(e)}/>
        </form>
        { errorMessage ? <h1>{errorMessage}</h1> : null }
        <ul className="url-list">
        <section className="sort-button-container">
          <button className="sort-by-clicks" onClick={e=> this.sortByClick()}>Sort by clicks</button>
          <button className="sort-by-date"  onClick={e=> this.sortByDate()}>Sort by date</button>
        </section>
        { urls ? this.displayUrls() : null}
        </ul>
      </div>
    );
  }
}

export default App;
