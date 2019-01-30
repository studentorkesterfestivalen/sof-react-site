import React, { forwardRef } from 'react';
import { Redirect } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';

import posed from 'react-pose';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
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

export default MobileTopAppBar;