import React, { Component, forwardRef } from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

import Om from '../pages/Om';
import Contact from '../pages/Contact';
import CortegeAbout from '../pages/CortegeAbout';
import CortegeApplication from '../pages/CortegeApplication';
import History from '../pages/History';

import { Switch, Route } from 'react-router-dom'

import posed, {PoseGroup} from 'react-pose';

const pageSwitchDelay = 400;

const PosedRoutesContainer = posed.div({
  enter:{
    opacity: 1,
    delay: pageSwitchDelay,
    staggerChildren: 50,
    beforeChildren: true
  },
  exit: {
    opacity: 0,
    staggerChildren: 100,
  },
});


const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -50, opacity: 0}
});

// TODO: solve this way more elegantly
const headerTitles = {
'/': 'KÅRTEGE - INFO' ,
'/about': 'OM SOF',
'/contact': 'KONTAKT',
'/cortege-about': 'KÅRTEGE - OM',
'/cortege-registration': 'KÅRTEGE - ANSÖKAN',
'/history': 'HISTORIA'
};

const pages = {
'/':  CortegeAbout,
'/about': Om,
'/contact': Contact,
'/cortege-about': CortegeAbout,
'/cortege-registration': CortegeApplication,
};

const headerColors = {'/': 'Green' , '/OM SOF': 'Green', '/contact': 'Green'};

class PageRouter extends Component{

  scrollToTop(pose){
    if(pose == 'exit'){
      window.scrollTo(0, 0);
    }
  }

  render() {
    console.log(this.props.pages);
    const routes = Object.keys(this.props.pages).map((key) => {
      const PageComp = pages[key];
      return(
        <Route
          exact path = {key}
          render={(props) => <PageComp {...props} isMobile={this.props.isMobile} />}
          key = {key}
        />
      );
    });

    return(
    <Route
      render={({ location }) => (
        <PoseGroup>
          <PosedRoutesContainer
            onPoseComplete={(pose) => this.scrollToTop(pose)}
            key={location.pathname}
            initialPose='exit'
            className='page'
          >
            <PageHeader
              color={headerColors[location.pathname]}
              title={pages[location.pathname].pageTitle()}
            />

            <PosedPage  className='page-content'>
              <Switch location={location}>
                {routes}

                {/*
                <Route
                  path = "/"
                  render={(props) => <CortegeAbout {...props} isMobile={this.props.isMobile} />}
                  key = "CortegeAbout"
                />
                <Route
                  path = "/about"
                  render={(props) => <Om {...props} isMobile={this.props.isMobile} />}
                  key = "Om"
                />
                <Route
                  path = "/contact"
                  render={(props) => <Contact {...props} isMobile={this.props.isMobile} />}
                  key = "Contact"
                />
                {/*<Route
                  path = "/cortege-about"
                  render={(props) => <CortegeAbout {...props} isMobile={this.props.isMobile} />}
                  key = "CortegeAbout"
                />
                <Route
                  path = "/history"
                  render={(props) => <History {...props} isMobile={this.props.isMobile} />}
                  key = "History"
                />
                */}
              </Switch>
            </PosedPage>

            <PageFooter/>
          </PosedRoutesContainer>
        </PoseGroup>
      )}
    />
    );
  }
}

export default PageRouter;
