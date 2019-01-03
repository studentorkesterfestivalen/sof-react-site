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

import {
  Drawer,
  DrawerContent,
  DrawerScrim
} from '@rmwc/drawer';

import {
  List,
  ListDivider,
  SimpleListItem,
  ListItem,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
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

const FDrawerContent = forwardRef((props, ref) =>
  <DrawerContent elementRef={ref} {...props}> {props.children} </DrawerContent>
);

const PosedDrawerContent = posed(FDrawerContent)({
  open: {
    staggerChildren: 50,
  },
  closed: {
    staggerChildren:50,
  }
});

const PosedListItem = posed.div({
  open: {
    opacity: 1,
    y: 0
  },
  closed: {
    opacity: 0,
    y: -50,
    transition: {
      opacity: { duration: 200}
    }
  }
});


class MobileTopAppBar extends Component{
  constructor(props){
    super(props);

    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.pressListLink = this.pressListLink.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {drawerOpen: false,
      poseOpen:false,
      selected: "Om SOF",
      language: {p: "Svenska", s:"Swedish"}
    };
  }

  closeDrawer(){
    this.setState({poseOpen: false});
    setTimeout(() => this.setState({drawerOpen: false}), 400);
  }

  openDrawer(){
    this.setState({drawerOpen: true});
  }

  pressListLink(page) {
    this.setState({selected: page});
    this.closeDrawer();
  };

  changeLanguage(){
    if(this.state.language.p === "Svenska"){
      this.setState({language: {p: "English", s: "Engelska"}});
    } else{
      this.setState({language: {p: "Svenska", s: "Swedish"}});
    }
  }


  render(){
    const drawerPose = (this.state.poseOpen ? "open" : "closed");

    const pageListItems = this.props.pages.map((page) => 
      <PosedListItem pose = {drawerPose}>
        <ListItem 
            pose = {drawerPose}
            className={(this.state.selected === page ? "list-selected list-centered" : "mdc-ripple-upgraded list-centered")}
            ripple={(this.state.selected ===page ? false : true)}
            key={page} 
            onClick={() => this.pressListLink(page)} >
          {page}
        </ListItem>
      </PosedListItem>
    );

    const {className} = this.props;

    return(
      <div className={className}>
        <Drawer
          className='nav-drawer'
          dir="rtl"
          modal
          open={this.state.drawerOpen}
          onClose={() => this.setState({drawerOpen:false, poseOpen: false})}
          onOpen={() => this.setState({drawerOpen: true, poseOpen: true})}
        >
          <PosedDrawerContent pose={drawerPose} dir="ltr">

            <PosedListItem dir="ltr"p ose={drawerPose}>
              <SimpleListItem text={this.state.language.p} secondaryText={this.state.language.s} meta="language" onClick={this.changeLanguage} />
            </PosedListItem>
            <PosedListItem>
              <ListDivider/>
            </PosedListItem>

            {pageListItems}
          </PosedDrawerContent>
        </Drawer>

        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart >
              <TopAppBarTitle >SOF19</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <TopAppBarNavigationIcon icon="menu" onClick={() => this.setState({drawerOpen: true})/*this.openDrawer*/} />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>

      </div>
    );
  };
}
