import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import OrchestraCreation from '../components/OrchestraCreation';
import AllOrchestras from '../components/AllOrchestras';

import PermissionsModifier from '../components/PermissionsModifier';

import { FormattedMessage } from 'react-intl'

class Orchestra extends Component{

  static pageTitle(){
    return <FormattedMessage id='Orchestra.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Orchestra.navTitle' />
  }

  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          {/* <GridInner>
             <GridCell phone="4" tablet="8" desktop='12'> */}
              { /*  <OrchestraCreation />  */ }
               <PermissionsModifier /> 
              { /* <AllOrchestras/>        */ }
            { /* </GridCell>
           </GridInner> */ }
        </Grid>
      </React.Fragment>
    );
  }
}

export default Orchestra;
