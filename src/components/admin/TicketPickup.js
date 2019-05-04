import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { getOrderItemsFromUUID } from '../../api/ticketPickupCalls';

import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';


class TicketPickup extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
      products: []
    }
  };

  handleScan = data => {
    if (data) {
      getOrderItemsFromUUID(data)
        .then( (res) => {
          console.log(res);
          this.setState( { products: res.data.owned_items, qrRead: false, showCollect: true });
          
        })
        .catch( err => {
          console.log(err);
        })
    }
  };

  handleError = err => {
    console.error(err)
  };

  collectItems = () => {
    console.log('Hämtade ut alla items bror');
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
         
          </GridCell> : null}
        
            { this.state.showCollect ? <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <Button raised onClick={() => this.collectItems()} style={{ width: '100%' }}>
              Hämta alla
            </Button>
         
          </GridCell> : null}
        </GridInner>
      </React.Fragment>
    );
  }

};

export default TicketPickup;
