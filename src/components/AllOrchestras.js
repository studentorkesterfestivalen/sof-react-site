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


class AllOrchestras extends Component{

  componentDidMount() {
    const { orchestras } = this.props;
    if (!orchestras) {
      this.props.dispatch(fetchOrchestras());
    } 
  }

  handleClick = (id) => {

  }

  render(){

    const orchestras = [
      { 
        'name': 'Eric',
        'id': 0
      },
       {
         'name': 'Eric',
          'id': 1
        }
      ]
    

    const { loading, error } = this.props;
    let content;
    if (loading) {
      content = <CircularProgress size="xlarge" />
    } else if (!error) {
      content = <div>Error!</div>
    } else {
      content = <List>{orchestras.map( orchestra => {
        console.log(orchestra)
        return <ListItem tag={Link} to={`/orchestra/${orchestra.id}`} key={orchestra.id}>{orchestra.name}</ListItem> }
        )}</List>
    }
    return(
      <React.Fragment>
        {content}
        <Route path={'/orchestra/:id'} component={Login} />
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

  