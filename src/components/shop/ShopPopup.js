import React, { Component } from 'react';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import ResetPassEmail from '../forms/ResetPassEmail';

import { signOutUser } from '../../redux-token-auth-config'

import { setAccountPopupOpen } from '../../actions/login';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import posed from 'react-pose/lib/index';
import { FormattedMessage } from 'react-intl';

import { IconButton } from '@rmwc/icon-button';


const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  //isOpen: state.login.accountPopupOpen,
});

class UNCDesktopShopPopup extends React.PureComponent {

  setPopupState = (state) => {
    this.props.setShopPopupOpen(state);
  }

  render(){

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.props.isOpen}
        //onOpen={()=>this.setPopupState(true)}
        //onClose={()=>this.setPopupState(false)}
        handle={<TopAppBarActionItem icon='shopping_cart'/>}
      >
      {// <LoginContent {...this.props}/>
      }
      </SimpleMenuSurface>
    );
  }
}
export const DesktopShopPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser}) (UNCDesktopShopPopup));
