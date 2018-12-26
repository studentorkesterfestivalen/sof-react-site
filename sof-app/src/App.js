import React, { Component } from 'react';
import './App.scss';
import {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import MenuBar from './MenuBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
        <MenuBar/>

        <TopAppBarFixedAdjust>
          <div className="main-text-area">
            Put text here and stuff

          </div>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default App;
