import React, { Component } from 'react';

import { connect } from "react-redux";
import { fetchSignUps } from "../actions/orchestraSignups";
import { CircularProgress } from '@rmwc/circular-progress';

import {
  List,
  ListItem
} from '@rmwc/list';


class AllOrchestras extends Component{

  componentDidMount() {
    const { id } = this.props.match.params;
    const { orchestraSignups } = this.props;
    if (!orchestraSignups.find( (signups) => {
      return signups.id === id;
    })) {
      this.props.dispatch(fetchSignUps(id));
    } 
  }

  render(){

    const orchestraSignups = [
      { 
        'name': 'Eric',
        'id': 0
      },
       {
         'name': 'Eric',
          'id': 1
        }
      ]
    
    const { loading, error,
    //  orchestraSignups
     } = this.props;
    let content;
    if (loading) {
      content = <CircularProgress size="xlarge" />
    } else if (!error) {
      content = <div>Error!</div>
    } else {
      content = <List>{orchestraSignups.map( signup => {
        console.log(signup)
        return <ListItem key={signup.id}>{signup.name}</ListItem> }
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
  //orchestras: state.orchestras.orchestras,
  orchestraSignups: state.orchestras.orchestraSignups,
  loading: state.orchestras.loading,
  error: state.orchestras.error
});

export default connect(mapStateToProps)(AllOrchestras);

  