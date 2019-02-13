import React, { Component } from 'react';
import { Grid, GridInner } from '@rmwc/grid';

import { connect } from "react-redux";
import { fetchOrchestras } from "../actions/orchestras";
import { CircularProgress } from '@rmwc/circular-progress';
import { Route, Link } from "react-router-dom";
import Login from './Login';


import {
  List,
  ListItem
} from '@rmwc/list';
import AllSignups from './AllSignups';


class AllOrchestras extends Component{

  componentDidMount() {
    const { orchestras } = this.props;
    if (!orchestras) {
      this.props.dispatch(fetchOrchestras());
    }
  }

  render(){

    const { loading, error, orchestras } = this.props;
    let content;
    if (loading) {
      content = <CircularProgress size="xlarge" />
    } else if (error || !orchestras) {
      console.log("ERROR: " + error);
      content = <div>Error!</div>
    } else {
      content = <List>{Object.keys(orchestras).map( key => {
        const orchestra = orchestras[key];
        console.log("ork: " + orchestra);

        return <ListItem tag={Link} to={`/account/admin/orchestras/${orchestra.id}`} key={orchestra.id}>{orchestra.name}</ListItem> }
        )}</List>
    }
    return(
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orchestras: state.orchestras.orchestras,
  orchestraSignups: state.orchestras.orchestraSignups,
  loading: state.orchestras.loading,
  error: state.orchestras.error
});

export default connect(mapStateToProps)(AllOrchestras);
