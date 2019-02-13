import React, { Component } from 'react';

import HighlightedArea from '../components/HighlightedArea';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route, Link } from 'react-router-dom'

import {connect} from 'react-redux';

import { PrivateRoute, AdminPriv } from '../components/PermissionHandler';

class AccountAdmin extends Component{
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
          path = '/account/admin/orchestras'
          render={(props) => {
            return(
              //List orhcestras
              <BaseAccountPage {...props} isMobile={this.props.isMobile} />
            );
          }}
              key = {'/admin/orchestras'}
        />
        <Route
          path = '/account/admin/orchestras/new'
          render={(props) => {
            return(
              //List orhcestras
              <BaseAccountPage {...props} isMobile={this.props.isMobile} />
            );
          }}
              key = {'/admin/orchestras/new'}
        />
        <Route
          path = '/account/admin/orchestras/:id'
          render={(props) => {
            return(
              //List orchestra members
              <BaseAccountPage {...props} isMobile={this.props.isMobile} />
            );
          }}
              key = {'/admin/orchestras/'}
        />
        <Route
          path = '/account/admin/orchestras/member/:id'
          render={(props) => {
            return(
              //List orchestra member
              <BaseAccountPage {...props} isMobile={this.props.isMobile} />
            );
          }}
              key = {'/admin/orchestras/member'}
        />
        <Route
          path = '/account/admin/permissionDenied'
          render={(props) => {
            return(
              //List orchestra member
              <h1> PERMISSION DENIED </h1>
            );
          }}
          key = {'/admin/denied'}
        />
        <PrivateRoute
          requiredAccess={AdminPriv.ALL}
          render={(props) => {
            return(
              <BaseAccountPage {...props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/admin/base'}
        />
      </Switch>
    );
  }
}

export default connect()(AccountAdmin);

class BaseAccountPage extends Component{

  render() {
    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          WADDAFAKK
        </GridCell>
      </GridInner>
    );
  }
}
