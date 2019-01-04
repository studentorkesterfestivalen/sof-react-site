import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import '../styles/worksStyle.css'
import {BrowserView,
        MobileView,
        isBrowser,
        isMobile } from 'react-device-detect'

import { Button } from '@rmwc/button'
import { Drawer, DrawerContent } from '@rmwc/drawer'
const myComponent = props => <Button> Hello world! </Button>;

const Works = () => {
  return (
    <CSSTransitionGroup
      transitionName="worksTransition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div>
        { isMobile ?  "You're on your phone!" : "You're on your desktop" }

      </div>

      <Drawer dir="rtl">
        <DrawerContent />
      </Drawer>
    {/* <Button> Hello World! </Button> */}
    </CSSTransitionGroup>


  )
}

export default Works;
