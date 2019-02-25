import React, { Component } from 'react';

import AllOrchestras from '../components/AllOrchestras';
import OrchestraCreation from '../components/OrchestraCreation';

import HighlightedArea from '../components/HighlightedArea';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { withRouter } from 'react-router-dom';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';

import {connect} from 'react-redux';

class Orchestras extends Component{
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
        {this.props.location.state ?
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin: '0px'}}> {this.props.location.state.message} </h5>
          </GridCell> : null
        }
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <Button raised onClick={() => this.props.history.push('/account/admin/orchestras/new')}> Skapa ny </Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <AllOrchestras/>
        </GridCell>
      </GridInner>
    );
  }
}

export default withRouter(connect()(Orchestras));

class UNCOrchestra extends Component{

  render(){
    return(
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export const Orchestra = withRouter(UNCOrchestra);

class UNCOrchestraNew extends Component{

  render(){
    return(
      <React.Fragment>
        <OrchestraCreation/>
      </React.Fragment>
    );
  }
}

export const OrchestraNew = withRouter(UNCOrchestraNew);
