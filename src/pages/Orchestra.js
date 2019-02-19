import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import OrchestraCreation from '../components/OrchestraCreation';
import AllOrchestras from '../components/AllOrchestras';
import FormTextInput from '../components/FormTextInput';

import { FormattedMessage } from 'react-intl';
import PermissionsModifier from '../components/PermissionsModifier';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button } from '@rmwc/button';

import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import { fetchSignupOrchestra } from '../actions/orchestraSignups'

class Orchestra extends Component{

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
    return(
      <GridInner>
        {this.props.location.error ?  
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin:'0px'}} >{this.props.location.error}</h5>
          </GridCell> : null}

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
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          Orkestrar
        </GridCell>
      </GridInner>
    );
  }
}

export  default withRouter(connect()(Orchestra));
