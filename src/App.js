import React, { Component } from 'react';
import Navbar from './components/navigation';

import {Elevation} from '@rmwc/elevation';
import {ThemeProvider} from '@rmwc/theme';

class App extends Component {
  constructor(props){
    super(props)

    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {lang: 'sv'};
  }

  changeLanguage(lang){
    this.setState({lang: lang});
  }

  render() {

    const testLanguageStr = (this.state.lang === 'sv' ? "Sätt in text här och skit" : "Put text here and stuff");

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
        <ThemeProvider options={{
          primary: '#FF0000',
          secondary: '#0c726f'
        }}>
          <Navbar lang={this.state.lang} changeLanguage={this.changeLanguage}/>

          <div className="main-text-area" > 
            {testLanguageStr}
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
