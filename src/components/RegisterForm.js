import React, { Component } from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';

export default class RegisterForm extends Component{

  fakeApi = (values) =>{
    return(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if(values.email ==='test' && values.password === 'hello'){
            resolve();
          }else if(values.username === 'test'){
            reject({global: 'Username and password does not match'});
          } else{
            reject({email: 'User not found'});
          }
        }, 1000);
      })
    );
  }

  handleSubmit = async (values, bag) => {
   this.fakeApi(values).then(
     result =>{
      bag.setSubmitting(false);
      console.log('logged in bichs');
     }, error=>{
      bag.setSubmitting(false);
      bag.setErrors(error);
    });
  }

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4'> 
              <Formik
                initialValues={{email: '', username: '', password: '', password_conf: ''}}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required(<FormattedMessage id='Login.EmailRequired' />),
                  username: Yup.string().required(<FormattedMessage id='Login.UsernameRequired' />),
                  password: Yup.string().required(<FormattedMessage id='Login.PasswordRequired' />),
                  password_conf: Yup.string().required(<FormattedMessage id='Login.PasswordRequired' />)
                })}
                onSubmit={this.handleSubmit}
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
                        />
                      </GridCell>
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
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput 
                          name='password_conf' 
                          type='password' 
                          label={<FormattedMessage id='Login.PassConfirm'/>} 
                          value={values.password_conf}
                          error={errors.password_conf}
                          touched={touched.password_conf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <Button raised> 
                          <FormattedMessage id='Login.Register'/>
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
