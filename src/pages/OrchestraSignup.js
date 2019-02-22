import React, { Component } from 'react';

// import HighlightedArea from '../components/HighlightedArea';
import OrchestraMemReg from '../components/OrchestraMemReg';
import OrchestraMemRegShort from '../components/OrchestraMemRegShort';
// import { FormattedMessage, injectIntl } from 'react-intl'

import {  GridCell, GridInner } from '@rmwc/grid';
import { CircularProgress } from '@rmwc/circular-progress';


import { injectIntl } from 'react-intl';

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
      successRegister: false,
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

  successRegister = (res) =>{
    this.setState({successRegister: true});
  }

  render() {
    const {signupOrchestra, loading } = this.props;

    if(this.state.successRegister){
      return <Redirect to={{pathname: '/account/orchestra/',
        message: this.props.intl.formatMessage({id: 'Orchestra.successReg1'})
        + signupOrchestra.orchestra.name 
        + this.props.intl.formatMessage({id: 'Orchestra.successReg2'}),
      }} />
    }

    if(this.state.failedFetchCode){
      return <Redirect to={{pathname: '/account/orchestra/', 
        message: this.props.intl.formatMessage({id: 'Orchestra.invalidCode'}),
      }} />
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
    const firstSignup = signupOrchestra.first_signup;
    const MemRegType = firstSignup ? OrchestraMemReg : OrchestraMemRegShort;

    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5>Du försöker registrera dig på orkerstern <b>{signupOrchestra.orchestra.name}</b> </h5>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          <MemRegType successCallback={this.successRegister} code={this.props.match.params.id}/> 
        </GridCell>
      </GridInner>
    );
  }
}

const mapStateToProps = state => ({
  signupOrchestra : state.orchestras.signupOrchestra,
  loading: state.orchestras.loading,
});

export default injectIntl(connect(mapStateToProps)(OrchestraSignup));
