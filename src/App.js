import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: null,
      testState: null
    }
  }

  getInput(e) {
    e.preventDefault();
    this.setState({ inputValue: e.target.value })
  }

  getUrls() {
    axios.get('/api/urls', {})
    .then((response) => {
      console.log(response.data.urls)
    })
  }

  postUrls(url) {
    axios.post('/api/urls',  {id: Date.now(), url: url})
    .then((response) => {
      console.log(response)
    })
    .catch(() => {
      console.log('Invalid request')
    })
  }

  componentWillMount() {
    this.getUrls();
  }

  render() {
    return (
      <div className="App">
        <form className="url-form" onSubmit={(e) => this.postUrls(this.state.inputValue)}>
          <input className="url-input" onChange={e => this.getInput(e)}/>
          <button className="url-submit-button">
            submit
          </button>
        </form>
        <section className="url-list">

        </section>
      </div>
    );
  }
}

export default App;
