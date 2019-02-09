import React from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

import BasePage from '../pages/pageTypes/BasePage';
import AdministrativePage from '../pages/pageTypes/AdministrativePage';

import { Switch, Route } from 'react-router-dom'

import posed, {PoseGroup} from 'react-pose';

import { FormattedMessage, injectIntl } from 'react-intl'

const pageSwitchDelay = 600;

const PosedRoutesContainer = posed.div({
  enter:{
    opacity: 1,
    delay: pageSwitchDelay,
    staggerChildren: 175,
    beforeChildren: true
  },
  exit: {
    opacity: 0,
    staggerChildren: 175,
    delay: pageSwitchDelay,
  },
});


const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

// TODO: solve this way more elegantly

class PageRouter extends React.Component{

  scrollToTop(pose){
    if(pose === 'exit'){
      window.scrollTo(0, 0);
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
              key={location.pathname}
              initialPose='exit'
              className='page'
            >
                          {/*<PageHeader
                title={this.props.pages[location.pathname].pageTitle()}
              />

                <PosedPage  className='page-content'>*/}
            <Switch location={location}>
              {navRoutes}
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

export default injectIntl(PageRouter);
