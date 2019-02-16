import React, { Component } from 'react';

import OrchestraMemReg from '../components/OrchestraMemReg';
import Orchestras, {OrchestraNew} from './AdminOrchestras';
import OrchestraSignup from './OrchestraSignup';
import Orchestra from './Orchestra';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux';

import { PrivateRoute, AdminPriv } from '../components/PermissionHandler';


class AccountOrchestra extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Admin";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  render() {

    return(
      <Switch>
        <Route
          exact
          path = '/account/orchestra'
          render={(props) => {
            return(
              //List orhcestra
              <Orchestra {...props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/account/orchestra'}
        />
        <Route
          path = '/account/orchestra/join/:id'
          render={(props) => {
            return(
              //List orhcestras
              <OrchestraSignup {...props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/account/orchestra/join/'}
        />
        <Route
          render={(props) => {
            return(
              <Redirect to={'/account/orchestra/'} />
            );
          }}
          key = {'/orcehstrawoong'}
        />
      </Switch>
    );
  }
}

export default connect()(AccountOrchestra);
