import React, { Component, forwardRef } from 'react';

import {BrowserView, MobileView} from 'react-device-detect';

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

import {
  Drawer,
  DrawerContent,
} from '@rmwc/drawer';

import {
  List,
  ListDivider,
  ListGroup,
  ListItem,
} from '@rmwc/list';

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
    <a key={page} href={page} className='nav-button'> {page} </a>
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

    this.state = {drawerOpen: false};
    console.log(props);

  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  render(){
    const pageListItems = this.props.pages.map((page) => 
      <ListItem key={page} onClick={this.toggleDrawer} > {page} </ListItem>
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
            <List>
              {pageListItems}
            </List>
          </DrawerContent>
        </Drawer>

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
