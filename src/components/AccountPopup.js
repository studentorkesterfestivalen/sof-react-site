import React, { Component } from 'react';

import FormTextInput from './FormTextInput';

import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';
import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenu, SimpleMenuSurface } from '@rmwc/menu';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';

export default class AccountPopup extends Component {
  constructor(props){
    super(props)

    this.state = {open: false, loggedIn: false}
  }

  render(){
    var content = <Login/>;
    if(this.state.loggedIn){
      content = <Account/>;
    } 

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        handle={<TopAppBarActionItem> account_circle </TopAppBarActionItem>}
      >
        {content}
      </SimpleMenuSurface>
    );
  }
}


class Login extends Component{

  fakeApi = (values) =>{
    return(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if(values.username ==='test' && values.password === 'hello'){
            resolve();
          }else if(values.username === 'test'){
            reject({global: 'Username and password does not match'});
          } else{
            reject({username: 'User not found'});
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
                onSubmit={this.handleSubmit}
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
                        <Button raised> 
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

class Account extends Component{

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}
