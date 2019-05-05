import React, { Component } from 'react';
import { GridCell } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';
import { FormattedMessage, injectIntl } from 'react-intl';
import OrderItemCard from '../shop/OrderItemCard';
import LoadButton from '../forms/components/LoadButton';

import { openDialog } from '../../actions/dialog';
import Header from '../page_components/NiceHeader';
import { collectItems } from '../../api/ticketPickupCalls';
import { connect } from 'react-redux';

class ShowTickets extends Component{
  constructor(props){
    super(props);
    this.state = { loading: false, currUser: this.props.user };
  }

  collectItems = (items, userID) => {

    this.setState({loading:true});
    const item_text = <React.Fragment>
    {items.map((item) => {
      const prodName = "" + item[1].amount + "x " + item[1].product.base_product['name'];
      const suffix = (item[1].product.base_product_id > 1) ? "(" + item[1].product.kind + ")" : "";
      return(
        <React.Fragment>
          { prodName + suffix}
          <br/>
        </React.Fragment>
      );
    })}
    </React.Fragment>

    if (this.state.currUser.owned_items.length !== 0) {
      const collectedIds = this.state.currUser.owned_items.map( item => {
        return item.id;
      });
      collectItems(collectedIds, userID)
        .then( res => {
          this.setState({loading:false});
          this.props.collectedTickets();
          this.props.openDialog('Dela ut', item_text);
          console.log(res)
          this.setState({ currUser: res.data })
        })
        .catch( err => {
          this.setState({loading:false});
          this.props.openDialog('Så jäkla icke-tungt', 'Något gick fel. Ge fan inte billarna');
        });
      }
  }

  render () {


    // if( !(Object.keys(this.props.items).length === 0 && this.props.items.constructor === Object))
    // {

    /* Nullcheck */
    if(this.state.currUser !== null){
      var collectedItems = [];
      var unCollectedItems = [];

      Object.entries(this.state.currUser.owned_items).forEach((item) => (
          (item[1].collected) ?
            collectedItems.push(item) :
            unCollectedItems.push(item)
        ))


      return (
        <React.Fragment>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Header>
              <div style={{color:"#0c726f"}}>
                Biljetter som kan hämtas ut
              </div>
            </Header>
          </GridCell>

          {(unCollectedItems.length > 0) ?
            <React.Fragment>

              {Object.keys(unCollectedItems).map((key) =>
              (
                <GridCell desktop='12' tablet='8' phone='4' key={unCollectedItems[key][1].id} >
                  <OrderItemCard
                    item={{product_id: unCollectedItems[key][1].product_id, amount: unCollectedItems[key][1].amount}}
                    />
                </GridCell>
              ))
              }
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <LoadButton raised
                onClick={() => this.collectItems(unCollectedItems, this.state.currUser.id)}
                style={{width:'100%'}}
                loading={this.state.loading}
              >
                Hämta alla
              </LoadButton>
              </GridCell>
            </React.Fragment>

            : null
          }

          <GridCell desktop='12' tablet='8' phone='4'>
            <Header>
              <div style={{color:"#FF0000"}} >
                Biljetter som redan har hämtats ut
              </div>
            </Header>
          </GridCell>
          {(collectedItems.length > 0) ?

            Object.keys(collectedItems).map((key) =>
            (
              <GridCell desktop='12' tablet='8' phone='4' key={collectedItems[key][1].id} >
                <OrderItemCard
                  item={{product_id: collectedItems[key][1].product_id, amount: collectedItems[key][1].amount}}
                />
              </GridCell>
            )
          )
          : null
          }
        </React.Fragment>);
    }
  }
}


export default connect(null, { openDialog })(ShowTickets);
