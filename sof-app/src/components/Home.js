import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import '../stylesheets/homeStyle.css'
import {BrowserView,
        MobileView,
        isBrowser,
        isMobile } from 'react-device-detect'

const Home = () => {
  return (
    <CSSTransitionGroup
      transitionName="homeTransition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div>
        { isMobile ?  "You're on your phone!" : "You're on your desktop" }
      </div>
    </CSSTransitionGroup>
  )
}

export default Home;
