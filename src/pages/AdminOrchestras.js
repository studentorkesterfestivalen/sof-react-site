import React, { Component } from 'react';

import AllOrchestras from '../components/AllOrchestras';
import OrchestraCreation from '../components/OrchestraCreation';
import GetUser from '../components/GetUser';


import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { Card, CardPrimaryAction } from '@rmwc/card';

import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
 

class Orchestras extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  render() {
    return(
      <GridInner>
        {this.props.location.state ?
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin: '0px'}}> {this.props.location.state.message} </h5>
          </GridCell> : null
        }
        <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
          <Button raised onClick={() => this.props.history.push('/account/admin/orchestras/new')}> Skapa ny orkester</Button>
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
          <Button raised onClick={() => this.props.history.push('/account/admin/signup')}> Hitta användare</Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <AllOrchestras/>
        </GridCell>
      </GridInner>
    );
  }
}

export default withRouter(connect()(Orchestras));

class UNCOrchestraNew extends Component{

  render(){
    return(
      <React.Fragment>
        <OrchestraCreation/>
      </React.Fragment>
    );
  }
}

export const OrchestraNew = withRouter(UNCOrchestraNew);

class UNCOrchestraFindMember extends Component{
  constructor(props){
    super(props);

    this.state = {user: null}
  }

  getUserCallback = (user) =>{
    this.setState({user: user});
  }

  render(){

    
    const orchestra_list = this.state.user ? (
      this.state.user.orchestra_signup.map( (orch) => (
        <GridCell desktop='12' tablet='8' phone='4' key={orch.id}>
          <SimpleSignupCard name={orch.orchestra.name} id={orch.id}/>
        </GridCell>
      ))
    ): null;

    const orchestraInfo = this.state.user ? (
      <React.Fragment>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <ListDivider style={{width: '100%'}}/>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h4 style={{margin: '0px'}}> {this.state.user.name}'s orkestrar </h4>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <GridInner style={{width: '100%'}}>
            {orchestra_list}
          </GridInner>
        </GridCell>
      </React.Fragment>
    ) : null

    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <GetUser getUserCallback={this.getUserCallback}/>
          </GridCell>
          {orchestraInfo}
        </GridInner>
      </React.Fragment>
    )
  }

}

export const OrchestraFindMember = withRouter(UNCOrchestraFindMember);

const UNCSimpleSignupCard = (props) => {
  return (
    <Card style={{ width: '100%' }}>
      <CardPrimaryAction onClick={() => props.history.push('/account/admin/signup/' + props.id)}>
        <div >
          <h5> {props.name} </h5>
        </div>
      </CardPrimaryAction>
    </Card>
  )
}

const SimpleSignupCard = withRouter(UNCSimpleSignupCard);

class UNCOrchestraSignup extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            Hi
          </GridCell>
        </GridInner>
      </React.Fragment>
    )
  }

}

export const OrchestraSignup = withRouter(UNCOrchestraSignup);
