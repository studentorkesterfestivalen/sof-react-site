import React, { Component } from 'react';
import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { FormattedMessage } from 'react-intl';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from '../api/userCalls';
import qs from 'qs';

class ChangePassword extends Component{
  constructor(props){
    super(props);

    this.sendNewPassword = this.sendNewPassword.bind(this);
    this.state = { success: false, tokenParams: null}
  }


  verify = (params) =>{
    const tokenParams = {
      'access-token': params.auth_token,
      client: params.client_id,
      uid: params.uid
    }
    this.state.setState({ tokenParams: tokenParams })
  }

  sendNewPassword(values, bag){
    bag.setSubmitting(true);
    
    if (this.state.tokenParams) {
      resetPassword(values, this.state.tokenParams)
      .then( (response) => {
        console.log(response);
        this.state.setState({success: true});
      })
      .catch( (error) => {
        bag.setErrors( {confirmPassword: error.response.data.message} );
      })
    }
    bag.setSubmitting(false);
  }

  render(){

    const params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });



    return(
      <React.Fragment>
        <GridCell desktop='12' tablet='8' phone='4'>
          <Formik
            initialValues={{newPassword:'', confirmPassword: ''}}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string().required(<FormattedMessage id='Register.PasswordRequired' />).min(8, <FormattedMessage id='Register.PasswordMinLen'/>),
              confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], <FormattedMessage id='Register.PasswordConfirmWrong' />)
              .required(<FormattedMessage id='Register.PasswordConfirmRequired'/>)
            })}

            onSubmit={this.sendNewPassword}
            render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
              <Form style={{width: '100%'}}>
                <GridInner>
                  <GridCell desktop='12' tablet='8' phone='4'>
                    <FormTextInput
                      style={{width: '100%'}}
                      name='newPassword'
                      type='password'
                      label={<FormattedMessage id="ForgotPass.newPass"/>}
                      value={values.newPassword}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>

                  <GridCell desktop='12' tablet='8' phone='4'>
                    <FormTextInput
                      style={{width: '100%'}}
                      name='confirmPassword'
                      type='password'
                      label={<FormattedMessage id="ForgotPass.confirmPass"/>}
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>

                  <GridCell desktop='12' tablet='8' phone='4'>
                    <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                      <FormattedMessage id='ForgotPass.change'/> 
                    </Button>
                  </GridCell>
                </GridInner>
              </Form>
            )}
          />
        </GridCell>
      </React.Fragment>
    );

  }
}

export default ChangePassword;
