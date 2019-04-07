import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'

 import { Redirect} from 'react-router-dom';

import { CircularProgress } from '@rmwc/circular-progress';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { getCreditSession, placeOrder } from '../../api/shopCalls';

class Shop extends Component {
  constructor(props){
    super(props);
    this.state = { loading: false, show_form:false }
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
        window.Klarna.Payments.load({
          container: '#klarna-payments-container',
          instance_id: 'klarna-payments-instance', // Change later, unique for each user?!
          payment_method_category: response.data.payment_method_categories[0].identifier
        },  (res) => {
          // Required to use arrow function to stay with the component as "this"
          // and be able to set this.state

          this.setState({loading:false, show_form:true});
          {/*response.data.payment_method_categories[0].identifier*/}
          {/* pay_now : Option not available, please choose a different payment method */}

          // Need to add some error handling here as well
        })
      })
      .catch(error => {
        this.setState({loading:false, show_form:false});
        console.log("Error mannen");
        console.log(error);
      })

  }

  authOrder(response){
    console.log("Starting authorizing order")
    this.setState({loading:true})
    try {
      window.Klarna.Payments.authorize({ payment_method_category: "pay_now", auto_finalize: false},
      {  instance_id: 'klarna-payments-instance'
      },  (res) => {
        // authorize~callback
        console.log(res);
        placeOrder(res.authorization_token)
          .then(redirect_url => {
            console.log(redirect_url.data);
            window.location.replace(redirect_url.data);
          })
          .catch(error => {
            console.log(error);
          })

      })
    } catch (e) {
        // Handle error. The authorize~callback will have been called
        // with "{ show_form: false, approved: false }" at this point.
    }

  }

  render(){
    return (
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>

            <GridCell desktop="12" tablet='8' phone='4' className='h-center'>
              <div id="klarna_container">
                <img src={"https://cdn.klarna.com/1.0/shared/image/generic/logo/sv_se/basic/logo_black.png?width=300"} />
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
