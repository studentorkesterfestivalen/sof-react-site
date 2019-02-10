import React, { Component } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenu, SimpleMenuSurface } from '@rmwc/menu';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import posed from 'react-pose';

export class DesktopAccountPopup extends Component {
  constructor(props){
    super(props)

    this.state = {open: false}
  }
  render(){

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.state.open}
        onOpen={()=>this.setState({open: true})}
        onClose={()=>this.setState({open: false})}
        handle={<TopAppBarActionItem> account_circle </TopAppBarActionItem>}
      >
        <AccountPopupContent/>
      </SimpleMenuSurface>
    );
  }
}

const MobileAccountModal = posed.div({
  open:{
    height: 'auto',
    applyAtEnd: {overflow: 'auto'},
  },
  closed:{
    height: '0',
    applyAtStart: {overflow: 'hidden'},
  }
});

const MobileAccountScrim = posed.div({
  open:{
    opacity: 1,
    applyAtStart: {display: 'initial'},
  },
  closed:{
    opacity: 0,
    applyAtEnd: {display: 'none'},
  }
});

export class MobileAccountPopup extends Component {
  constructor(props){
    super(props)

    this.state = {open: false}
  }
  render(){

    return(
      <React.Fragment>
        <Button
          onClick={()=>this.setState({open: true})}
        >
          Open
        </Button>
          <ScrollLock isActive={this.state.open}/>
          <TouchScrollable>
            <MobileAccountModal
              className='mobile-account-modal'
              pose={this.state.open ? 'open' : 'closed'}
            >
              <AccountPopupContent/>
            </MobileAccountModal>
          </TouchScrollable>
        <MobileAccountScrim
          className='mobile-account-scrim'
          pose={this.state.open ? 'open' : 'closed'}
          onClick={() => this.setState({open: false})}
        />
      </React.Fragment>
    );
  }

}

class AccountPopupContent extends Component{
  constructor(props){
    super(props)

    this.state = {loggedIn: false, register: false, regEmail: "", regPass: ""}
  }

  handleClickRegFromLogin = (email, password) => {
    this.setState({register: true, regEmail: email, regPass: password});
  };

  render(){
    var content = <LoginForm handleRegister={(email, password) => this.handleClickRegFromLogin(email, password)}/>;
    if(this.state.loggedIn){
      content = <Account/>;
    } else if(this.state.register){
      content = <RegisterForm/>;
    }

    var logInBar = null
    
    if(!this.state.loggedIn && !this.state.register){
      logInBar = (
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                Logga in
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                  <ListDivider/>
              </GridCell>
            </GridInner>
        </Grid>
      );
    } else if(!this.state.loggedIn && this.state.register){
      logInBar = (
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <Button
                  style={{width: '10%', justifySelf: 'flex-start'}}
                  onClick={()=>this.setState({register: false})}
                >
                  Back
                </Button>
                Registrera dig
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                  <ListDivider/>
              </GridCell>
            </GridInner>
        </Grid>
      );
    }

    return(
      <React.Fragment>
        {logInBar}
        {content}
      </React.Fragment>
    );
  }

}

class Account extends Component{

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <div
                className='account-popup-image' 
                style={{ backgroundImage: 'url(' + 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-homepage/logos/sof_favicon.png' + ')'}}
              />
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h4 style={{margin: '0'}}> Anton Gefvert </h4>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised > 
                Min profil
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised > 
                Logga ut
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}
