import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import '../stylesheets/aboutStyle.css'
import {BrowserView,
        MobileView,
        isBrowser,
        isMobile } from 'react-device-detect'

const About = () => {
  return (
    <CSSTransitionGroup
      transitionName="aboutTransition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div className="about">
        { isMobile ?  "You're on your phone!" : "You're on your desktop" }
      </div>
    </CSSTransitionGroup>
  )
}

export default About;
