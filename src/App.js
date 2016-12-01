import React, { Component } from 'react';
import axios from 'axios';
import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: null,
      urlInput: null,
      urls: null,
      hasBeenSortedByDate: false,
      hasBeenSortedByClicks: false,
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
    if (urls.map((url) => url.longUrl)[0]===url) { return alert(`You've already added that URL.`)}
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
        <li className="url-item" key={url.id}>
          <h2 className="url-title">{url.title}</h2>
          <a href={shortenedLink} className="shortened-link">
            {url.shortUrl}
          </a>
          <h2 className="counter">{url.counter}</h2>
          <h3 className="url-date">{url.dateAdded}</h3>
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
    let areFiltersDisabled;
    urls && urls.length > 1 ? areFiltersDisabled = false : areFiltersDisabled = true;
    let isSubmitButtonDisabled;
    urlInput && titleInput ? isSubmitButtonDisabled=false : isSubmitButtonDisabled=true;

    return (
      <div className="App">
        <h1 className="app-title">Lazy Links</h1>
        <form className="url-form" onSubmit={(e) => this.postUrls(titleInput, urlInput)}>
          <input className="title-input input" placeholder="Link Title"onChange={e => this.getTitleInput(e)}/>
          <input className="url-input input" placeholder="Full Link" onChange={e => this.getUrlInput(e)}/>
          <button className="url-submit-button input" disabled={isSubmitButtonDisabled}>
            submit
          </button>
        </form>

        <section className="sort-container">
          <button className="sort-button sort-by-click" disabled={areFiltersDisabled} onClick={e=> this.sortByClick()}>Sort by clicks</button>
          <button className="sort-button sort-by-date"  disabled={areFiltersDisabled} onClick={e=> this.sortByDate()}>Sort by date</button>
          <input className="search-filter" placeholder="search-links" disabled={areFiltersDisabled} onChange={e => this.getFilterInput(e)}/>
        </section>
        <ul className="url-list">
          { urls ? this.displayUrls() : null}
        </ul>
      </div>
    );
  }
}

export default App;
