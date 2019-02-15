import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import {connect} from 'react-redux';

class UNCOrchestra extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  render() {

    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        </GridCell>
      </GridInner>
    );
  }
}

export const Orchestra =  connect()(UNCOrchestra);

class UNCOrchestraSignup extends Component{
  render() {

    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          Name of orchestra
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

        </GridCell>
      </GridInner>
    );
  }
}

export const OrchestraSignup =  connect()(UNCOrchestraSignup);
