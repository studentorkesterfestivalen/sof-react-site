import React, { Component } from 'react';

// import HighlightedArea from '../components/HighlightedArea';
import OrchestraMemReg from '../components/OrchestraMemReg';

// import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
// import { Button } from '@rmwc/button';

// import { Link } from 'react-router-dom';

// import { ListDivider } from '@rmwc/list';

// import { SimpleDataTable } from '@rmwc/data-table';

import {connect} from 'react-redux';

class OrchestraSignup extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  render() {
    console.log(this.props.match);

    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          <OrchestraMemReg code={this.props.match}/>
        </GridCell>
      </GridInner>
    );
  }
}

export default connect()(OrchestraSignup);

