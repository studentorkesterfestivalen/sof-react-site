import React, { Component } from 'react';

import FormTextInput from './FormTextInput';

import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';
import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenu, SimpleMenuSurface } from '@rmwc/menu';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'
import Login  from './Login';

export default class AccountPopup extends Component {
  constructor(props){
    super(props)

    this.state = {open: false, loggedIn: false}
  }

  render(){
    var content = <Login/>;
    if(this.state.loggedIn){
      content = <Account/>;
    }

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        handle={<TopAppBarActionItem> account_circle </TopAppBarActionItem>}
      >
        {content}
      </SimpleMenuSurface>
    );
  }
}





class Account extends Component{

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}
