import React, { Component } from 'react';
import Navbar from './components/navigation';
import Content from './components/Content';
import ErrorBoundary from './components/ErrorBoundary'
import { IntlProvider } from 'react-intl'
 
import {Elevation} from '@rmwc/elevation';
import {ThemeProvider} from '@rmwc/theme';
import l18n from './locale/l18n.js'

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

console.log(language);

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

console.log(languageWithoutRegionCode)

// Try full locale, try locale without region code

console.log(l18n[language]);

class App extends Component {
  constructor(props){
    super(props)
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {lang: languageWithoutRegionCode || language || 'sv'};
  }

  changeLanguage(){
    this.setState({lang: this.state.lang === 'sv' ? 'en' : 'sv'});
  }

  render() {

    return (
      <IntlProvider locale={this.state.lang} messages={l18n[this.state.lang]}>
        <div className="App">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"/>
          <ThemeProvider options={{
            primary: '#FF0000',
            secondary: '#0c726f'
          }}>
            <Navbar lang={this.state.lang} changeLanguage={this.changeLanguage}/>
            <div className="main-text-area">
              <ErrorBoundary>
                <Content />
              </ErrorBoundary>
            </div>
          </ThemeProvider>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
