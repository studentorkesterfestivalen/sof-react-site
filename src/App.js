import React, { Component } from 'react';
import Navbar from './components/navigation';
import PageRouter from './components/PageRouter';
import {ThemeProvider} from '@rmwc/theme';
import { IntlProvider } from 'react-intl';
import strings from './locale/index';

//Get browser language
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

//Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

class App extends Component {
  constructor(props){
    super(props)

    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {lang: languageWithoutRegionCode || language || 'en', isMobile: false};
  }


  handleResize() {
    if(!this.state.isMobile && window.innerWidth < 480){
      this.setState({isMobile: true});
      console.log("mobile");
    } else if(this.state.isMobile && window.innerWidth >= 480){
      this.setState({isMobile: false});
      console.log("not mobile");
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(){
    this.setState({lang: this.state.lang === 'sv' ? 'en' : 'sv'});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <IntlProvider locale={this.state.lang} messages={strings[this.state.lang]}>
        <div className="App">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"/>

          <ThemeProvider options={{
            primary: '#FF0000',
            secondary: '#0c726f'
          }} style={{height: '100%'}}>
            <Navbar lang={this.state.lang} changeLanguage={this.changeLanguage}/>

            <PageRouter isMobile={this.state.isMobile} />

          </ThemeProvider>

            
        </div>
      </IntlProvider>
    );
  }
}

export default App;
