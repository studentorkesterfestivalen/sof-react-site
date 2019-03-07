import React, { Component } from 'react';

import AllOrchestras from '../components/AllOrchestras';
import OrchestraCreation from '../components/OrchestraCreation';
import GetUser from '../components/GetUser';
import OrchestraMemReg from '../components/OrchestraMemReg';
import OrchestraMemRegShort from '../components/OrchestraMemRegShort';

import { getOrchestraSignup, deleteOrchestraSignup, updateOrchestraSignup } from '../api/orchestraCalls';
import { getUser } from '../api/userCalls';
import { openDialog} from '../actions/dialog';


import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { Card, CardPrimaryAction } from '@rmwc/card';
import { SimpleDataTable } from '@rmwc/data-table';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
 

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
          <Button raised style={{width: '100%'}}
            onClick={() => this.props.history.push('/account/admin/orchestras/new')}
          > 
            Skapa ny orkester
          </Button>
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
          <Button raised style={{width: '100%'}}
            onClick={() => this.props.history.push('/account/admin/signup')}
          > 
            Hitta användare
          </Button>
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

function articleCompare(a, b) {
  if (a.kind < b.kind) {
    return -1;
  }
  if (a.kind > b.kind) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

class UNCOrchestraSignup extends Component{
  constructor(props){
    super(props);

    this.state = {error: null, signup: null, user:null, deleteDialog: false}
  }


  componentDidMount(){
    getOrchestraSignup(this.props.match.params.id)
      .then( response =>{
        this.setState({signup: response.data})
        getUser(response.data.user_id)
          .then( response => {
            this.setState({user: response.data})
          })
          .catch( error =>{
            this.setState({error: "" + error})
          })
      })
      .catch( error => {
        this.setState({error: "" + error})
      })
  }

  deleteSignup = () => {
    deleteOrchestraSignup(this.state.signup.id)
      .then( response => {
        this.props.history.goBack();
        this.props.openDialog(
          'Registrering borttagen!',
          this.state.user.email + "'s registrering till " + this.state.signup.orchestra.name + ' har tagits bort'
        );
      })
      .catch( error => {
        this.props.openDialog(
          'Borttagning misslyckades',
          error.data
        );
      })
  }

  render(){
    if(this.state.error){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            {this.state.error}
          </GridCell>
        </GridInner>
      )
    }
    if (!this.state.signup || !this.state.user){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      );
    }
    const Package = [
      this.props.intl.formatMessage({id: 'Prices.Big'}),
      this.props.intl.formatMessage({id: 'Prices.Small'}),
      this.props.intl.formatMessage({id: 'Prices.Saturday'}),
    ];
    
    const Food = [
      this.props.intl.formatMessage({id: 'Prices.BigFood'}),
      this.props.intl.formatMessage({id: 'Prices.SmallFood'}),
      this.props.intl.formatMessage({id: 'Prices.SaturdayFood'}),
      this.props.intl.formatMessage({id: 'Prices.NoFood'}),
    ];

    const InstrSize = [
      this.props.intl.formatMessage({id: 'Orchestra.sizeVerySmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeSmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeMedium'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeLarge'}),
      this.props.intl.formatMessage({id: 'Orchestra.noInstr'}),
    ];

    const dates = [
      this.props.intl.formatMessage({id: 'OrchestraMemReg.thur'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.fri'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.sat'}),
    ]
    const sortedArticles = this.state.signup.orchestra_articles.sort((a, b) => articleCompare(a,b))

    return(
      <React.Fragment>
        <Dialog
          open={this.state.deleteDialog}
          onClose={evt => {
            this.setState({deleteDialog: false})
          }}
        >
        <DialogTitle>ÄR DU SÄKER?</DialogTitle>
        <DialogContent>
          Vill du verkligen ta bort <b>{this.state.user.email}</b>'s anmälan till <b>{this.state.signup.orchestra.name}</b>? 
          
          <br/><br/>
          <b>PSA</b>: Beteendet för att ta bort någons första anmälan när de har flera är odefinerat, gör inte det!
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" raised isDefaultAction>Gör ingenting</DialogButton>
          <DialogButton action="accept" onClick={() => this.deleteSignup()}>Ta bort anmälan</DialogButton>
        </DialogActions>
      </Dialog>

        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h4 style={{margin: '0px'}}> <b>{this.state.user.email}</b>'s ({this.state.user.name}) anmälan till <b>{this.state.signup.orchestra.name} </b></h4>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <ListDivider style={{width: '100%'}}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <SimpleDataTable
              className='full-width-table rmwc-table-uninteractive'
              getRowProps={row => {
                return {}
              }}
              getCellProps={(cell, index, isHead) => {
                return {}
              }}
              headers={[[ 
                this.props.intl.formatMessage({id :'Orchestra.question'}),
                this.props.intl.formatMessage({id :'Orchestra.answer'})
              ]]}
              data={
                [
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.newOrOld'}), 
                    this.state.signup.active_member ? 
                      this.props.intl.formatMessage({id :'OrchestraMemReg.active'}) :
                      this.props.intl.formatMessage({id :'OrchestraMemReg.old'}) 
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.arrive'}), 
                    //Checks if arrive with orchestra
                    this.state.signup.arrival_date === this.state.signup.orchestra.arrival_date ?
                      this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                      this.props.intl.formatMessage({id :'Orchestra.no'}) 
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.whatDay'}), 
                    dates[this.state.signup.arrival_date]
                  ] ,
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.festivalPackage'}), 
                    Package[this.state.signup.orchestra_ticket.kind]
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.foodtickets'}),
                    Food[this.state.signup.orchestra_food_ticket.kind]
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.allergies'}),
                    this.state.signup.special_diets[0].name
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.dorm'}),
                    this.state.signup.dormitory ? 
                    this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                    this.props.intl.formatMessage({id :'Orchestra.no'}) 
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.balletOrOrchestra'}),
                    this.state.user.orchestra_role === 0 ?
                      this.props.intl.formatMessage({id: 'OrchestraMemReg.ballet'}) : 
                      this.props.intl.formatMessage({id: 'OrchestraMemReg.orchestra'})
                  ],
                  [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.otherOrchestra'}),
                    this.state.signup.other_performances ?
                      this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                      this.props.intl.formatMessage({id :'Orchestra.no'}) 
                  ],
                  (
                    this.state.signup.other_performances ?
                    [
                    this.props.intl.formatMessage({id :'OrchestraMemReg.whichOrchestras'}),
                      this.state.signup.other_performances
                    ] : []
                  ),
                  [
                    this.props.intl.formatMessage({id :'Orchestra.instrumentSize'}),
                    InstrSize[this.state.signup.instrument_size]
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.tenth'}),
                    this.state.signup.consecutive_10 ?
                    this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                    this.props.intl.formatMessage({id :'Orchestra.no'}) 
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.twentyfifth'}),
                    this.state.signup.attended_25 ? 
                    this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                    this.props.intl.formatMessage({id :'Orchestra.no'}) 
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.tshirt'}),
                    sortedArticles[0].data
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.medal'}),
                    sortedArticles[1].data
                  ],
                  [
                    this.props.intl.formatMessage({id :'Orchestra.patch'}),
                    sortedArticles[2].data
                  ],
                ]
              }
            />
          </GridCell>
          <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
            <Button raised style={{width: '100%'}}
              onClick={() => this.setState({deleteDialog: true})}
            > Ta bort </Button>
          </GridCell>
          <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
            <Button raised style={{width: '100%'}}
              onClick={() => this.props.history.push('/account/admin/signup/'+ this.state.signup.id + '/edit')}
            > Ändra </Button>
          </GridCell>
        </GridInner>
      </React.Fragment>
    )
  }

}

export const OrchestraSignup = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraSignup)));

class UNCOrchestraSignupChange extends Component{
  constructor(props){
    super(props)

    this.state = {error: null, signup: null, user:null, deleteDialog: false}
  }

  componentDidMount(){
    getOrchestraSignup(this.props.match.params.id)
      .then( response =>{
        this.setState({signup: response.data})
        getUser(response.data.user_id)
          .then( response => {
            this.setState({user: response.data})
          })
          .catch( error =>{
            this.setState({error: "" + error})
          })
      })
      .catch( error => {
        this.setState({error: "" + error})
      })
  }
  

  submitCallback = (values, bag) => {
    const sortedArticles = this.state.signup.orchestra_articles.sort((a, b) => articleCompare(a,b))

    values.TshirtID = sortedArticles[0].id;
    values.MedalID = sortedArticles[1].id;
    values.PatchID = sortedArticles[2].id;

    values.allergyId = this.state.signup.special_diets[0].id;

    bag.setSubmitting(true);
    updateOrchestraSignup(this.props.match.params.id, values)
      .then( response => {
        this.props.history.goBack();
        bag.setSubmitting(false);
        this.props.openDialog(
          'Registrering ändrad!',
          this.state.user.email + "'s registrering till " + this.state.signup.orchestra.name + ' har ändrats'
        );
      })
      .catch ( error => {
        bag.setErrors( { error: 'Something went wrong' });
        bag.setSubmitting(false)
      });
  }

  render() {
    if(this.state.error){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            {this.state.error}
          </GridCell>
        </GridInner>
      )
    }
    if (!this.state.signup || !this.state.user){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      );
    }

    const signup = this.state.signup;

    const sortedArticles = signup.orchestra_articles.sort((a, b) => articleCompare(a,b))

    const answers = {
      arriveWith: (signup.arrival_date === signup.orchestra.arrival_date),
      arriveDay: signup.arrival_date,
      festivalPackage: signup.orchestra_ticket.kind,
      foodTickets: signup.orchestra_food_ticket.kind,
      oldOrActive: signup.active_member,
      allergies: signup.special_diets[0].name,
      tenInARow: signup.consecutive_10,
      twoFive: signup.attended_25,
      instrSize: signup.instrument_size,
      dorm: signup.dormitory,
      otherPerformancesTrue: signup.other_performances !== null ? true : false,
      otherPerformances: signup.other_performances,
      orchestraType: signup.orchestra_role,
      numTshirt: sortedArticles[0].data,
      numMedal: sortedArticles[1].data,
      numPatch: sortedArticles[2].data
    }

    const MemRegType = this.state.signup !== null ? OrchestraMemReg : OrchestraMemRegShort;
    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h4 style={{margin: '0px'}}> Ändrar <b>{this.state.user.email}</b>'s ({this.state.user.name}) anmälan till <b>{this.state.signup.orchestra.name} </b></h4>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <ListDivider style={{width: '100%'}}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <MemRegType 
              submitCallback={this.submitCallback} 
              day={this.state.signup.orchestra.arrival_date}
              answers={answers}
            /> 
          </GridCell>
        </GridInner>
      </React.Fragment>
    );
  }
}

export const OrchestraSignupChange = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraSignupChange)));
