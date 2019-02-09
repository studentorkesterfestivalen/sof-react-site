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

    this.state = { error : "" };
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
      email,
      displayName,
      password,
      passwordConfirmation
    } = values;
    console.log(email);
    const confirmSuccessUrl = "https://www.sof.lintek.liu.se/verified/"

    registerUser({ email, displayName, password, passwordConfirmation, confirmSuccessUrl })
      .then( (response) => {
        console.log("Du är registrerad");
        console.log(response);
      } )
      .catch( (error) => {
        console.log("BinBangbom krasch");
        console.log(error.response.data.errors);
        // if(typeerror.response.data.errors)
        this.setState({error : error.response.data.errors[0] });

      } )

   }


  render (){
    return(
          <React.Fragment>
            <Grid className="base-outer-grid base-outer-grid--first">
              <GridInner>
                <GridCell phone="4" tablet="8" desktop='12'>
                  <Formik
                    initialValues={{displayName: '', email: '', password: '', passwordConfirmation: ''}}
                    validationSchema={Yup.object().shape({
                      displayName: Yup.string().required(<FormattedMessage id='Register.displayNameRequired' />),
                      email: Yup.string().required(<FormattedMessage id='Register.EmailRequired' />),
                      password: Yup.string().required(<FormattedMessage id='Register.PasswordRequired' />),
                      passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], <FormattedMessage id='Register.PasswordConfirmRequired' />)
                    })}
                    onSubmit={this.registerSubmit}
                    render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                      <Form style={{width: '100%'}} >
                        <GridInner>
                          {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormTextInput
                              name='displayName'
                              label={<FormattedMessage id='Register.displayName'/>}
                              value={values.displayName}
                              error={errors.displayName}
                              touched={touched.displayName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </GridCell>
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormTextInput
                              name='email'
                              label={<FormattedMessage id='Register.Username'/>}
                              value={values.email}
                              error={errors.email}
                              touched={touched.email}
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
                              name='passwordConfirmation'
                              type='password'
                              label={<FormattedMessage id='Register.PassConfirm'/>}
                              value={values.passwordConfirmation}
                              error={errors.passwordConfirmation}
                              touched={touched.passwordConfirmation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </GridCell>
                          <GridCell desktop='6' tablet='4' phone='2'>
                            <Button raised type='submit' disabled={!isValid || isSubmitting}>
                              <FormattedMessage id='Register.Register'/>
                            </Button>
                          </GridCell>
                        </GridInner>
                      </Form>
                    )}
                  />
                </GridCell>
                <GridCell desktop='12' tablet='8' phone='4'>
                  {this.state.error}
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
