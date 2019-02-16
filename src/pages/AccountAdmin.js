import React, { Component } from 'react';

import Orchestras, {OrchestraNew} from './AdminOrchestras';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route, Link, withRouter } from 'react-router-dom'

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
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/orchestras'
          render={(props) => {
            return(
              //List orhcestras
              <Orchestras {...props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/admin/orchestras'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/orchestras/new'
          render={(props) => {
            return(
              //List orhcestras
              <OrchestraNew {...props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/admin/orchestras/new'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          path = '/account/admin/orchestras/:id'
          render={(props) => {
            return(
              //List orchestra members
              <BaseAdminPage {...props} isMobile={this.props.isMobile} />
            );
          }}
              key = {'/admin/orchestras/'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          path = '/account/admin/orchestras/member/:id'
          render={(props) => {
            return(
              //List orchestra member
              <BaseAdminPage {...props} isMobile={this.props.isMobile} />
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
          admin
          render={(props) => {
            return(
              <BaseAdminPage {...props} {...this.props} isMobile={this.props.isMobile} />
            );
          }}
          key = {'/admin/base'}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
});

export default connect(mapStateToProps)(AccountAdmin);

class UNCBaseAdminPage extends Component{
  render() {
    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          {((this.props.adminPriv & this.props.requiredAccess) !== this.props.requiredAccess) ?
            <Button raised onClick={() => this.props.history.push('admin/orchestras')}> Orkestrar </Button>
            : null
          }
        </GridCell>
      </GridInner>
    );
  }
}

const BaseAdminPage = withRouter(UNCBaseAdminPage);
