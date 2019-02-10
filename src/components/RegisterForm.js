import React, { Component } from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';
import { registerUser } from '../redux-token-auth-config';

import { connect } from 'react-redux';
import Register from '../locale/Register';

class RegisterForm extends Component{

  constructor(props){
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = { error : "" };
  }

  registerSubmit(values, bag) {
    const { registerUser } = this.props;
    const {
      displayName,
      email,
      password,
      passwordConfirmation
    } = values;
    console.log(email);
    const confirmSuccessUrl = "https://www.sof.lintek.liu.se/verified/"

    bag.setSubmitting(true);

    registerUser({ email, displayName, password, passwordConfirmation, confirmSuccessUrl })
      .then( (response) => {
        console.log("Du är registrerad");
        console.log(response);
        bag.setSubmitting(false);
      } )
      .catch( (error) => {
        console.log("BinBangbom krasch");
        //console.log(error.response.data.errors);
        // if(typeerror.response.data.errors)
        
        let errors = {};
        for (let key in error.response.data.errors) {
          errors[key] = error.response.data.errors[key][0]; // for now only take the first error of the array
        }
        console.log("errors object", errors);
        bag.setErrors( errors );

        bag.setSubmitting(false);
        this.setState({error : error.response.data.errors[0] });  
      } )
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
                  password_conf: Yup.string().oneOf([Yup.ref("password"), null], <FormattedMessage id='Register.PasswordConfirmRequired' />)
                })}
                onSubmit={this.registerSubmit}
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
                        <Button raised type='submit' disabled={!isValid || isSubmitting}> 
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

export default connect(null, { registerUser })(RegisterForm)