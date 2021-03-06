import React, { Component } from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';
import './App.css';

class App extends Component {
  

  render() {

    return (
      <div className="App">
        {window.location.hash !== '#/' ? <Nav /> : null}
          
        {routes}
      </div>
    );
  }
}

export default App;
