import React, { Component, forwardRef } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

class HighlightedArea extends Component {

  render(){
    return(
      <React.Fragment>
        <Grid className='highlighted-area' >
          <GridInner className={['highlighted-area-inner', this.props.className].join(' ')}>
            {this.props.children}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default HighlightedArea;
