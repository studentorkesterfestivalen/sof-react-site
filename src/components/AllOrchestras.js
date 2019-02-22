import React, { Component } from 'react';
import { Grid, GridInner } from '@rmwc/grid';

import { connect } from "react-redux";
import { fetchOrchestras } from "../actions/orchestras";
import { CircularProgress } from '@rmwc/circular-progress';
import { Route, Link } from "react-router-dom";
import Login from './Login';

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';


import {
  List,
  ListItem
} from '@rmwc/list';

import AllSignups from './AllSignups';

const orchestraTypes = {
  0: 'Orkester',
  1: 'Band',
};

class AllOrchestras extends Component{

  componentDidMount() {
    this.props.dispatch(fetchOrchestras());
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
      content = (
        <DataTable style={{width: '100%'}}>
          <DataTableContent style={{width: '100%'}}>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Namn</DataTableHeadCell>
                <DataTableHeadCell
                  >
                  Typ
                </DataTableHeadCell>
                <DataTableHeadCell
                  >
                  Datum
                </DataTableHeadCell>
                <DataTableHeadCell
                >
                  Kod
                </DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
          {Object.keys(orchestras.list).map( key => {
            const orchestra = orchestras.list[key];

            return (
              <DataTableRow key={orchestra.id}>
                <DataTableCell>{orchestra.name}</DataTableCell>
                <DataTableCell>{orchestraTypes[orchestra.orchestra_type]}</DataTableCell>
                <DataTableCell>{orchestra.created_at}</DataTableCell>
                <DataTableCell>{orchestra.code}</DataTableCell>
              {/*<ListItem tag={Link} to={`/account/admin/orchestras/${orchestra.id}`} key={orchestra.id}>{orchestra.name}</ListItem> */}
              </DataTableRow>
            );
          })}
          </DataTableBody>
          </DataTableContent>
        </DataTable>
      )}
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

export default connect(mapStateToProps,)(AllOrchestras);
