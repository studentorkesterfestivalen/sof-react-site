import React from 'react';
import Navbar from './navigation';
import PageRouter from './PageRouter';
import {ThemeProvider} from '@rmwc/theme';
import { IntlProvider } from 'react-intl';
import strings from '../locale/index';
import PropTypes from 'prop-types';
import Om from '../pages/Om';
import Contact from '../pages/Contact';
import CortegeAbout from '../pages/CortegeAbout';
import History from '../pages/History';
import { connect } from 'react-redux';
import { setLocaleAndStore } from '../actions/locale';
import { setMobile } from '../actions/mobile';
import { setTitle } from '../actions/title';
import { closeDialog} from '../actions/dialog';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
//import OrchestraMemReg from './OrchestraMemReg';
//import AllOrchestras from './AllOrchestras'
//Get browser language
//const language =
//  (navigator.languages && navigator.languages[0]) ||
//  navigator.language ||
//  navigator.userLanguage;

//Split locales with a region code
//const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const pages = {
'/':  Om,
'/cortege': CortegeAbout,
//'/about': Om,
'/history': History,
'/contact': Contact
};

class App extends React.PureComponent {
  constructor(props){
    super(props)

    this.cookies = this.props.cookies;
    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {isMobile: false, isTablet: false};
  }


  handleResize() {
    if(!this.state.isMobile && window.innerWidth < 480){
      //this.setState({isMobile: true});
      this.props.setMobile(true);
    } else if(this.state.isMobile && window.innerWidth >= 480){
      //this.setState({isMobile: false});
      this.props.setMobile(false);
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(){
    // this.setState({lang: this.state.lang === 'sv' ? 'en' : 'sv'}, () => {
    //   this.cookies.set('lang', this.state.lang, { path: '/' })
    // });
    this.props.setLocaleAndStore(this.props.lang === 'sv' ? 'en' : 'sv');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { lang, isMobile } = this.props;
    return (
      <IntlProvider locale={lang} messages={strings[lang]}>
        <div className="App">

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"/>

          <img
            className='app-sof-logo'
            src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/sof_19_logo_stor.png'
            alt=''
          />
          <ThemeProvider options={{
            primary: '#FF0000',
            secondary: '#0c726f'
          }}
            style={{height: '100%'}}
          >
      { /* <AllOrchestras/> 
            <OrchestraMemReg/>*/}
            <Dialog
              open={this.props.dialog.open}
              onClose={() => this.props.closeDialog()}
            >
              <DialogTitle>{this.props.dialog.title}</DialogTitle>
              <DialogContent> {this.props.dialog.text} </DialogContent>
              <DialogActions>
                <DialogButton action="accept" isDefaultAction>OK</DialogButton>
              </DialogActions>
            </Dialog>
            <Navbar
              lang={this.props.lang}
              changeLanguage={this.changeLanguage}
              pages={pages}
                isMobile={isMobile}
            />
          
            <PageRouter
              isMobile={isMobile}
              pages={pages}
            />

        </ThemeProvider>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  lang: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setLocaleAndStore: PropTypes.func.isRequired,
  setMobile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    lang: state.locale.lang,
    isMobile: state.mobile.isMobile,
    dialog: state.dialog
    //isTablet: state.tablet.isTablet,
  };
}

export default connect(mapStateToProps, { closeDialog, setLocaleAndStore, setMobile, setTitle})(App);
