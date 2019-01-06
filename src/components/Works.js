import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import '../stylesheets/worksStyle.css'
import {BrowserView,
        MobileView,
        isBrowser,
        isMobile } from 'react-device-detect'

import { Button } from '@rmwc/button'
import { Drawer, DrawerContent } from '@rmwc/drawer'

const myComponent = props => <Button> Hello world! </Button>;

const Works = () => {
  return (

      <div className = 'main-content'>
        { isMobile ?  "You're on your phone!" : "You're on your desktop" }
      </div>

      



  )
}

export default Works;
