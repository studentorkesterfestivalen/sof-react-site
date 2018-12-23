import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import '../styles/aboutStyle.css'

const About = () => {
  return (
    <CSSTransitionGroup
      transitionName="aboutTransition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div className="about">
        About
        </div>
    </CSSTransitionGroup>
  )
}

export default About
