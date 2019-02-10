import React, { Component } from 'react';

import { Switch, Route, Link } from 'react-router-dom'

import { FormattedMessage } from 'react-intl'
import AdministrativePage from './pageTypes/AdministrativePage';
import AdministrativePageHeader from './pageTypes/AdministrativePageHeader';
import PageFooter from './pageTypes/PageFooter';

import Profile from './Profile';
import Admin from './AccountAdmin';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import {
  List,
  ListItem
} from '@rmwc/list';

import posed from 'react-pose';

import { generateRequireSignInWrapper } from 'redux-token-auth';

import {connect} from 'react-redux';
 
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
                  <ListItem tag={Link} to='/account/admin'>
                    <h4>
                      Admin
                    </h4>
                  </ListItem>
                </List>
              </GridCell>
              <GridCell desktop='9' tablet='8' phone='4'>

                <Switch>
                  <Route
                    path = {'/account/profile'}
                    render={(props) => {
                      return(
                        <Profile {...props} isMobile={this.props.isMobile} />
                      );
                    }}
                    key = {'/account/prof'}
                  />
                  <Route
                    path = {'/account/login'}
                    render={(props) => (
                      <Link to='/account/profile'> test </Link>
                    )}
                    key = {'/account/prof'}
                  />
                  <Route
                    path = {'/account/admin'}
                    render={(props) => (
                      <Admin {...props} />
                    )}
                    key = {'/account/prof'}
                  />
                  <Route
                    render={(props) => (
                      <Link to='/account/profile'> test </Link>
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

export default connect()(Account);
