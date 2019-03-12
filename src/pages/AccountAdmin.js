import React, { Component } from 'react';

import Orchestras, { OrchestraNew, OrchestraFindMember, OrchestraSignup, OrchestraSignupChange, OrchestraList } from './AdminOrchestras';

import {  GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

// import { ListDivider } from '@rmwc/list';

// import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route,  withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import { PrivateRoute } from '../components/PermissionHandler';

import { setTitle } from '../actions/title';

class AccountAdmin extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Admin";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount() {
    this.props.dispatch(setTitle('Account.admin'));
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
              <Orchestras {...props} />
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
              <OrchestraNew {...props} />
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
              <OrchestraList {...props} />
            );
          }}
              key = {'/admin/orchestras/'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup'
          render={(props) => {
            return(
              //List orchestra member
              <OrchestraFindMember {...props}  />
            );
          }}
          key = {'/admin/signup'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup/:id/edit'
          render={(props) => {
            return(
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignupChange {...props}/>
            );
          }}
          key = {'/admin/signups/edit'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup/:id'
          render={(props) => {
            return(
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignup {...props}/>
            );
          }}
          key = {'/admin/signups'}
        />
        <Route
          path = '/account/admin/permissiondenied'
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
              <BaseAdminPage {...props} {...this.props} />
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
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/orchestras')}> Orkestrar </Button>
            : null
          }
        </GridCell>
      </GridInner>
    );
  }
}

const BaseAdminPage = withRouter(UNCBaseAdminPage);
