import React from 'react';
import Navbar from './components/navigation';
import PageRouter from './components/PageRouter';
import {ThemeProvider} from '@rmwc/theme';
import { IntlProvider } from 'react-intl';
import { withCookies, Cookies } from 'react-cookie';
import strings from './locale/index';
import PropTypes from 'prop-types';
import Om from './pages/Om';
import Contact from './pages/Contact';
import CortegeAbout from './pages/CortegeAbout';
import CortegeApplication from './pages/CortegeApplication';
import History from './pages/History';
import { connect } from 'react-redux';
import { setLocale } from './actions/locale'

//Get browser language
//const language =
//  (navigator.languages && navigator.languages[0]) ||
//  navigator.language ||
//  navigator.userLanguage;

//Split locales with a region code
//const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const pages = {
'/':  CortegeAbout,
'/cortege-registration': CortegeApplication,
'/about': Om,
'/history': History,
'/contact': Contact,
};

class App extends React.PureComponent {
  constructor(props){
    super(props)

    this.cookies = this.props.cookies;
    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {isMobile: false, isTablet: false};
    console.log(this.props.history);
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
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(){
    // this.setState({lang: this.state.lang === 'sv' ? 'en' : 'sv'}, () => {
    //   this.cookies.set('lang', this.state.lang, { path: '/' })
    // });
    this.props.setLocale(this.props.lang === 'sv' ? 'en' : 'sv');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { lang, isMobile, isTablet } = this.props;
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
            <Navbar
              lang={this.props.lang}
              changeLanguage={this.changeLanguage}
              pages={pages}
                isMobile={this.state.isMobile}
            />

            <PageRouter
              isMobile={this.state.isMobile}
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
  isTablet: PropTypes.bool.isRequired,
  setLocale: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
  };
}

export default connect(mapStateToProps, { setLocale })(withCookies(App));
