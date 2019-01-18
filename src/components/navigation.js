import React, { Component, forwardRef } from 'react';

import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';

import { Link, withRouter, Redirect } from 'react-router-dom';

import ScrollLock from 'react-scrolllock';

import posed from 'react-pose';

import SplitText from 'react-pose-text';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
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
  SimpleListItem,
  ListItem,
} from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { Icon } from '@rmwc/icon';

// TODO: Temporary, replace with actual pages
const pages = [
  //{label:'Kårtege', ref: [
  {label: 'Kårtege - Info', ref: '/'},
  {label: 'Kårtege - Ansökan', ref: '/cortege-registration'},
  //}, 
  {label: 'Om SOF', ref: '/about'},
  {label: 'Kontakt', ref: '/contact'}];

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
      <div className={this.props.className}>
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
      </div>
    )
  }
}

export default withRouter(Navbar);


const PosedLangSelectContainer = posed.div({
  hover: {
    background: 'rgba(0,0,0,0.06)',
    transition: {delay: 250},
  },
  noHover: {background: 'rgba(0,0,0,0)'}
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
  },
  noHover: {
    opacity: 0,
    delay: ({charIndex, numCharsInWord}) => (numCharsInWord - charIndex)*10,
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
  },
  noHover: {
    scale: 1,
    rotate: 0,
    transition: {duration: 200},
    delay:100,
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
      <Ripple key={page.ref}>
        <Link 
          to={page.ref} 
          className='nav-button mdc-item-only-hover'
        >
          {page.label} 
        </Link>
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
              <Ripple disabled={!this.state.hoverLang}>
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
              </Ripple>
            </TopAppBarSection>
          </TopAppBarRow>
      </TopAppBar>
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
    this.changeLinkOnClose = this.changeLinkOnClose.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {drawerOpen: false,
      poseOpen:false,
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
    this.nextPage = page;
    this.closeDrawer();
  };

  changeLinkOnClose() {
    this.setState({drawerOpen:false, poseOpen: false});
    this.props.history.push(this.nextPage);
  }

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

    const flexgrow = {display: 'flex', flexDirection: 'column', flexGrow: '1'};
    const flexgrow2 = {display: 'flex', flexDirection: 'column', flexGrow: '2'};


    const pageListItems = this.props.pages.map((page) =>
      <PosedListItem pose = {drawerPose} style={flexgrow2} key={page.ref}>
        <ListItem
          pose = {drawerPose}
          className={(this.props.location.pathname === page.ref ? "list-selected list-centered" :
            "mdc-ripple-upgraded list-centered")}
          ripple={(this.props.location.pathname === page.ref ? false : true)}
          key={page.label}
          onClick={() => this.pressListLink(page.ref)}
        >
          {page.label}
        </ListItem>
      </PosedListItem>
    );

    const {className} = this.props;

    let stopScroll;
    if (this.state.drawerOpen){
      stopScroll = <ScrollLock/>;
    }
  
    return(
      <div className={className}>
        <Drawer
          className='nav-drawer'
          dir="rtl"
          modal
          open={this.state.drawerOpen}
          onClose={() => this.changeLinkOnClose()}
          onOpen={() => this.setState({drawerOpen: true, poseOpen: true})}
        >
          {stopScroll}
          <PosedDrawerContent pose={drawerPose} dir="ltr">
            <List>
              {pageListItems}

              <PosedListItem>
                <ListDivider/>
              </PosedListItem>

              <PosedListItem style={flexgrow} dir="ltr"p pose={drawerPose}>
                <SimpleListItem
                  text={pLang} 
                  secondaryText={sLang}
                  meta="language"
                  onClick={ () => this.changeLanguage(toggleLangTo)}
                />
              </PosedListItem>
            </List>
          </PosedDrawerContent>
        </Drawer>

        <TopAppBar fixed >
          <TopAppBarRow>
            <TopAppBarSection alignStart >
              <TopAppBarTitle >SOF19</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <TopAppBarNavigationIcon
                icon="menu"
                onClick={() => this.openDrawer()}
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>

    </div>
  );
};
}
