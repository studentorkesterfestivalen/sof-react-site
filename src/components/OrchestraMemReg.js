import React, { Component} from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormattedMessage } from 'react-intl';
import { postInfo } from '../api/orchestraCalls';

class OrchestraMemReg extends Component{

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {newOrOld: false}
  }

  formSubmit(values) {
    console.log(values);
    postInfo(values); 
  }

  static pageTitle(){
    return <FormattedMessage id='Contact.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Contact.navTitle' />
  }

  render(){
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4'>
              <Formik
                initialValues={{name: '', oldNew: false, allegies: '', tenInARow: false, twoFive: false, instrSize: ''}}
                validationSchema={Yup.object().shape({
                  //username: Yup.string().required(<FormattedMessage id='Login.UsernameRequired' />),
                  //password: Yup.string().required(<FormattedMessage id='Login.PasswordRequired' />)
                })}
                onSubmit={this.formSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='name'
                          label={<FormattedMessage id='OrchestraMemReg.name'/>}
                          value={values.username}
                          error={errors.username}
                          touched={touched.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>

                      <GridCell desktop='12' tablet='8' phone='4'>
                        <Select
                          label={<FormattedMessage id='OrchestraMemReg.newOrOld'/>}
                          enhanced
                          onChange={evt => this.setState({newOrOld: evt.target.value})}
                          options={[
                            {
                              label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                              value: true}, 
                            {
                              label: <FormattedMessage id='OrchestraMemReg.no'/>,
                              value: false
                            }
                          ]}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                      <Select
                        label={<FormattedMessage id='OrchestraMemReg.arrive'/>}
                        enhanced
                    
                        options={[
                          {
                            label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                            value: true}, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.no'/>,
                            value: false
                          }
                        ]}
                      />
                      </GridCell>

                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                         // name='password'
                          //='password'
                          label={<FormattedMessage id='OrchestraMemReg.allergies'/>}
                          //value={values.password}
                          error={errors.password}
                          touched={touched.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>

                      <GridCell desktop='12' tablet='8' phone='4'>
                      <Select
                        label={<FormattedMessage id='OrchestraMemReg.tenInARow'/>}
                        enhanced
                        options={[
                          {
                            label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                            value: true}, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.no'/>,
                            value: false
                          }
                        ]}
                      />

                      </GridCell>

                       <GridCell desktop='12' tablet='8' phone='4'>
                        <Select
                          label={<FormattedMessage id='OrchestraMemReg.25orMore'/>}
                          enhanced
                          options={[
                          {
                            label: <FormattedMessage id='OrchestraMemReg.yes'/>,
                            value: true}, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.no'/>,
                            value: false
                          }
                        ]}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <Select
                          label={<FormattedMessage id='OrchestraMemReg.instrumentSize'/>}
                          enhanced
                          options={[
                          {
                            label: <FormattedMessage id='OrchestraMemReg.sizeVerySmall'/>
                          }, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.sizeSmall'/>
                          },
                          {
                            label: <FormattedMessage id='OrchestraMemReg.sizeMedium'/>
                          }, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.sizeLarge'/>
                          }, 
                          {
                            label: <FormattedMessage id='OrchestraMemReg.noInstr'/>
                          } 
                          ]}
                        />
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='submit' disabled={!isValid || isSubmitting}>
                          <FormattedMessage id='OrchestraMemReg.Submit'/>
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

export default OrchestraMemReg
