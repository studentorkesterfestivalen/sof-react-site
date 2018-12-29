import React, { Component, forwardRef } from 'react';

import posed from 'react-pose';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';

import { Button, ButtonIcon } from '@rmwc/button';

const pages = ['Page 1', 'Page 2', 'Bing bong', 'Test etc'];

export default class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className = 'NavBar'>
        <DesktopTopAppBar pages={pages}/>
      </div>
    )
  }
}

function DesktopTopAppBar(props){
  const pageButtons = props.pages.map((page) => 
    <a key={page} href={page} className='nav-button'> {page} </a>
  );

  return(
    <div>
      <TopAppBar fixed >
        <TopAppBarRow >
          <TopAppBarSection alignStart >
            <TopAppBarTitle >SOF19</TopAppBarTitle>
            {pageButtons}
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            {/* TODO: Add later when functionality exist
                <TopAppBarActionItem aria-label="Download" alt="Download">
                  shopping_cart
                </TopAppBarActionItem>
                <TopAppBarActionItem
                  aria-label="Print this page"
                  alt="Print this page"
                >
                  account
                </TopAppBarActionItem>
                */}
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust/>
    </div>
  );
}
