import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Link, Redirect } from 'react-router-dom';

import { LoginContent } from '../components/AccountPopup';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.attributes.displayName,
  loading: state.reduxTokenAuth.currentUser.isLoading,
});

class LoginPage extends Component{
  render() {

    var fromPath = null;
    try{
      fromPath = this.props.location.state.from.pathname;
    } catch{
      fromPath = null;
    }

    console.log(this.props);
    console.log('fromPath: ' + fromPath);

    return(
      <GridInner>
        <GridCell desktop='12' phone='4' tablet='8'  > 
          <LoginContent from={fromPath} />
          {this.props.loggedIn && !this.props.loading && !fromPath && <Redirect to='/account/profile'/>}
        </GridCell>
      </GridInner>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
