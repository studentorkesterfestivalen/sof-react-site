import React, { Component } from 'react';

import { Switch, Route, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

export const AdminPriv = {
  NONE: 0,
  ALL: 1,
  ORCHESTRA_ADMIN: 2,
  LIST_ORCHESTRA_SIGNUPS: 4,
  MODIFY_ARTICLES: 8,
  LIST_USERS: 16,
  MODIFY_USERS: 32,
  DELETE_USERS: 64,
  LIST_CORTEGE_APPL: 128,
  APPRIVE_CORTEGE_APPL: 256,
  LIST_FUNKIS_APPL: 512,
  ANALYS: 1028,
  TICKETER: 2048,
  EDITOR: 4096
};

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
});

class UNCPrivateRoute extends Component{ 

  hasAccess = () => {
    if(!this.props.loggedIn){
      return false;
    }
    if(this.props.requiredAccess && (this.props.adminPriv & this.props.requiredAccess) !== this.props.requiredAccess){
      return false;
    }
    return true;
  };

  render(){

    const {render, ...rest} = this.props;

    return(
      <Route
        {...rest}
        render={(props) =>
          this.props.loggedIn ? (
            this.hasAccess() ?(
              <React.Fragment>
                {render(props)}
              </React.Fragment>
            ) : (
              <Redirect
                to={{
                  pathname: "/account/admin/permissionDenied",
                  state: { from: this.props.location }
                }}
              />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: this.props.location }
              }}
            />
          )
        }
      />

    );
  }
}

export const PrivateRoute = connect(mapStateToProps)(UNCPrivateRoute);
