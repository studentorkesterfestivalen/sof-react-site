import React from 'react';

import BasePage from '../pages/pageTypes/BasePage';

import Account from '../pages/Account';
import AdministrativePage from '../pages/pageTypes/AdministrativePage';
import OrchestraMemReg from './OrchestraMemReg';
import AllOrchestras from './AllOrchestras';
import AccountPage  from '../pages/Account';
import Verify from '../pages/Verify';

import { Switch, Route } from 'react-router-dom'

import posed, {PoseGroup} from 'react-pose';

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
              key={"route-" + location.pathname.split('/')[1]}
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
                path = {'/account'}
                render={(props) => (
                  <Account {...props} />
                )}
              />
              <Route 
                exact 
                path = {'/verified'}  
                render={ (props) => (
                  <BasePage content={Verify}>
                    <Verify {...props} isMobile={this.props.isMobile} />
                  </BasePage>
                )}
                key = {'/verified'}  
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

export default PageRouter;
