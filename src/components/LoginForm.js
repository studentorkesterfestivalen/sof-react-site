import React, { Component } from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';
import { signInUser } from '../redux-token-auth-config';
import { connect } from 'react-redux';

class LoginForm extends Component{

  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(values, bag) {
    const { signInUser } = this.props;
    const {
      email,
      password
    } = values;

    bag.setSubmitting(true);
    signInUser({ email, password })
      .then( (response) => {
        console.log("Du är inloggad");
        console.log(response);
        bag.setSubmitting(false);
      } )
      .catch( (error) => {
        bag.setSubmitting(false);
        bag.setErrors({email: 'Wrong email or password, please try again!'})
      } )
  }

  handleRegisterClick = (email, password) => {
    this.props.handleRegister(email, password);
  }

  liuLogin = () => {

  }

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <Button raised className='liu-login-button'>
                <FormattedMessage id='Login.LiuLogin'/>
              </Button>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4'>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required(<FormattedMessage id='Login.EmailRequired' />),
                  password: Yup.string().required(<FormattedMessage id='Login.PasswordRequired' />)
                })}
                onSubmit={this.loginSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='email'
                          label={<FormattedMessage id='Login.Email'/>}
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          tabindex='1'
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='password'
                          type='password'
                          label={<FormattedMessage id='Login.Pass'/>}
                          value={values.password}
                          error={errors.password}
                          touched={touched.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          tabindex='2'
                        />
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='button' onClick={() => this.handleRegisterClick(values.email, values.password)}>  
                          <FormattedMessage id='Login.Register'/>
                        </Button>
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='submit' disabled={!isValid || isSubmitting} tabindex='3'> 
                          <FormattedMessage id='Login.Login'/>
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
    );
  }
}

export default connect(
  null,
  { signInUser },
)(LoginForm)
