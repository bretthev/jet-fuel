import React, { Component } from 'react';
 import axios from 'axios';

class App extends Component {

  getUrls() {
    axios.get('/urls', {})
    .then((response) => {
      console.log(response.data.urls)
    })
  }

  componentWillMount() {
    this.getUrls()
  }

  render() {
    return (
      <div className="App">
        <form className="url-form">
          <input className="url-input" />
          <button className="url-submit-button">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
