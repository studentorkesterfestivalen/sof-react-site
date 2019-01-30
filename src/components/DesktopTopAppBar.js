import React, { forwardRef } from 'react';
import { PropTypes, func } from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollLock from 'react-scrolllock';

import posed from 'react-pose';

import SplitText from 'react-pose-text';
import { setLocale } from '../actions/locale';
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

import { Ripple } from '@rmwc/ripple';

import { Icon } from '@rmwc/icon';


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

export default DesktopTopAppBar;
  