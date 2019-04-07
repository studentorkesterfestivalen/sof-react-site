import React, { forwardRef } from 'react';

import {DesktopAccountPopup, MobileAccountPopup} from './account/AccountPopup';

import { withRouter, Redirect } from 'react-router-dom';

import ScrollLock from 'react-scrolllock';

import posed from 'react-pose';

import SplitText from 'react-pose-text';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
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
/*const pages = [
  //{label:'Kårtege', ref: [
  {label: 'Kårtege - Info', ref: '/'},
  {label: 'Kårtege - Ansökan', ref: '/cortege-registration'},
  //},
  {label: 'Om SOF', ref: '/about'},
  {label: 'Kontakt', ref: '/contact'},
  {label: 'Historia', ref: '/history'}];
*/
class Navbar extends React.PureComponent{
  constructor(props){
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(){
    this.props.changeLanguage()
  }

  render(){
    return(
      <div className={this.props.className}>
        <DesktopTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={this.props.pages}
          className = 'hide-mobile-tablet' // Hides desktop navbar on smaller screens
          {...this.props}
        />
        <MobileTopAppBar
          lang={this.props.lang}
          changeLanguage={this.changeLanguage}
          pages={this.props.pages}
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
    scale: 1.1,
    transition: {duration: 340},
  },
  noHover: {
    scale: 1,
    transition: {duration: 200},
    delay:100,
  },
  });


// Desktop navbar, shows up on top with all links/buttons visible
class DesktopTopAppBar extends React.PureComponent{
  constructor(props){
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {hoverLang: false};
}  

  changeLanguage(){
    if(this.state.hoverLang){
      this.props.changeLanguage();
    }
  }

  render() {
    const hoverPose = (this.state.hoverLang) ? "hover" : "noHover";

    const pageButtons = Object.keys(this.props.pages).map((key) =>
      <Ripple key={key}>
        <div
          className='nav-button'
          onClick={() => this.props.history.push(key)}
        >
          {this.props.pages[key].pageNavTitle()}
        </div>
      </Ripple>
    );

    const languageIconUrl = (this.props.lang === 'sv') ? 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/navbar/sof_heart_swe.svg' : 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/navbar/sof_heart_eng.svg'

    return(
      <div className={this.props.className}>
        <TopAppBar fixed >
          <TopAppBarRow >
            <TopAppBarSection alignStart >
              <TopAppBarTitle
                className='v-center'
                style={{paddingLeft: '0', paddingRight: '32px', margin: '0'}}
              >
                <img
                  src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/sof19_logo.png'
                  alt='SOF19'
                  style={{width: '200px', cursor: 'pointer'}}
                  onClick={() => this.props.history.push('/')}
                />
              </TopAppBarTitle>
              {pageButtons}
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <DesktopAccountPopup/>
              <Ripple disabled={!this.state.hoverLang}>
                <PosedLangSelectContainer
                  className='nav-lang-container'
                  style={{cursor: this.state.hoverLang ? 'pointer' : 'initial'}}
                  onClick={() => this.changeLanguage()}
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
                    icon={languageIconUrl}
                    iconOptions={{strategy: 'url'}}
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
class MobileTopAppBar extends React.PureComponent{
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

  changeLanguage(){
    this.props.changeLanguage();
  }

  render(){
    if(this.state.redirect){
      return <Redirect push to={this.state.selected} />;
    }

    const drawerPose = (this.state.poseOpen ? "open" : "closed");
    const pLang = this.props.lang === 'sv' ? 'Svenska' : 'English';
    const sLang = this.props.lang === 'sv' ? 'Swedish' : 'Engelska';

    const flexgrow = {display: 'flex', flexDirection: 'column', flexGrow: '1'};
    const flexgrow2 = {display: 'flex', flexDirection: 'column', flexGrow: '2'};


    const pageListItems = Object.keys(this.props.pages).map((key) =>
      <PosedListItem pose = {drawerPose} style={flexgrow2} key={key}>
        <ListItem
          pose = {drawerPose}
          className={(this.props.location.pathname === key? "list-selected list-centered mdc-item-only-hover" :
            "mdc-ripple-upgraded list-centered mdc-item-only-hover")}
          ripple={(this.props.location.pathname === key ? false : true)}
          key={key}
          onClick={() => this.pressListLink(key)}
        >
          {this.props.pages[key].pageNavTitle()}
        </ListItem>
      </PosedListItem>
    );

    const {className} = this.props;

    let stopScroll;
    if (this.state.poseOpen || this.state.drawerOpen){
      stopScroll = <ScrollLock accountForScrollbars={false}/>;
    }

    const languageIconUrl = (this.props.lang === 'sv') ? 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/navbar/sof_heart_swe.svg' : 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/navbar/sof_heart_eng.svg'

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
                  className='nav-language-list-item mdc-item-only-hover'
                  text={pLang}
                  secondaryText={sLang}
                  meta={languageIconUrl}
                  onClick={ () => this.changeLanguage()}
                />
              </PosedListItem>
            </List>
          </PosedDrawerContent>
        </Drawer>

        <TopAppBar fixed >
          <TopAppBarRow>
            <TopAppBarSection alignStart >
              <TopAppBarTitle className='v-center' style={{padding: '0'}}>
                <img
                  src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/sof19_logo.png'
                  alt='SOF19'
                  style={{width: '160px', cursor: 'pointer'}}
                  onClick={() => this.props.history.push('/')}
                />
              </TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd >
              <MobileAccountPopup/>
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
