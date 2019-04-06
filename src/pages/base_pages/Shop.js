import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'


import { CircularProgress } from '@rmwc/circular-progress';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { getCreditSession } from '../../api/shopCalls';

class Shop extends Component {
  constructor(props){
    super(props);
    this.state = { loading: false, show_form:false  }
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


        window.Klarna.Payments.init({
          client_token: response.data.client_token
        })
        // console.log(response.data.payment_method_categories[0].identifier)
        window.Klarna.Payments.load({
          container: '#klarna-payments-container',
          payment_method_category: response.data.payment_method_categories[0].identifier
        },  (res) => {
          //   if (!show_form ){
          //     Fix Dialog window with error display
          //     console.log("ERROR: ", res.error)
          //   }else {
          // {this.setState({show_form:true})}
          //   }
          console.debug(res);
          console.log(res.show_form);
          this.setState({loading:false, show_form:true})

          // this.setState({show_form:true})

        })


      })
      .catch(error => {
        this.setState({loading:false});
        console.log("Error mannen")
        console.log(error);
      })

  }
  authOrder(response){
    console.log("Starting authorizing order")
    this.setState({loading:true})

  }

  render(){
    return (
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>

            <GridCell desktop="12" tablet='8' phone='4' className='h-center'>
              <div id="klarna_container">
                <div id="klarna-payments-container">

                </div>
                {(this.state.show_form === true) ?
                    <Button raised disabled={this.state.loading}
                    onClick={(e) => {e.stopPropagation(); this.authOrder()}}
                    style={{width:'100%'}}>
                      Buy
                    </Button>
                  :
                  (!this.state.loading) ?
                    <Button raised disabled={this.state.loading}
                      onClick={(e) => {e.stopPropagation(); this.createOrder()}}
                      style={{width:'100%'}}>
                      Checkout
                    </Button>
                    :
                    null
                }
              </div>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }

}

export default Shop;
