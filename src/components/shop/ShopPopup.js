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
import { FormattedMessage } from 'react-intl';

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
    //localStorage.setItem('cart', JSON.stringify([]))
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
    const isLoading = this.props.cartLoading

    var content = <CircularProgress size="large" />

    if (!isLoading && Object.keys(this.props.cart).length === 0) { 
      content = 
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='Cart.empty'/> 
        </GridCell>
    } else if(!isLoading) {
      content = 
        <React.Fragment>
          {Object.keys(this.props.cart).map((key) => (
            <GridCell desktop='12' tablet='8' phone='4'>
              <CartItemCard 
                addCallback={this.addCallbackHandler}
                removeCallback={this.RemoveCallbackHandler}
                handleChangeCallback={this.handleChange}
                item={{prodID: key, amount: this.props.cart[key]}} 
                key={key} 
              />
            </GridCell>
          ))}
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

export const ShopPopupContent = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser, fetchCart, addProductToCart, removeProductFromCart })(UNCShopPopupContent));
