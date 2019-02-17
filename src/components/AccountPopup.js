import React, { Component } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { signOutUser } from '../redux-token-auth-config' 

import { setAccountPopupOpen } from '../actions/login';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenu, SimpleMenuSurface } from '@rmwc/menu';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import posed from 'react-pose';

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  isOpen: state.login.accountPopupOpen,
});

class UNCDesktopAccountPopup extends React.PureComponent {

  setPopupState = (state) => {
    this.props.setAccountPopupOpen(state);
  }

  render(){

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.props.isOpen}
        //onOpen={()=>this.setPopupState(true)}
        //onClose={()=>this.setPopupState(false)}
        handle={<TopAppBarActionItem> account_circle </TopAppBarActionItem>}
      >
        <LoginContent {...this.props}/>
      </SimpleMenuSurface>
    );
  }
}
export const DesktopAccountPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser}) (UNCDesktopAccountPopup));

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

export class UNCMobileAccountPopup extends Component {

  setPopupState = (state) => {
    this.props.setAccountPopupOpen(state);
  }

  render(){
    return(
      <React.Fragment>
        <Button
          onClick={()=>this.setPopupState(true)}
        >
          Open
        </Button>
          <ScrollLock isActive={this.props.isOpen}/>
          <TouchScrollable>
            <MobileAccountModal
              className='mobile-account-modal'
              pose={this.props.isOpen ? 'open' : 'closed'}
            >
              <LoginContent {...this.props}/>
            </MobileAccountModal>
          </TouchScrollable>
        <MobileAccountScrim
          className='mobile-account-scrim'
          pose={this.props.isOpen ? 'open' : 'closed'}
          onClick={() => this.setPopupState(false)}
        />
      </React.Fragment>
    );
  }
}
export const MobileAccountPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCMobileAccountPopup));

class UNCLoginContent extends Component{
  constructor(props){
    super(props)

    this.state = {register: false, regEmail: "", regPass: ""}
  }

  handleClickRegFromLogin = (email, password) => {
    this.setState({register: true, regEmail: email, regPass: password});
  };


  render(){
    var content = <LoginForm from={this.props.from} handleRegister={(email, password) => this.handleClickRegFromLogin(email, password)}/>;
    if(this.props.loggedIn && !this.props.from){
      content = <Account {...this.props}/>;
    } else if(this.props.loggedIn && this.props.from){
      content = <Redirect to={this.props.from} />
    } else if(this.state.register){
      content = <RegisterForm/>;
    }

    var logInBar = null
    
    if(!this.props.loggedIn && !this.state.register){
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
    } else if(!this.props.loggedIn && this.state.register){
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

export const LoginContent = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCLoginContent));

class UNCAccount extends Component{

  handleClickProfile = () => {
    this.props.history.push('/account/profile');
    this.props.setAccountPopupOpen(false);
  }

  handleLogout = () => {
    this.props.signOutUser()
      .then( (response) => {
      }).catch( (error) => {
      });
  }

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
              <h4 style={{margin: '0'}}> {this.props.name} </h4>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={() => this.handleClickProfile()}> 
                Min profil
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={() => this.handleLogout()}> 
                Logga ut
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}
export const Account = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCAccount));
