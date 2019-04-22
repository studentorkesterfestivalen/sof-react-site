import React, { Component } from 'react';

import CartItemCard from './CartItemCard';

import { signOutUser } from '../../redux-token-auth-config'

import { setAccountPopupOpen } from '../../actions/login';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';
import { CircularProgress } from '@rmwc/circular-progress';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import posed from 'react-pose/lib/index';
import { FormattedMessage, injectIntl } from 'react-intl';

import { IconButton } from '@rmwc/icon-button';

import {
  List,
  ListItem,
  ListItemMeta,
  ListItemGraphic, 
  ListDivider

} from '@rmwc/list';

import { addProductToCart, fetchCart, removeProductFromCart } from '../../actions/cart'



const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  cart: state.cart.cart,
  cartLoading: state.cart.loading,
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  productsLoading: state.shop.loading,
  //isOpen: state.login.accountPopupOpen,
});

class UNCDesktopShopPopup extends React.PureComponent {

  setPopupState = (state) => {
    //this.props.setShopPopupOpen(state);
  }

  render(){

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.props.isOpen}
        //onOpen={()=>this.setPopupState(true)}
        //onClose={()=>this.setPopupState(false)}
        handle={<TopAppBarActionItem icon='shopping_cart'/>}
        >
       <ShopPopupContent {...this.props}/>
      
      </SimpleMenuSurface>
    );
  }
}
export const DesktopShopPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser}) (UNCDesktopShopPopup));

class UNCShopPopupContent extends Component{

  componentDidMount() {
    this.props.fetchCart();
  }

  fetchCart = () => {
    // this.setState( {items: {}}, () => {
    //   localStorage.setItem('cart', JSON.stringify([]));
    // })
    //this.props.fetchCart();
    const cart = localStorage.getItem('cart');
    const parsedCart = JSON.parse(cart);
    const updatedCart = {...parsedCart,  '1' : {quantity: 1}};
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ items: updatedCart })
  }

  removeItemFromCart = () => {
    this.props.removeProductFromCart({ product_id: 1 })
  }

  addCallbackHandler = (id) => {
    this.props.addProductToCart(id);
  }

  RemoveCallbackHandler = (id) => {
    this.props.removeProductFromCart(id);
  }

  handleChange = (id, target) => {
    this.setState({items: {...this.state.items, [id]: {quantity: target.value}}});
  }

  render(){
    const isLoading = this.props.cartLoading || this.props.productsLoading;

    var content =
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <CircularProgress size="large" />
      </GridCell>;

    if (!isLoading && Object.keys(this.props.cart).length === 0) { 
      content = 
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='Cart.empty'/> 
        </GridCell>
    } else if(!isLoading && this.props.products !== null) {
      var totCost = 0;
      Object.keys(this.props.cart).forEach( key =>{
        const baseProd = this.props.products[this.props.baseProducts[key].base_id];
        const productCost = baseProd.products[this.props.baseProducts[key].prod_id].actual_cost;
        totCost += productCost * this.props.cart[key]
      });

      content = 
        <React.Fragment>
          {Object.keys(this.props.cart).map((key) => (
            <GridCell desktop='12' tablet='8' phone='4' key={key} >
              <CartItemCard 
                addCallback={this.addCallbackHandler}
                removeCallback={this.RemoveCallbackHandler}
                handleChangeCallback={this.handleChange}
                item={{prodID: key, amount: this.props.cart[key]}} 
              />
            </GridCell>
          ))}
          <GridCell desktop='12' tablet='8' phone='4'>
            <ListDivider/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
            <b>
              <FormattedMessage id='Cart.total' />
            </b>
            <b>
            {totCost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
            </b>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('/checkout')}>
              <FormattedMessage id='Cart.checkout' />
            </Button>
          </GridCell>
        </React.Fragment>
    }
      
    return(
      <React.Fragment>
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <FormattedMessage id='Cart.cart'/>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                <ListDivider/>
              </GridCell>
              
            </GridInner>
        </Grid>
        <Grid>
          <GridInner>
            {!isLoading ? content : null}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export const ShopPopupContent = injectIntl(withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser, fetchCart, addProductToCart, removeProductFromCart })(UNCShopPopupContent)));
