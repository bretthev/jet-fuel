import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: null,
      urlInput: null,
      urls: null
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

  getUrls() {
    axios.get('/urls', {})
    .then((response) => {
      this.setState({ urls: response.data })
    })
  }

  postUrls(title, url) {
    axios.post('/urls/shortenUrl',  {id: Date.now(), title: title, url: url})
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
    const { urls } = this.state;
    return urls.urls.map((url) => <li key={url.id}>{url.title} <a href={url.longUrl}>{url.shortUrl}</a></li> )
  }

  render() {
    const { urls, urlInput, titleInput } = this.state;
    return (
      <div className="App">
        <form className="url-form" onSubmit={(e) => this.postUrls(titleInput, urlInput)}>
          <input className="url-input" onChange={e => this.getTitleInput(e)}/>
          <input className="url-input" onChange={e => this.getUrlInput(e)}/>
          <button className="url-submit-button">
            submit
          </button>
        </form>
        <ul className="url-list">
        { urls ? this.displayUrls() : null}
        </ul>
      </div>
    );
  }
}

export default App;
