import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import routes from './routes';
import Header from './components/Header';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header/>
          {routes}
        </div>
      </div>
    );
  }
}

export default App;
