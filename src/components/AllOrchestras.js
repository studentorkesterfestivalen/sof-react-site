import React, { Component } from 'react';
import { Grid, GridInner } from '@rmwc/grid';

import { connect } from "react-redux";
import { fetchOrchestras } from "../actions/orchestras";
import { fetchSignUps } from "../actions/orchestraSignups";


class AllOrchestras extends Component{

  componentDidMount() {
    this.props.dispatch(fetchOrchestras());
    this.props.dispatch(fetchSignUps(1));
  }

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orchestras: state.orchestras.orchestras,
  loading: state.orchestras.loading,
  error: state.orchestras.error
});

export default connect(mapStateToProps)(AllOrchestras);

  