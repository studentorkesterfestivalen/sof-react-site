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

import { sendCode } from '../api/orchestraCalls';
import { setOrchestraFromCode } from '../actions/orchestras'

class Orchestra extends Component{

  formSubmit = (values, bag) => {
    const {
      code,
    } = values;
    bag.setSubmitting(true);
    sendCode(code)
      .then((response) => {
        bag.setSubmitting(false);
        this.props.dispatch(setOrchestraFromCode(response.data));
        this.props.history.push('/account/orchestra/join/' + code);  
      })
      .catch( (error) => {
        bag.setSubmitting(false);
        bag.setErrors( {code: 'Probably wrong code...'})
      })
  }

  render() {

    return(
      <GridInner>
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
                    <Button raised type='submit'>
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
