import React from 'react';

import BasePage from '../pages/pageTypes/BasePage';

import Account from '../pages/Account';
import VerifyLiuLogin from './account/VerifyLiuLogin';

import { Switch, Route, withRouter } from 'react-router-dom'

import posed, {PoseGroup} from 'react-pose';

import { openDialog} from '../actions/dialog';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

var qs = require('qs');

//import { FormattedMessage, injectIntl } from 'react-intl'

const pageSwitchDelay = 600;

const PosedRoutesContainer = posed.div({
  enter:{
    opacity: 1,
    delay: pageSwitchDelay,
    staggerChildren: 175,
    beforeChildren: true
  },
  exit: {
    opacity: 1,
    staggerChildren: 175,
    delay: pageSwitchDelay,
  },
});

// TODO: solve this way more elegantly

class PageRouter extends React.Component{

  scrollToTop(pose){
    if(pose === 'exit'){
      window.scrollTo(0, 0);
    }
  }

  componentDidMount(){
    if(this.props.location.search){
      const params = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      })
      if(params.account_confirmation_success){
        this.props.openDialog(
          this.props.intl.formatMessage({id: 'Register.emailVerifiedTitle'}),
          this.props.intl.formatMessage({id: 'Register.emailVerified'})
        )
        this.props.history.replace(this.props.location.pathname)
      }
    }
  }

  render() {
    const navRoutes = Object.keys(this.props.pages).map((key) => {
      const PageComp = this.props.pages[key];
      return(
        <Route
          exact path = {key}
          render={(props) => (
            <BasePage
              content={PageComp}
            >
              <PageComp {...props} isMobile={this.props.isMobile} />
            </BasePage>
          )}
          key = {key}
        />
      );
    });

    return(
    <Route
      render={({ location }) => {
        return(
          <PoseGroup>
            <PosedRoutesContainer
              onPoseComplete={(pose) => this.scrollToTop(pose)}
              key={location.pathname==='/account/login/Verify' ? 'loginVerify' : "route-" + location.pathname.split('/')[1]} //Ugly hack to make rerender account pages from a account redirect after liulogin
              initialPose='exit'
              className='page'
            >
                          {/*<PageHeader
                title={this.props.pages[location.pathname].pageTitle()}
              />

                <PosedPage  className='page-content'>*/}
            <Switch location={location}>
              {navRoutes}
              <Route
                exact
                path = {'/account/login/verify'}
                render={(props) => (
                  <VerifyLiuLogin {...props}/>
                )}
                key = {'/account/login/verify'}
              />
              <Route
                path = {'/account'}
                render={(props) => (
                  <Account {...props} />
                )}
                key = '/account/'
              />
              {/* TODO: Add empty route for 404 handling */}
            </Switch>
             {/* </PosedPage>

            <PageFooter/>*/}
          </PosedRoutesContainer>
        </PoseGroup>
        );
      }}
    />
    );
  }
}

export default injectIntl(withRouter(connect(null, {openDialog})(PageRouter)));
