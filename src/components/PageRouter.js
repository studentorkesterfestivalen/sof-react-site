import React, { Component, forwardRef } from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

import Om from '../pages/Om';
import Test from '../pages/Test1';
import Contact from '../pages/Contact';
import CortegeAbout from '../pages/CortegeAbout';
import CortegeApplication from '../pages/CortegeApplication';

import { Switch, Route } from 'react-router-dom'

import posed, {PoseGroup} from 'react-pose';

const PosedRoutesContainer = posed.div({
  enter:{
    opacity: 1,
    delay: 400,
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
const headerTitles = {'/': 'KÅRTEGE - INFO' , '/about': 'OM SOF', '/contact': 'KONTAKT', '/cortege-about': 'KÅRTEGE - OM', '/cortege-registration': 'KÅRTEGE - ANSÖKAN'};
const headerColors = {'/': 'Green' , '/OM SOF': 'Green', '/contact': 'Green'};

class PageRouter extends Component{

  scrollToTop(pose){
    if(pose == 'exit'){
      window.scrollTo(0, 0);
    }
  }

  render() {
    return(
    <Route
      render={({ location }) => (
        <PoseGroup>
          <PosedRoutesContainer onPoseComplete={(pose) => this.scrollToTop(pose)} key={location.pathname} initialPose='exit' className='page'>
            <PageHeader  color={headerColors[location.pathname]} title={headerTitles[location.pathname]}/>

            <PosedPage  className='page-content'>
              <Switch location={location}>
                <Route 
                  exact path = "/" 
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
                />*/}
                <Route 
                  path = "/cortege-registration" 
                  render={(props) => <CortegeApplication {...props} isMobile={this.props.isMobile} />}
                  key = "CortegeRegistration"
                />
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