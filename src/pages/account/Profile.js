import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import {connect} from 'react-redux';
import { setTitle } from '../../actions/title';
import { getUserUuid } from '../../api/userCalls';

import QRCode from "qrcode.react";


const mapStateToProps = state => ({
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
});

class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {uuid: null, dialogOpen: false}
  }
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount() {
    this.props.dispatch(setTitle('Account.profileTitle'));
    getUserUuid()
    .then( response =>{
      console.log(response);
      this.setState({uuid: response.data.uuid});
    })
  }


  render() {
    return(
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              {this.state.uuid ?
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#FF0000"
                    level="Q"
                    className='user-code'
                    size='256'
                    value={this.state.uuid}
                    renderAs={"canvas"}
                  />
                  :
                  <CircularProgress size="xlarge" />
              }
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h4 style={{margin: '0'}}> {this.props.name} </h4>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <FormattedMessage id='Account.welcomeToProfile'/>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={evt => this.setState({dialogOpen: !this.state.dialogOpen})} >
                <FormattedMessage id='Account.editProfile' />
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={evt => this.setState({dialogOpen: !this.state.dialogOpen})}>
                <FormattedMessage id='Account.changePass'/>
              </Button>
              <Dialog
                open={this.state.dialogOpen}
                onClose={evt => {
                  console.log(evt.detail.action)
                  this.setState({dialogOpen: false})
                }}
               >
                <DialogTitle>
                  <FormattedMessage id='Account.sorry'/>
                </DialogTitle>
                <DialogContent>
                  <FormattedMessage id='Account.notImplemented'/>
                </DialogContent>
                <DialogActions>
                  <DialogButton action="close">Ok</DialogButton>
                  {// <DialogButton action="accept" isDefaultAction>Sweet!</DialogButton>
                  }
                </DialogActions>
              </Dialog>
             </GridCell>

          </GridInner>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Profile));
