import React, { Component, forwardRef } from 'react';

import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';

import { Link, withRouter, Redirect } from 'react-router-dom';

import posed from 'react-pose';

import SplitText from 'react-pose-text';

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

import { Icon } from '@rmwc/icon';

// TODO: Temporary, replace with actual pages
const pages = ['', 'works', 'about'];

class Navbar extends Component{
  constructor(props){
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lang){
    this.props.changeLanguage(lang)
  }

  render(){
    return(
      <div className = 'NavBar'>
<<<<<<< HEAD
        <DesktopTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={pages}
          className = 'hide-mobile' // Hides desktop navbar on smaller screens
        />
        <MobileTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={pages}
          className = 'hide-desktop'  // Hides mobile navbar om bigger screens
          {...this.props}
        />
=======
      <DesktopTopAppBar
      lang={this.props.lang}
      changeLanguage={this.changeLanguage}
      pages={pages}
      className = 'hide-mobile' // Hides desktop navbar on smaller screens
      />
      <MobileTopAppBar
      lang={this.props.lang}
      changeLanguage={this.changeLanguage}
      pages={pages}
      className = 'hide-desktop'  // Hides mobile navbar om bigger screens
      />
>>>>>>> base-text-layout
      </div>
    )
  }
}

export default withRouter(Navbar);


const PosedLangSelectContainer = posed.div({
  hover: {},
  noHover: {}
});

const PosedLangSelectText = posed.div({
  hover: {x: 0,
    transition: {duration:300},
    delay:40
  },
  noHover: {x: "100%",
  transition: {duration:200},
  delay:100
},
});

const PosedLangSelectCharPoses = {
  hover: {
    opacity: 1,
    delay: ({charIndex}) => charIndex*10,
    textShadow: '0px 3px 6px rgba(0,0,0,0.2)'
  },
  noHover: {
    opacity: 0,
    delay: ({charIndex, numCharsInWord}) => (numCharsInWord - charIndex)*10,
    textShadow: '0px 0px 0px rgba(0,0,0,0)'
  }
}

// Necessesary to use forwardRef() to use posed with rmwc components
const FIcon = forwardRef((props, ref) =>
<Icon elementRef={ref} {...props}/>
);

const PosedLangSelectIcon = posed(FIcon)({
  hover: {
    scale: 1.2,
    rotate:-180,
    transition: {duration: 340},
    textShadow: '0px -3px 6px rgba(0,0,0,0.2)'
  },
  noHover: {
    scale: 1,
    rotate: 0,
    transition: {duration: 200},
    delay:100,
    textShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
});


// Desktop navbar, shows up on top with all links/buttons visible
class DesktopTopAppBar extends Component{
  constructor(props){
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {hoverLang: false};
  }

  changeLanguage(lang){
    if(this.state.hoverLang){
      this.props.changeLanguage(lang);
    }
  }

  render() {
    const toggleLangTo = (this.props.lang === 'sv' ? 'en' : 'sv');

    const hoverPose = (this.state.hoverLang) ? "hover" : "noHover";

    const pageButtons = this.props.pages.map((page) =>
      <Ripple key={page}>
        <Link to={page} className='nav-button'> {page} </Link>
      </Ripple>
    );

    return(
      <div className={this.props.className}>
        <TopAppBar fixed >
          <TopAppBarRow >
            <TopAppBarSection alignStart >
              <TopAppBarTitle >SOF19</TopAppBarTitle>
              {pageButtons}
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <PosedLangSelectContainer
                className='nav-lang-container'
                style={{cursor: this.state.hoverLang ? 'pointer' : 'initial'}}
                onClick={() => this.changeLanguage(toggleLangTo)}
                onMouseLeave={() => this.setState({hoverLang: false})}
                pose={hoverPose}
              >
                <PosedLangSelectText className='nav-lang-text' >
                  <SplitText charPoses={PosedLangSelectCharPoses}>
                    {this.props.lang === 'sv' ? 'Svenska' : 'English'}
                  </SplitText>
                </PosedLangSelectText>
                <PosedLangSelectIcon
                  className='nav-lang-icon'
                  icon='language'
                  iconOptions={{strategy: 'ligature'}}
                  onMouseEnter={() => this.setState({hoverLang: true})}
                />
              </PosedLangSelectContainer>
            </TopAppBarSection>
          </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust/>
    </div>
  );
}
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


// Mobile navbar with a hamburger menu that opens drawer with all links/buttons
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
      redirect: false,
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
    //TODO: Make site change on drawer close
    this.setState({selected: page});
    this.props.history.push(page);
    this.closeDrawer();
  };

  changeLanguage(lang){
    this.props.changeLanguage(lang);
  }

  render(){
    if(this.state.redirect){
      return <Redirect push to={this.state.selected} />;
    }

    const drawerPose = (this.state.poseOpen ? "open" : "closed");

    const toggleLangTo = (this.props.lang === 'sv' ? 'en' : 'sv');
    const pLang = this.props.lang === 'sv' ? 'Svenska' : 'English';
    const sLang = this.props.lang === 'sv' ? 'Swedish' : 'Engelska';

    //TODO: remove this.state.page and use this.props.location.pathname from react-router-dom
    const pageListItems = this.props.pages.map((page) =>
      <PosedListItem pose = {drawerPose}>
        <ListItem
          pose = {drawerPose}
          className={(this.state.selected === page ? "list-selected list-centered" :
            "mdc-ripple-upgraded list-centered")}
          ripple={(this.state.selected ===page ? false : true)}
          key={page}
          onClick={() => this.pressListLink(page)}
        >
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
              <SimpleListItem
                text={pLang}
                secondaryText={sLang}
                meta="language"
                onClick={ () => this.changeLanguage(toggleLangTo)}
              />
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
              <TopAppBarNavigationIcon
                icon="menu"
                onClick={() => this.setState({drawerOpen: true})}
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>

    </div>
  );
};
}
