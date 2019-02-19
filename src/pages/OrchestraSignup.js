import React, { Component } from 'react';

// import HighlightedArea from '../components/HighlightedArea';
import OrchestraMemReg from '../components/OrchestraMemReg';
import PermissionsModifier from '../components/PermissionsModifier';
import GetUser from '../components/GetUser';
// import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { CircularProgress } from '@rmwc/circular-progress';

// import { Button } from '@rmwc/button';

// import { Link } from 'react-router-dom';

// import { ListDivider } from '@rmwc/list';

// import { SimpleDataTable } from '@rmwc/data-table';

import { fetchSignupOrchestra } from '../actions/orchestraSignups'
import { Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

class OrchestraSignup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      failedFetchCode: false,
    }
  }

  componentDidMount() {
    const { signupOrchestra, loading } = this.props;
    const code = this.props.match.params.id;
    
    if (!signupOrchestra && !loading) {
      this.props.dispatch(fetchSignupOrchestra(code))
        .then((res) => {
          if(res){ //Returns something on fail
            this.setState({ failedFetchCode: true });
          }
        })
    } else if(!loading){
      if(signupOrchestra.code !== code){
        this.setState({ failedFetchCode: true });
      } 
    }
  }

  render() {
    const {signupOrchestra, loading } = this.props;

    if(this.state.failedFetchCode){
      return <Redirect to={{pathname: '/account/orchestra/', error: 'Invalid code, please enter a valid code'}} />
    }

    if(loading || !signupOrchestra){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      )
    }
    

    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          Du försöker registrera dig på orkerstern {signupOrchestra.name}
        </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
        {/*  <PermissionsModifier/> */ }
          {/* <GetUser/> */}
          <OrchestraMemReg code={this.props.match.params.id}/> 
        </GridCell>
      </GridInner>
    );
  }
}

const mapStateToProps = state => ({
  signupOrchestra : state.orchestras.signupOrchestra,
  loading: state.orchestras.loading,
});

export default connect(mapStateToProps)(OrchestraSignup);
