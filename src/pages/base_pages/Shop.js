import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'


import { CircularProgress } from '@rmwc/circular-progress';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { getCreditSession } from '../../api/shopCalls';

class Shop extends Component {
  constructor(props){
    super(props);
    this.state = { loading: false   }
  }
  static pageTitle(){
    return "Shop"
    // return <FormattedMessage id='Funkis.title' />
  }

  componentDidMount(){

  }

  static pageNavTitle(){
    return "Shop";
    // return <FormattedMessage id='Funkis.title' />
  }

  createOrder(){
    console.log("Mounting Klarna Component");

    this.setState({loading:true})
    getCreditSession()
      .then(response => {

        this.setState({loading:false});
        window.Klarna.Payments.init({
          client_token: response.data.client_token
        })
        console.log(response.data.payment_method_categories[0].identifier)
        window.Klarna.Payments.load({
          container: '#klarna-payments-container',
          payment_method_category: response.data.payment_method_categories[0].identifier
          }, function (res) {
          console.debug(res);
        })



      })
      .catch(error => {
        this.setState({loading:false});
        console.log("Error mannen")
        console.log(error);
      })

  }

  render(){
    return (
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <Button raised disabled={this.state.loading}
                onClick={(e) => {e.stopPropagation(); this.createOrder()}}
                style={{width:'100%'}}>
                Buy
              </Button>
            </GridCell>
            <GridCell desktop="12" tablet='8' phone='4' className='h-center'>
              <div id="klarna_container">
                <div id="klarna-payments-container"> Klarna</div>
              </div>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }

}

export default Shop;
