import React, { Component } from 'react';

import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { FormattedMessage } from 'react-intl'
import AdministrativePage from './pageTypes/AdministrativePage';
import AdministrativePageHeader from './pageTypes/AdministrativePageHeader';
import PageFooter from './pageTypes/PageFooter';

import { PrivateRoute, isAnyAdmin  } from '../components/PermissionHandler';
import VerifyLiuLogin from '../components/VerifyLiuLogin';

import Profile from './Profile';
import Admin from './AccountAdmin';
import Orchestra from './AccountOrchestra';
import { LoginPage, RegisterPage } from './LoginPage';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import {
  List,
  ListItem
} from '@rmwc/list';

import posed from 'react-pose';

import { generateRequireSignInWrapper } from 'redux-token-auth';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
});
 
const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

class Account extends Component{
  render() {

    
    const menuListItems = ['Profil', 'Orkester', 'Admin'].map((key) =>(
      <ListItem
        key={"acc-menu-" + key}
        onClick={() => this.pressListLink(key)}
      >
        <h4>
          {key}
        </h4>
      </ListItem>
    ));


    return(
      <React.Fragment>
      <AdministrativePageHeader
        color='Red'
        title={'title'}
      />
      <PosedPage  className='base-page-content'>
        <div className='administrative-page base-page-content'>
          <Grid className="administrative-outer-grid">
            <GridInner>
              <GridCell desktop='3' className='hide-mobile account-desktop-menu' > 
                <List>
                  <ListItem tag={Link} to='/account/profile'>
                    <h4>
                      Profile
                    </h4>
                  </ListItem>
                  <ListItem tag={Link} to='/account/orchestra'>
                    <h4>
                      Orkester
                    </h4>
                  </ListItem>
                {isAnyAdmin(this.props.adminPriv) ? <ListItem tag={Link} to='/account/admin'>
                    <h4>
                      Admin
                    </h4>
                  </ListItem> : null}
                </List>
              </GridCell>
              <GridCell desktop='9' tablet='8' phone='4'>

                <Switch>
                  <PrivateRoute
                    path = {'/account/profile'}
                    render={(props) => {
                      return(
                        <Profile {...props} isMobile={this.props.isMobile} />
                      );
                    }}
                    key = {'/account/profile'}
                  />
                  <Route
                    path = {'/account/login'}
                    render={(props) => (
                      <LoginPage {...props} />
                    )}
                    key = {'/account/login'}
                  />
                  <Route
                    path = {'/account/register'}
                    render={(props) => (
                      <RegisterPage {...props} />
                    )}
                    key = {'/account/register'}
                  />
                  <Route
                    path = {'/account/admin'}
                    render={(props) => (
                      <Admin {...props} />
                    )}
                    key = {'/account/admin'}
                  />
                  <PrivateRoute
                    path = {'/account/orchestra'}
                    render={(props) => (
                      <Orchestra {...props} />
                    )}
                    key = {'/account/orchestra'}
                  />
                  <PrivateRoute
                    render={(props) => (
                      <Redirect to='/account/profile' />
                    )}
                    key = {'/account/base'}
                  />
                </Switch>
              </GridCell>
            </GridInner>
          </Grid>
        </div>
      </PosedPage>

      <PageFooter/>
    </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Account);
