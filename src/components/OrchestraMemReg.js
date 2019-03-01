import React, { Component} from 'react';

import FormTextInput from './FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormattedMessage, injectIntl } from 'react-intl';
import { postInfo } from '../api/orchestraCalls';
import FormSelect from './FormSelect';
import PriceSummary from './PriceSummary'

import { connect } from 'react-redux';
import { setTitle } from '../actions/title';


class OrchestraMemReg extends Component{
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.fixArrive = this.fixArrive.bind(this);
    this.code = this.props.code;

    this.state = {
      arriveWithFalse: false,
      performWithOther: false,
      codeWasValid: false,
    }

  }

  componentDidMount() {
    this.props.dispatch(setTitle('Account.memRegTitle'));
  }

  // TODO: show total sum at bottom, another simple version for orchestramembers already signed up.
  // Verify code skall fungera fast ej i denna component

  //Handles when e.g member says "Not arriving with orchestra"  and chooses Thur but changes mind later
  fixArrive(values) {

    if (values.arriveWith === true) {
      values.arriveDay = this.props.signupOrchestra.arrival_date;
    }
    if (!values.otherPerformancesTrue === false) {
      values.otherPerformances = null;
    }
  }

  formSubmit(values, bag) {
    bag.setSubmitting(true);
    console.log({ yup: true})
    this.fixArrive(values);
    postInfo({...values, code: this.code})
    .then( res => {
      bag.setSubmitting(false);
      if(this.props.successCallback){
        this.props.successCallback(res);
      }
    })
    .catch( error => {
      bag.setErrors( { instrSize: 'Something went wrong' });
      bag.setSubmitting(false)
      //this.setState( {successfullySubmitted: 'Success!'} )
    });
  }

  handleArriveWithFalse = (val) => {
    this.setState({arriveWithFalse: !(val === 'true')});
  }

  handlePlayWithOthers = (val) => {
    this.setState({performWithOther: (val === 'true')});
  }

  render() {
    this.PackagePricesStr = [
      this.props.intl.formatMessage({id: 'Prices.Big'}),
      this.props.intl.formatMessage({id: 'Prices.Small'}),
      this.props.intl.formatMessage({id: 'Prices.Saturday'}),
    ]

    this.PackagePrices = [
      500, 470, 220
    ]

    this.FoodPricesStr = [
      this.props.intl.formatMessage({id: 'Prices.BigFood'}),
      this.props.intl.formatMessage({id: 'Prices.SmallFood'}),
      this.props.intl.formatMessage({id: 'Prices.SaturdayFood'}),
    ]

    this.FoodPrices = [
      215, 140, 75
    ]

    this.Days = [
      this.props.intl.formatMessage({id: 'OrchestraMemReg.thur'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.fri'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.sat'}),
    ]
    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='account-orchestra-signup'>
            <Formik
              initialValues={{
                arriveWith: '',
                arriveDay: '',
                festivalPackage: '',
                foodTickets: '',
                oldOrActive: '',
                allergies: '',
                tenInARow: '',
                twoFive: '',
                instrSize: '',
                dorm: '',
                otherPerformancesTrue: '',
                otherPerformances: '',
                orchestraType: '',
                numTshirt: '',
                numMedal:'',
                numPatch: '',
            }}
              validationSchema={Yup.object().shape({
                arriveWith: Yup.bool()
                  .required(<FormattedMessage id='OrchestraMemReg.required' />),
                arriveDay: Yup.number().when('arriveWith', { is: false, 
                  then: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />)}),
                festivalPackage: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                foodTickets: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                oldOrActive: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                allergies: Yup.string(),
                tenInARow: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                twoFive: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                instrSize: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                dorm: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                otherPerformancesTrue: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                otherPerformances: Yup.string().when('otherPerformancesTrue', { is: true,
                  then: Yup.string().required(<FormattedMessage id='OrchestraMemReg.required' />)}),
                orchestraType: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                numTshirt: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                numMedal: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),
                numPatch: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />)
            })}
              onSubmit={this.formSubmit}
              render={ ({values, handleChange, handleBlur, errors, touched, isValid, setFieldValue, setFieldTouched, isSubmitting}) => (
                <Form style={{width: '100%'}} >
                  <GridInner>
                    {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.newOrOld'/>}
                        value={values.oldOrActive}
                        field='oldOrActive'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.oldOrActive}
                        touched={touched.oldOrActive}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id :'OrchestraMemReg.active'}),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.old'}),
                            value: false,
                            key: 1
                          }
                        ]}
                      />

                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                    <FormSelect
                        label={
                          <span>
                            <FormattedMessage id='OrchestraMemReg.arrive'/>
                            {" "}({this.Days[this.props.day] })
                          </span>
                        }
                        value={values.arriveWith}
                        field='arriveWith'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.arriveWith}
                        touched={touched.arriveWith}
                        specialans={this.handleArriveWithFalse}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.yes'}),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                            value: false,
                            key: 1
                          }
                        ]}
                      />
                    </GridCell>

                    {values.arriveWith === false ? <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.whatDay'/>}
                        value={values.arriveDay}
                        field='arriveDay'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.arriveDay}
                        touched={touched.arriveDay}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.thur'}),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.fri'}),
                            key: 1,
                            value: 1,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.sat'}),
                            key: 2,
                            value: 2,
                          }
                        ]}
                      />
                    </GridCell> : null}

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.festivalPackage'/>}
                        value={values.festivalPackage}
                        field='festivalPackage'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.festivalPackage}
                        touched={touched.festivalPackage}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.bigPackage'}),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.littlePackage'}),
                            value: 1,
                            key: 1
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.onlySat'}),
                            value: 2,
                            key: 2
                          }
                        ]}
                      />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.foodtickets'/>}
                        value={values.foodTickets}
                        field='foodTickets'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.foodTickets}
                        touched={touched.foodTickets}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.foodTicketBigPackage'}),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.foodTicketLittlePackage'}),
                            value: 1,
                            key: 1
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.foodTicketSaturday'}),
                            value: 2,
                            key: 2
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.foodTicketNone'}),
                            value: 3,
                            key: 3
                          }
                        ]}
                      />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                      name='allergies'
                        label={<FormattedMessage id='OrchestraMemReg.allergies'/>}
                        value={values.allergies}
                        error={errors.allergies}
                        touched={touched.allergies}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>


                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.dorm'/>}
                        value={values.dorm}
                        field='dorm'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.dorm}
                        touched={touched.dorm}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.yes'}),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                            value: false,
                            key: 1
                          }
                        ]}
                      />
                    </GridCell>




                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.balletOrOrchestra'/>}
                        value={values.orchestraType}
                        field='orchestraType'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.orchestraType}
                        touched={touched.orchestraType}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.ballet'}),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.orchestra'}),
                            key: 1,
                            value: 1,
                          },
                        ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                    <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.otherOrchestra'/>}
                        value={values.otherPerformancesTrue}
                        field='otherPerformancesTrue'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.otherPerformancesTrue}
                        touched={touched.otherPerformancesTrue}
                        specialAns={this.handlePlayWithOthers}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.yes'}),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                            value: false,
                            key: 1
                          }
                        ]}
                      />
                    </GridCell>

                    {values.otherPerformancesTrue === true ? <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        name='otherPerformances'
                        label={<FormattedMessage id='OrchestraMemReg.whichOrchestras'/>}
                        value={values.otherPerformances}
                        error={errors.otherPerformances}
                        touched={touched.otherPerformances}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell> : null}



                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.instrumentSize'/>}
                        value={values.instrSize}
                        field='instrSize'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.instrSize}
                        touched={touched.instrSize}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.sizeVerySmall'}),
                            key: 0,
                            value: 0,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.sizeSmall'}),
                            key: 1,
                            value: 1,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.sizeMedium'}),
                            value: 2,
                            key: 2,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.sizeLarge'}),
                            value: 3,
                            key: 3,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.noInstr'}),
                            value: 4,
                            key: 4,
                          }
                        ]}
                      />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.tenInARow'/>}
                        value={values.tenInARow}
                        field='tenInARow'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.tenInARow}
                        touched={touched.tenInARow}
                        options={[
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.yes'}),
                            value: true,
                            key: 0,
                          },
                          {
                            label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                            value: false,
                            key: 1
                          }
                        ]}

                    />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                          label={<FormattedMessage id='OrchestraMemReg.25orMore'/>}
                          value={values.twoFive}
                          field='twoFive'
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.twoFive}
                          touched={touched.twoFive}
                          options={[
                            {
                              label: this.props.intl.formatMessage({id: 'OrchestraMemReg.yes'}),
                              value: true,
                              key: 0
                            },
                            {
                              label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                              value: false,
                              key: 1
                            }
                          ]}
                      />
                    </GridCell>

                    <GridCell desktop='12' tablet='8' phone='4'>

                      <FormSelect
                          label={<FormattedMessage id='OrchestraMemReg.tshirt'/>}
                          value={values.numTshirt}
                          field='numTshirt'
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.numT}
                          touched={touched.numT}
                          options={[
                            {
                              label: 0,
                              value: 0,
                              key: 0
                            },
                            {
                              label: 1,
                              value: 1,
                              key: 1
                            },
                            {
                              label: 2,
                              value: 2,
                              key: 2
                            },{
                              label: 3,
                              value: 3,
                              key: 3
                            },{
                              label: 4,
                              value: 4,
                              key: 4
                            },{
                              label: 5,
                              value: 5,
                              key: 5
                            },
                          ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>

                      <FormSelect
                          label={<FormattedMessage id='OrchestraMemReg.medal'/>}
                          value={values.numMedal}
                          field='numMedal'
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.numMedal}
                          touched={touched.numMedal}
                          options={[
                            {
                              label: 0,
                              value: 0,
                              key: 0
                            },
                            {
                              label: 1,
                              value: 1,
                              key: 1
                            },
                            {
                              label: 2,
                              value: 2,
                              key: 2
                            },{
                              label: 3,
                              value: 3,
                              key: 3
                            },{
                              label: 4,
                              value: 4,
                              key: 4
                            },{
                              label: 5,
                              value: 5,
                              key: 5
                            },
                          ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                    <FormSelect
                          label={<FormattedMessage id='OrchestraMemReg.patch'/>}
                          value={values.numPatch}
                          field='numPatch'
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.numPatch}
                          touched={touched.numPatch}
                          options={[
                            {
                              label: 0,
                              value: 0,
                              key: 0
                            },
                            {
                              label: 1,
                              value: 1,
                              key: 1
                            },
                            {
                              label: 2,
                              value: 2,
                              key: 2
                            },{
                              label: 3,
                              value: 3,
                              key: 3
                            },{
                              label: 4,
                              value: 4,
                              key: 4
                            },{
                              label: 5,
                              value: 5,
                              key: 5
                            },
                          ]}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                        <PriceSummary
                          data={
                            [
                              values.festivalPackage !== '' ?
                                [this.PackagePricesStr[values.festivalPackage],
                                1,
                                this.PackagePrices[values.festivalPackage],
                                this.PackagePrices[values.festivalPackage],
                            ] : [],
                              (values.foodTickets !== '' && values.foodTickets !== 3) ? 
                                [this.FoodPricesStr[values.foodTickets],
                                1,
                                this.FoodPrices[values.foodTickets],
                                this.FoodPrices[values.foodTickets],
                            ] : [],
                              values.dorm ? [ this.props.intl.formatMessage({id: 'Prices.Dorm'}),
                                1,
                                50,
                                50,
                            ] : [],
                              values.numTshirt ? [ this.props.intl.formatMessage({id: 'Prices.Tshirt'}),
                                values.numTshirt,
                                100,
                                100 * values.numTshirt,
                            ] : [],
                              values.numMedal ? [ this.props.intl.formatMessage({id: 'Prices.Medal'}),
                                values.numMedal,
                                40,
                                40 * values.numMedal,
                            ] : [],
                              values.numPatch ? [ this.props.intl.formatMessage({id: 'Prices.Patch'}),
                                values.numPatch,
                                20,
                                20 * values.numPatch,
                            ] : [],
                          ]}
                        />
                    </GridCell>
                    <GridCell desktop='6' tablet='4' phone='2'>
                      <Button raised type='submit' disabled={
                        !isValid ||
                        isSubmitting}>
                        <FormattedMessage id='OrchestraMemReg.Submit'/>
                      </Button>
                    </GridCell>
                  </GridInner>
                </Form>
              )}
            />

          </GridCell>
        </GridInner>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  signupOrchestra : state.orchestras.signupOrchestra,
  loading: state.orchestras.loading,
});

export default injectIntl(connect(mapStateToProps)(OrchestraMemReg));
