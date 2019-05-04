import React, { Component } from 'react';
import { GridCell } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';
import { FormattedMessage, injectIntl } from 'react-intl';
import OrderItemCard from '../shop/OrderItemCard';
import LoadButton from '../forms/components/LoadButton';



class ShowTickets extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render () {

    console.log(this.props.items);

    // if( !(Object.keys(this.props.items).length === 0 && this.props.items.constructor === Object))
    // {

    {/* Nullcheck */}
    if(this.props.items !== null){
      console.log(this.props.items);
      const collectedItems = [];
      const unCollectedItems = [];

      Object.entries(this.props.items).forEach((item) => (
          (!item.collected) ?
            collectedItems.push(item) :
            unCollectedItems.push(item)
        ))

      console.log("This is the collected items");

      Object.keys(collectedItems).map((key) =>
        console.log(collectedItems[key][1])
      )


      return (
        <React.Fragment>
          <GridCell desktop='12' tablet='8' phone='4'>
            These are your tickets to pick up
          </GridCell>


          {Object.keys(collectedItems).map((key) =>
            (
              <GridCell desktop='12' tablet='8' phone='4' key={collectedItems[key][1].id} style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
                <OrderItemCard
                  item={{product_id: collectedItems[key][1].product_id, amount: collectedItems[key][1].amount}}
                  />
              </GridCell>
            )
          )}
          Biljetter som redan har hämtats ut
          {Object.keys(unCollectedItems).map((item) =>
            (
              <GridCell desktop='12' tablet='8' phone='4' key={item.id} style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
                <OrderItemCard
                  item={{product_id: 2, amount: 1}}
                />
              </GridCell>
            )
          )}
        </React.Fragment>);

    }

    return <React.Fragment> Inget att hämta ut </React.Fragment>
      // return <GridCell> collectedItems;
      //
      // const hasTypes = baseProduct.products.length > 1;
      // const amt = product.amount_left;


      { /*
    } else {
      return (
        <React.Fragment>
            <GridCell desktop='12' tablet='8' phone='4'>
              <FormattedMessage id='Shop.no_items' />
            </GridCell>
        </React.Fragment>
      );
    }
    */}
  }
}


export default ShowTickets;
