import React, { Component} from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form, withFormik } from 'formik';
import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';
import { postInfo, sendCode } from '../api/orchestraCalls';
import FormSelect from './FormSelect';
import VerifyCode from './VerifyCode'

class OrchestraMemReg extends Component{

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
    
    this.state = { verifiedCode: false, successfullySubmitted: false, arriveWithFalse: false}
  }

  formSubmit(values, bag) {
    bag.setSubmitting(true);
    console.log(values);
    postInfo(values)
    .then( res => {
      bag.setSubmitting(false);
      this.setState( {successfullySubmitted: 'Success!'} ) 
    })
    .catch( error => {

      bag.setErrors( { instrSize: 'Something went wrong' })
      bag.setSubmitting(false)
      //this.setState( {successfullySubmitted: 'Success!'} )
      
    }); 
  }

  handleVerification() {
    this.setState({ verifiedCode: true });
  }

  handleArriveWithFalse = () => {
    this.setState({arriveWithFalse: true});
  }

  render(){
  
    const verifiedSuccessContent = this.state.verifiedCode ?
    <GridCell desktop='12' tablet='8' phone='4'>
      <Formik
        initialValues={{name: '', arriveWith: '', arriveDay: '', oldOrActive: '', allergies: '', tenInARow: '', twoFive: '', instrSize: ''}}
        validationSchema={Yup.object().shape({
        name: Yup.string().required(<FormattedMessage id='OrchestraMemReg.required' />),
        arriveWith: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
        arriveDay: Yup.string().when('arriveWith', { is: false, then: Yup.string().required(<FormattedMessage id='OrchestraMemReg.required' />)}),
        oldOrActive: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
        allergies: Yup.string().required(<FormattedMessage id='OrchestraMemReg.required' />),
        tenInARow: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
        twoFive: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
        instrSize: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />)
       })}
        onSubmit={this.formSubmit}
        render={ ({values, handleChange, handleBlur, errors, touched, isValid, setFieldValue, setFieldTouched, isSubmitting}) => (
          <Form style={{width: '100%'}} >
            <GridInner>
              {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  name='name'
                  label={<FormattedMessage id='OrchestraMemReg.name'/>}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormSelect
                  label={<FormattedMessage id='OrchestraMemReg.newOrOld'/>}
                  value={values.oldOrActive}
                  field='oldOrActive'
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.oldOrActive}
                  touched={touched.oldOrActive}
                  options={[
                    {
                      label: <FormattedMessage id='OrchestraMemReg.active'/>,
                      value: true, 
                      key: 0
                    },
                    {
                      label: <FormattedMessage id='OrchestraMemReg.old'/>,
                      value: false,
                      key: 1
                    }
                  ]}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
    
              <FormSelect
                  label={<FormattedMessage id='OrchestraMemReg.arrive'/>}
                  value={values.arriveWith}
                  field='arriveWith'
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.arriveWith}
                  touched={touched.arriveWith}
                  ifNo={this.handleArriveWithFalse}
                  options={[
                    {
                      label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                      value: true,
                      key: 0
                    }, 
                    {
                      label: <FormattedMessage id='OrchestraMemReg.no'/>,
                      value: false,
                      key: 1
                    }
                  ]}
                />
              </GridCell>

              {this.state.arriveWithFalse && <GridCell desktop='12' tablet='8' phone='4'>
                <FormSelect
                  label={<FormattedMessage id='OrchestraMemReg.whatDay'/>}
                  value={values.arriveDay}
                  field='arriveDay'
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.arriveDay}
                  touched={touched.arriveDay}
                  options={[
                    {
                      label: <FormattedMessage id='OrchestraMemReg.thur'/>,
                      value: 0,                  
                      key: 0
                    },
                    {
                      label: <FormattedMessage id='OrchestraMemReg.fri'/>,                
                      key: 1,
                      value: 1,     
                    },
                    {
                      label: <FormattedMessage id='OrchestraMemReg.sat'/>,
                      key: 2,
                      value: 2,     
                    }
                  ]}
                />
              </GridCell>}

              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                name='allergies'
                  label={<FormattedMessage id='OrchestraMemReg.allergies'/>}
                  value={values.allergies}
                  error={errors.allergies}
                  touched={touched.allergies}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </GridCell>

              <GridCell desktop='12' tablet='8' phone='4'>
                <FormSelect
                  label={<FormattedMessage id='OrchestraMemReg.tenInARow'/>}
                  value={values.tenInARow}
                  field='tenInARow'
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.tenInARow}
                  touched={touched.tenInARow}
                  options={[
                    {
                      label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                      value: true,
                      key: 0,
                    }, 
                    {
                      label: <FormattedMessage id='OrchestraMemReg.no'/>,
                      value: false,
                      key: 1
                    }
                  ]}
              
              />
              </GridCell>

              <GridCell desktop='12' tablet='8' phone='4'>
                <FormSelect
                    label={<FormattedMessage id='OrchestraMemReg.25orMore'/>}
                    value={values.twoFive}
                    field='twoFive'
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.twoFive}
                    touched={touched.twoFive}
                    options={[
                      {
                        label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                        value: true,
                        key: 0 
                      }, 
                      {
                        label: <FormattedMessage id='OrchestraMemReg.no'/>,
                        value: false,
                        key: 1
                      }
                    ]}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormSelect
                  label={<FormattedMessage id='OrchestraMemReg.instrumentSize'/>}
                  value={values.instrSize}
                  field='instrSize'
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.instrSize}
                  touched={touched.instrSize}
                  options={[
                    {
                      label: <FormattedMessage id='OrchestraMemReg.sizeVerySmall'/>,
                      key: 0,
                      value: 0,
                    }, 
                    {
                      label: <FormattedMessage id='OrchestraMemReg.sizeSmall'/>,
                      key: 1,
                      value: 1,
                    },
                    {
                      label: <FormattedMessage id='OrchestraMemReg.sizeMedium'/>,
                      value: 2,
                      key: 2,
                    }, 
                    {
                      label: <FormattedMessage id='OrchestraMemReg.sizeLarge'/>,
                      value: 3,
                      key: 3,
                    }, 
                    {
                      label: <FormattedMessage id='OrchestraMemReg.noInstr'/>,
                      value: 4,
                      key: 4,
                    } 
                  ]}
                />              
              </GridCell>
              <GridCell desktop='6' tablet='4' phone='2'>
                <Button raised type='submit' disabled={!isValid || isSubmitting}>
                  <FormattedMessage id='OrchestraMemReg.Submit'/>
                </Button>
              </GridCell>
            </GridInner>
          </Form>
        )}
      />
            
  </GridCell> : 
  <VerifyCode verify={this.handleVerification}/>

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          
          <GridInner>
            {verifiedSuccessContent}
            {this.state.successfullySubmitted}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default OrchestraMemReg;