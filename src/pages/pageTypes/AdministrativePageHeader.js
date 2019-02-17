import React, { Component } from 'react';

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { TabBar, Tab } from '@rmwc/tabs';
import { ThemeProvider } from '@rmwc/theme';

import { Switch, Route, Link } from 'react-router-dom'

import posed from 'react-pose';

const PosedHeaderTitle = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

const PosedHeaderImage= posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0 }
});

export default class AdministrativePageHeader extends Component{

  render() {
    var imageClass = '';
    if(this.props.color === 'Red'){
      imageClass = 'base-page-header-image base-page-header-red';
    } else if (this.props.color === 'Yellow'){
      imageClass = 'base-page-header-image base-page-header-yellow';
    } else{
      imageClass = 'base-page-header-image';
    }
    return(
      <React.Fragment>
        <div className='administrative-page-header'>
          <TopAppBarFixedAdjust/>
          <PosedHeaderImage className={imageClass}>
            <img 
              async='on'
              className='base-page-header-image-left-dots hide-mobile' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            />
            <img 
              async='on'
              className='base-page-header-image-right-dots hide-mobile' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            />
          </PosedHeaderImage>
          <PosedHeaderTitle className='base-page-header-content'>
            <ThemeProvider 
              className='hide-desktop'
              style={{width: '100%'}}
              options={{
                primary: 'white',
            }}>
              <TabBar
                style={{width: '100%'}}
                className='administrative-tabs'
              >
                <Tab tag={Link} to='/account/profile'> Profil </Tab>
                <Tab tag={Link} to='/account/orchestra'> Orkester </Tab>
                <Tab tag={Link} to='/account/admin'> Admin </Tab>
              </TabBar>
            </ThemeProvider>
            <div className='administrative-page-header-title hide-mobile'>
              <h1 className='hide-mobile'>
                {this.props.title}
              </h1>
            </div>
          </PosedHeaderTitle>
        </div>
      </React.Fragment>
    );
  }
}