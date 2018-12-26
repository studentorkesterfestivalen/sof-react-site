import React, { Component } from 'react';
import Navbar from './components/navigation';

import {Elevation} from '@rmwc/elevation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
        <Navbar/>

        <Elevation z={12}>
          <div className="main-text-area">
            Put text here and stuff

          </div>
        </Elevation>
      </div>
    );
  }
}

export default App;
