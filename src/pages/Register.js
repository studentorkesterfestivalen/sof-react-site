import React, { Component } from 'react';

import FormTextInput from '../components/FormTextInput';
import { FormattedMessage } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux'
import { registerUser } from '../redux-token-auth-config'

class Register extends Component {
  constructor(props){
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
  }
  static pageTitle(){
    return <FormattedMessage id='register.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='register.navTitle' />
  }

  registerSubmit(values) {
    const { registerUser } = this.props;
    const {
      username,
      password,
      passwordConfirm
    } = values;
    registerUser({ username, password, passwordConfirm })
      .then( (response) => {
        console.log("Du är registrerad");
        console.log(response);
      } )
      .catch( (error) => {
         console.log(error);
      } )

   }


  render (){
    return(
          <React.Fragment>
            <Grid className="base-outer-grid base-outer-grid--first">
              <GridInner>
                <GridCell phone="4" tablet="8" desktop='12'>
                  HEJ
                  <Formik
                    initialValues={{username: '', password: '', confirmPassword: ''}}
                    validationSchema={Yup.object().shape({
                      username: Yup.string().required(<FormattedMessage id='Register.EmailRequired' />),
                      password: Yup.string().required(<FormattedMessage id='Register.PasswordRequired' />),
                      confirmPassword: Yup.string().required(<FormattedMessage id='Register.PasswordConfirmRequired' />)
                    })}
                    onSubmit={this.registerSubmit}
                    render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                      <Form style={{width: '100%'}} >
                        <GridInner>
                          {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormTextInput
                              name='email'
                              label={<FormattedMessage id='Register.Email'/>}
                              value={values.username}
                              error={errors.username}
                              touched={touched.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </GridCell>
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormTextInput
                              name='password'
                              type='password'
                              label={<FormattedMessage id='Register.Pass'/>}
                              value={values.password}
                              error={errors.password}
                              touched={touched.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </GridCell>
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormTextInput
                              name='confirmPassword'
                              type='password'
                              label={<FormattedMessage id='Register.PassConfirm'/>}
                              value={values.confirmPassword}
                              error={errors.confirmPassword}
                              touched={touched.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </GridCell>
                          <GridCell desktop='6' tablet='4' phone='2'>
                            <Button raised type='submit' disabled={!isValid || isSubmitting}>
                              <FormattedMessage id='Register.Login'/>
                            </Button>
                          </GridCell>
                        </GridInner>
                      </Form>
                    )}
                  />
                </GridCell>
              </GridInner>
            </Grid>
          </React.Fragment>

      )

  }
}


export default connect(
  null,
  { registerUser },
)(Register)
