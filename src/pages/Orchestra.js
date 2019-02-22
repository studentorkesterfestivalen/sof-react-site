import React, { Component } from 'react';

import { GridCell, GridInner } from '@rmwc/grid';
import FormTextInput from '../components/FormTextInput';
import OrchestraCard from '../components/OrchestraCard';

import { FormattedMessage, injectIntl } from 'react-intl';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { SimpleDataTable } from '@rmwc/data-table';


import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import { fetchSignupOrchestra } from '../actions/orchestraSignups'
import { fetchOrchestraFromSignup } from '../actions/orchestras'


class Orchestra extends Component{

  componentDidMount() {
    this.props.dispatch(fetchOrchestraFromSignup())
  }

  formSubmit = (values, bag) => {
    const {
      code,
    } = values;
    bag.setSubmitting(true);
    this.props.dispatch(fetchSignupOrchestra(code))
      .then((response) => {
        if(!response){
          this.props.history.push('/account/orchestra/join/' + code);  
        } else{
          bag.setErrors( {code: 'Probably wrong code...'})
          bag.setSubmitting(false);
        }
      })
  }

  render() {
    const Package = [
      this.props.intl.formatMessage({id: 'Prices.Big'}),
      this.props.intl.formatMessage({id: 'Prices.Small'}),
      this.props.intl.formatMessage({id: 'Prices.Saturday'}),
    ];

    const Food = [
      this.props.intl.formatMessage({id: 'Prices.BigFood'}),
      this.props.intl.formatMessage({id: 'Prices.SmallFood'}),
      this.props.intl.formatMessage({id: 'Prices.SaturdayFood'}),
    ];

    const InstrSize = [
      this.props.intl.formatMessage({id: 'Orchestra.sizeVerySmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeSmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeMedium'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeLarge'}),
      this.props.intl.formatMessage({id: 'Orchestra.noInstr'}),
    ];

    var orchestraContent = (
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <CircularProgress size="xlarge" />
      </GridCell>);
    if(!this.props.loading){
      if(!this.props.orchestras || !this.props.orchestras.signup || this.props.orchestras.length === 0 ){
        orchestraContent =  (
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5> <FormattedMessage id='Orchestra.noOrchestras' /> </h5>
          </GridCell>)
      } else{
        const firstOrc = this.props.orchestras.list[0];
        orchestraContent = (
          <React.Fragment>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.orchestras' /> </h5>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4'>
              <GridInner style={{width: '100%'}}>
                {this.props.orchestras.list.map(orch => (
                  <GridCell desktop='6' tablet='4' phone='4' key={orch.id}>
                    <OrchestraCard orchestra={orch} key={orch.id}/>
                  </GridCell>
                ))}
              </GridInner>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.info' /> </h5>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <SimpleDataTable
                className='full-width-table'
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
                      this.props.intl.formatMessage({id :'OrchestraMemReg.festivalPackage'}), 
                      Package[firstOrc.orchestra_ticket.kind]
                    ],
                    [
                      this.props.intl.formatMessage({id :'OrchestraMemReg.foodtickets'}),
                      Food[firstOrc.orchestra_food_ticket.kind]
                    ],
                    [
                      this.props.intl.formatMessage({id :'OrchestraMemReg.allergies'}),
                      firstOrc.special_diets[0].name
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.dorm'}),
                      firstOrc.dormitory ? 
                        this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                        this.props.intl.formatMessage({id :'Orchestra.no'}) 
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.instrumentSize'}),
                      InstrSize[firstOrc.instrument_size]
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.tenth'}),
                      firstOrc.consecutive_10 ?
                        this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                        this.props.intl.formatMessage({id :'Orchestra.no'}) 
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.twentyfifth'}),
                      firstOrc.attended_25 ? 
                        this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                        this.props.intl.formatMessage({id :'Orchestra.no'}) 
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.tshirt'}),
                      firstOrc.orchestra_articles[0].data
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.medal'}),
                      firstOrc.orchestra_articles[1].data
                    ],
                    [
                      this.props.intl.formatMessage({id :'Orchestra.patch'}),
                      firstOrc.orchestra_articles[2].data
                    ],
                  ]
                }
              />
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <p>
                {this.props.intl.formatMessage({id :'Orchestra.change'})}
                <b style={{color: '#f00'}} className='select-all'>orkester@sof.lintek.nu</b>
              </p>
             </GridCell>
          </React.Fragment>
        );
      }
    }
    return(
      <GridInner>
        {this.props.location.message ?  
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin:'0px'}} >{this.props.location.message}</h5>
          </GridCell> : null}

        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h5 style={{margin: 0}}> <FormattedMessage id='Orchestra.signup' /> </h5>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='account-orchestra'>
          <Formik
            initialValues={{code: ''}}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(<FormattedMessage id='Orchestra.code' />),
            })}
            onSubmit={this.formSubmit}
            render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
              <Form style={{width: '100%'}} >
                <GridInner>
                  <GridCell desktop='9' tablet='6' phone='4'>
                    <FormTextInput
                      name='code'
                      label={<FormattedMessage id='Orchestra.code'/>}
                      value={values.code}
                      error={errors.code}
                      touched={touched.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>
                  <GridCell desktop='3' tablet='2' phone='4'>
                    <Button raised disabled={!isValid || isSubmitting} type='submit'>
                      <FormattedMessage id='Orchestra.codeButton'/>
                    </Button>
                  </GridCell>
                </GridInner>
              </Form>
            )}
          />
        </GridCell>
        {orchestraContent}
      </GridInner>
    );
  }
}

const mapStateToProps = state => ({
  orchestras : state.orchestras.orchestras,
  loading: state.orchestras.loading,
});

export  default injectIntl(withRouter(connect(mapStateToProps)(Orchestra)));
