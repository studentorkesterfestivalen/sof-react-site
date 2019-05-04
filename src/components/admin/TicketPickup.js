import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { GridInner, GridCell } from '@rmwc/grid';
import LoadButton from '../forms/components/LoadButton';
import ShowTickets from './ShowTickets';

import { getOrderItemsFromUUID } from '../../api/ticketPickupCalls';
import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';


class TicketPickup extends Component {
  constructor(props){
    super(props)
    this.state = {
      uuid: '',
      products: [],
      showCollect: false,
      loading: false
    }
  };


  handleScan = data => {
    if (data) {
      this.setState( { uuid: data })
      getOrderItemsFromUUID(data)
        .then( (res) => {
          console.log(res);
          this.setState( { products: res.data.owned_items, qrRead: false, showCollect: true, loading:false });

        })
        .catch( err => {
          console.log(err);
          this.setState({ uuid: '', qrRead: false, loading:false});
        });
    }
  };

  handleError = err => {
    this.props.openDialog('Så jäkla icke-tungt', 'Något gick fel döh');
  };

  render(){
    return (
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <LoadButton raised onClick={() => this.setState( { qrRead: !this.state.qrRead, loading: true, showCollect:false } )} loading={this.state.loading} style={{ width: '100%' }}>
              Scanna QR
            </LoadButton>
          </GridCell >
            { this.state.qrRead? <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
              />

          </GridCell> : null}

            { (this.state.showCollect) ?
            <React.Fragment>
              <ShowTickets items={this.state.products} collectedTickets={() => this.setState({showCollect:false})} />
            </React.Fragment>
           : null}
        </GridInner>
      </React.Fragment>
    );
  }

};

export default TicketPickup;
