import React, { Component } from 'react';
import Navbar from './components/navigation';

import {Elevation} from '@rmwc/elevation';
import {ThemeProvider} from '@rmwc/theme';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
        <ThemeProvider options={{
          primary: '#FF0000',
          secondary: '#0c726f'
        }}>
          <Navbar/>

          <div className="main-text-area">
            Put text here and stuff
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
