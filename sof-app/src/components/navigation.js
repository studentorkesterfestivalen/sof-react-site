import React, { Component, forwardRef } from 'react';

import posed from 'react-pose';

import {isMobile} from 'react-device-detect';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';

import {
  Drawer,
  DrawerContent,
  DrawerScrim
} from '@rmwc/drawer';

import {
  List,
  ListDivider,
  ListGroup,
  ListItem,
} from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

const pages = ['Om SOF', 'Kårtegeanmälan', 'This is a test button', 'Foo bar'];

export default class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className = 'NavBar'>
        <DesktopTopAppBar pages={pages} className = 'hide-mobile'/>
        <MobileTopAppBar pages={pages} className = 'hide-desktop'/>
      </div>
    )
  }
}

function DesktopTopAppBar(props){
  const pageButtons = props.pages.map((page) => 
    <Ripple key={page}>
      <a href={page} className='nav-button'> {page} </a>
    </Ripple>
  );

  return(
    <div className={props.className}>
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

class MobileTopAppBar extends Component{
  constructor(props){
    super(props);

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.pressListLink = this.pressListLink.bind(this);

    this.state = {drawerOpen: false, selected: "Om SOF"};
    console.log(props);

  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  pressListLink(page) {
    this.setState({selected: page, drawerOpen: false});
    console.log(this.state.selected);
  };


  render(){
    const mobileClass = (isMobile ? "mobile" : "");
    console.log(mobileClass);

    const pageListItems = this.props.pages.map((page) => 
      <ListItem className={(this.state.selected === page ? "list-selected" : mobileClass)}
          key={page} 
          onClick={this.state.selected === page ? () => {} : () => this.pressListLink(page)} >
        {page}
      </ListItem>
    );

    const {className} = this.props;

    return(
      <div className={className}>
        <Drawer
          className='nav-drawer'
          dir="rtl"
          modal
          open={this.state.drawerOpen}
          onClose={() => this.setState({drawerOpen: false})}
        >
          <DrawerContent>

            Put in shit here like language and stuff
            <ListDivider/>
            <List dir="ltr">
              {pageListItems}
            </List>
          </DrawerContent>
        </Drawer>
        <DrawerScrim/>

        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart >
              <TopAppBarTitle >SOF19</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <TopAppBarNavigationIcon icon="menu" onClick={this.toggleDrawer} />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>

      </div>
    );
  };
}
