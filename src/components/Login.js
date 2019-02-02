import React, { Component} from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'

class Login extends Component{

  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(values) {
    const { signInUser } = this.props;
    const {
      username,
      password
    } = values;
    signInUser({ username, password })
      .then( (response) => {
        console.log("Du är inloggad");
        console.log(response);
      } )
      .catch( (error) => {
         console.log(error);
      } )
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
                initialValues={{username: '', password: ''}}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required(<FormattedMessage id='Login.UsernameRequired' />),
                  password: Yup.string().required(<FormattedMessage id='Login.PasswordRequired' />)
                })}
                onSubmit={this.loginSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='username'
                          label={<FormattedMessage id='Login.Username'/>}
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
                          label={<FormattedMessage id='Login.Pass'/>}
                          value={values.password}
                          error={errors.password}
                          touched={touched.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='button'>
                            <FormattedMessage id='Login.Register'/>
                        </Button>
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='submit' disabled={!isValid || isSubmitting}>
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
)(Login)
