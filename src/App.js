import React, { Component } from 'react';
import Navbar from './components/navigation';

import PageRouter from './components/PageRouter';

import {ThemeProvider} from '@rmwc/theme';


class App extends Component {
  constructor(props){
    super(props)

    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {lang: 'sv', isMobile: false};
  }


  handleResize() {
    if(!this.state.isMobile && window.innerWidth < 480){
      this.setState({isMobile: true});
    } else if(this.state.isMobile && window.innerWidth >= 480){
      this.setState({isMobile: false});
    }
  }


  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
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
        }} style={{height: '100%'}}>
          <Navbar lang={this.state.lang} changeLanguage={this.changeLanguage}/>

          <PageRouter isMobile={this.props.isMobile} />

        </ThemeProvider>
      </div>
    );
  }
}

export default App;
