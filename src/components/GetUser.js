import React, { Component } from 'react';
import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getUser } from '../api/userCalls';


class GetUser extends Component{
  constructor(props){
    super(props);

    this.getUser = this.getUser.bind(this);
  }

  getUser(values, bag){
    bag.setSubmitting(true);
    getUser(values)
    .then( (response) => {
        console.log("Du lyckades!");
        console.log(response);
      })
    .catch( (error) => {

      let errors = {};
      for (let key in error.response.data.errors) {
        errors[key] = error.response.data.errors[key][0]; // for now only take the first error of the array
      }
      console.log("errors object", errors);
      bag.setErrors( errors );

    })
    bag.setSubmitting(false);
  }

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{email:''}}
          validationSchema={Yup.object().shape({
            email:Yup.string().required("Men lol skriv in email noob...")
          })}
          onSubmit={this.getUser}
          render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
            <Form style={{width: '100%'}} classname='get-user'>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  name='email'
                  label={"Email på användare"}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </GridCell>

              <GridCell desktop='12' tablet='8' phone='4'>
                <Button raised type='submit' disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                  Hämta användare
                </Button>
              </GridCell>
            </Form>
          )}
        />
      </React.Fragment>

    );

  }
}

export default GetUser;
