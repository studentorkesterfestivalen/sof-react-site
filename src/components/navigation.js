import React, { forwardRef } from 'react';
import { PropTypes, func } from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollLock from 'react-scrolllock';

import posed from 'react-pose';

import SplitText from 'react-pose-text';
import { setLocale } from '../actions/locale';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
} from '@rmwc/top-app-bar';

import {
  Drawer,
  DrawerContent,
} from '@rmwc/drawer';

import {
  List,
  ListDivider,
  SimpleListItem,
  ListItem,
} from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { Icon } from '@rmwc/icon';

import DesktopTopAppBar from './DesktopTopAppBar';
import MobileTopAppBar from './MobileTopAppBar';

// TODO: Temporary, replace with actual pages
/*const pages = [
  //{label:'Kårtege', ref: [
  {label: 'Kårtege - Info', ref: '/'},
  {label: 'Kårtege - Ansökan', ref: '/cortege-registration'},
  //},
  {label: 'Om SOF', ref: '/about'},
  {label: 'Kontakt', ref: '/contact'},
  {label: 'Historia', ref: '/history'}];
*/
class Navbar extends React.PureComponent{
  constructor(props){
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(){
    console.log('trying to set lang');  
    this.props.changeLanguage()
  }

  render(){
    return(
      <div className={this.props.className}>
        <DesktopTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={this.props.pages}
          className = 'hide-mobile' // Hides desktop navbar on smaller screens
          {...this.props}
        />
        <MobileTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={this.props.pages}
          className = 'hide-desktop'  // Hides mobile navbar om bigger screens
          {...this.props}
        />
      </div>
    )
  }
}

Navbar.propTypes = {
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, { setLocale })(withRouter(Navbar));

