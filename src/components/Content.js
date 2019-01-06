import React from 'react'
import { Switch, Route } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose';

import Home from './Home'
import Works from './Works'
import About from './About'


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const Content = () => {
  return(
    <Route
      render={({ location }) => (
        <div className = 'main-content'>
          <PoseGroup>
            <RouteContainer key={location.pathname}>
              <Switch location={location}>
                <Route exact path = "/" component = {Home} key = "home"/>
                <Route path = "/works" component = {Works} key = "works"/>
                <Route path = "/about" component = {About} key = "about"/>
              </Switch>
            </RouteContainer>
          </PoseGroup>
        </div>
      )}
    />
  )
}

export default Content;
