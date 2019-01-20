import React, { Component } from 'react';
import Navbar from './components/navigation';
import PageRouter from './components/PageRouter';
import {ThemeProvider} from '@rmwc/theme';
import { IntlProvider } from 'react-intl';
import { withCookies } from 'react-cookie';
import strings from './locale/index';

class App extends Component {
  constructor(props){
    super(props)

    this.cookies = this.props.cookies;
    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {lang: this.cookies.get('lang') || 'sv', isMobile: false};
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
    this.setState({lang: this.state.lang === 'sv' ? 'en' : 'sv'}, () => {
      this.cookies.set('lang', this.state.lang, { path: '/' })
    });
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

          <img 
            className='app-sof-logo'
            src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/sof_logo_fyrkant_opt.png' 
            alt='SOF19'  
          />
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

export default withCookies(App);
