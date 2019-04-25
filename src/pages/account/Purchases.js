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

import QRCode from "qrcode.react";


const mapStateToProps = state => ({
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
});

class Purchases extends Component{

  constructor(props) {
    super(props);
  }

  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Dina köp";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount(){
    this.props.dispatch(setTitle('Account.purchases'));
  }
  

  render() {
    return(
      <GridInner>
      </GridInner>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Purchases));
