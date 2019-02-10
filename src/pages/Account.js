import React, { Component } from 'react';

import { Switch, Route, Link } from 'react-router-dom'

import { FormattedMessage, injectIntl } from 'react-intl'
import AdministrativePage from './pageTypes/AdministrativePage';
import AdministrativePageHeader from './pageTypes/AdministrativePageHeader';
import PageFooter from './pageTypes/PageFooter';

import Profile from './Profile';

import posed from 'react-pose';

const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

class Account extends React.PureComponent{
  render() {

    return(
      <React.Fragment>
      <AdministrativePageHeader
        color='Red'
        title={'title'}
      />
      <PosedPage  className='base-page-content'>
        <div className='administrative-page base-page-content'>
          <Switch>
            <Route
              path = {'/account/profile'}
              render={(props) => (
                <Profile {...props} isMobile={this.props.isMobile} />
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
        </div>
      </PosedPage>

      <PageFooter/>
    </React.Fragment>
    );
  }
}

export default injectIntl(Account);
