import React, { Component } from 'react';
import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { FormattedMessage } from 'react-intl';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getUserFromEmail } from '../api/userCalls';


class ResetPassEmail extends Component{
  constructor(props){
    super(props);

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(values, bag){
    bag.setSubmitting(true);
    getUserFromEmail(values)
    .then( (response) => {
      console.log(response);
      
    })
    .catch( (error) => {
      bag.setErrors( {email: error.response.data.message} );
    })
    bag.setSubmitting(false);
  }

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{email:''}}
          validationSchema={Yup.object().shape({
            email:Yup.string().required(<FormattedMessage id="Login.Email"/>)
          })}
          onSubmit={this.sendEmail}
          render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
            <Form style={{width: '100%'}}>
              <GridInner>
                <GridCell desktop='12' tablet='8' phone='4'>
                  <FormTextInput
                    style={{width: '100%'}}
                    name='email'
                    label={<FormattedMessage id="Login.Email"/>}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridCell>

                <GridCell desktop='12' tablet='8' phone='4'>
                  <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                    Hämta användare
                  </Button>
                </GridCell>
              </GridInner>
            </Form>
          )}
        />
      </React.Fragment>

    );

  }
}

export default ResetPassEmail;
