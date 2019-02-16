import React, { Component } from 'react';
import { Redirect } from 'react-router';

import FormTextInput from './FormTextInput';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';

import FormSelect from './FormSelect';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


import { createOrchestra } from '../api/orchestraCalls';

import { FormattedMessage } from 'react-intl';

class OrchestraCreation extends Component{

  constructor(props){
    super(props);
    this.createOrchestra = this.createOrchestra.bind(this);

    this.state = { error : "" };
  }




  createOrchestra(values, bag) {
    const { orchestraReg } = this.props;
    console.log(values);
    bag.setSubmitting(true);

    createOrchestra(values)
    .then( (response) => {

      // withRouter
      // <Redirect to="/somewhere/else" />
       this.setState({error: "Registration Success, reload page to register another one"} );
       bag.setSubmitting(false);
    })
    .catch( (error) => {
      this.setState( {error: "Registration failed, reload page to retry"} );

      let errors = {};
      for (let key in error.response.data.errors) {
        errors[key] = error.response.data.errors[key][0]; // for now only take the first error of the array
      }
      console.log("errors object", errors);
      bag.setErrors( errors );

      bag.setSubmitting(false);
    })

   }


  render() {
    return(<React.Fragment>
            <Formik
              initialValues={{name: '', email: '', dormitory: '', orchestra_type:'' , arrival_date:'', allow_signup: true }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Orkesternamn krävs för att skapa"),
                email: Yup.string().required("Kontaktmail till Orkester behövs för att kunna skapa en"),
                dormitory: Yup.bool().required("Ange om boende behövs för orkestern"),
                orchestra_type: Yup.number().required("Orkestertyp krävs"),
                arrival_date: Yup.number().required("Vänligen ange ankomstdag"),
                allow_signup: Yup.boolean().required("Ange om orkestern ska kunna registreras på för tillfället")
              })}
              onSubmit={this.createOrchestra}
              render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting, setFieldValue,  setFieldTouched}) => (
                <Form style={{width: '100%'}} >
                  <GridInner>
                    {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        name='name'
                        label={"Namn på Orkester"}
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        name='email'
                        label={"Kontaktmail"}
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={"Behöver boende"}
                        value={values.dormitory}
                        field='dormitory'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.dormitory}
                        touched={touched.dormitory}
                        options={[
                          {
                            label: "Ja",
                            value: true,
                            key: 0
                          },
                          {
                            label: "Nej",
                            value: false,
                            key: 1
                          }
                        ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={"Orkestertyp"}
                        value={values.orchestra_type}
                        field='orchestra_type'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.orchestra_type}
                        touched={touched.orchestra_type}
                        options={[
                          {
                            label: "Orkester",
                            value: 0,
                            key: 0
                          },
                          {
                            label: "Band",
                            key: 1,
                            value: 1,
                          }
                        ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={"Ankomstdag"}
                        value={values.arrival_date}
                        field='arrival_date'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.arrival_date}
                        touched={touched.arrival_date}
                        options={[
                          {
                            label: "Torsdag",
                            value: 0,
                            key: 0
                          },
                          {
                            label: "Fredag",
                            key: 1,
                            value: 1
                          },
                          {
                            label: "Lördag",
                            key: 2,
                            value: 2
                          }
                        ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={"Tillåt registrering"}
                        value={values.allow_signup}
                        field='allow_signup'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.allow_signup}
                        touched={touched.allow_signup}
                        options={[
                          {
                            label: "Ja",
                            value: true,
                            key: 0
                          },
                          {
                            label: "Nej",
                            key: false,
                            value: 1,
                          }
                        ]}
                      />
                    </GridCell>
                    <GridCell desktop='6' tablet='4' phone='2'>
                      <Button raised type='submit' disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                        Skapa orkester
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

export default OrchestraCreation;
