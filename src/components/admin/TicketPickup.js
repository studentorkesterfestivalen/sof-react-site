import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { getOrderItemsFromUUID, collectItems, getOrderFromLiUCardCode } from '../../api/ticketPickupCalls';
import { openDialog } from '../../actions/dialog';
import { connect } from 'react-redux';

import FormTextInput from '../../components/forms/components/FormTextInput'
import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';


class TicketPickup extends Component {
  constructor(props){
    super(props)
    this.state = {
      uuid: '',
      products: [],
      showCollect: false
    }
  };


  handleScan = data => {
    if (data) {
      this.setState( { uuid: data })
      getOrderItemsFromUUID(data)
        .then( (res) => {
          console.log(res);
          this.setState( { products: res.data.owned_items, qrRead: false, showCollect: true }, () => {
            console.log(this.state.products);
          });
          
        })
        .catch( err => {
          console.log(err);
          this.setState({ uuid: '', qrRead: false});
        });
    }
  };

  handleError = err => {
    this.props.openDialog('Så jäkla icke-tungt', 'Något gick fel döh');
  };

  collectItems = () => {

    if (this.state.products.lenghth !== 0) {
      const collectedIds = this.state.products.map( item => {
        return item.id;
      });
      // console.log(collectedIds);
      collectItems(collectedIds)
        .then( res => {
          this.setState( { showCollect: false })
          this.props.openDialog('Så jäkla tungt', 'Du kan nu ge billarna till personen');
        })
        .catch( err => {  
          this.props.openDialog('Så jäkla icke-tungt', 'Något gick fel. Ge fan inte billarna');
        });
      }
  }

  formSubmit = (value, bag) => {
    getOrderFromLiUCardCode(value.code)
      .then( res => {
        console.log(res);
        //TODO: pout items in state
        this.setState( { products: res.data.owned_items, qrRead: false, showCollect: true }, () => {
          console.log(this.state.products);
        });
      })
      .catch(err => {
        console.log(err)
      })
  }
 
  render(){
    return (
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <Button raised onClick={() => this.setState( { qrRead: !this.state.qrRead } )} style={{ width: '100%' }}>
              Scanna QR
            </Button>
          </GridCell >
            { this.state.qrRead? <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
              />
         
          </GridCell> : null }
        
            { this.state.showCollect ? <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <Button raised onClick={() => this.collectItems()} style={{ width: '100%' }}>
              Hämta alla 
            </Button>
         
          </GridCell> : null}

          <GridCell desktop='12' tablet='8' phone='4'>

            <GridCell desktop='12' tablet='8' phone='4'>
              
              <Formik
                initialValues={{code: ''}}
                onSubmit={this.formSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='code'
                          label={'Kod här'}
                          value={values.code}
                          error={errors.code}
                          touched={touched.code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='submit' disabled={!isValid || isSubmitting}>
                          Skicka
                        </Button>
                      </GridCell>
                    </GridInner>
                  </Form>
                )}
              />
            </GridCell>
          </GridCell >
        </GridInner>
      </React.Fragment>
    );
  }

};

export default connect(null, { openDialog })(TicketPickup);
