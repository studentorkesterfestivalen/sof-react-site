import React, { Component } from 'react';

import CartItemCard from './CartItemCard';

import { signOutUser } from '../../redux-token-auth-config'

import { setAccountPopupOpen } from '../../actions/login';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';

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

import { postProductToCart, fetchCart, deleteCartItem } from '../../actions/cart'



const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  cart: state.cart.cart.cart_items
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
  constructor(props){
    super(props)
    this.state = {items: {}, counter: 0}
    this.addItemToCart = this.addItemToCart.bind(this)
  }

  componentDidMount() {
    //localStorage.setItem('cart', JSON.stringify([]))
  }

  addItemToCart = () => {
    this.props.postProductToCart({ product_id: 1 });
    this.props.fetchCart();
    // const cart = localStorage.getItem('cart');
    // console.log(cart)
    // const parsedCart = JSON.parse(cart);
    // const updatedCart = {...parsedCart,  item1 : { product_id : 1, quantity: 1}};
    // localStorage.setItem('cart', JSON.stringify(updatedCart));
    // this.setState({ items: updatedCart })
  }

  fetchCart = () => {
    // this.setState( {items: {}}, () => {
    //   localStorage.setItem('cart', JSON.stringify([]));
    // })
    //this.props.fetchCart();
    const cart = localStorage.getItem('cart');
    console.log(cart)
    const parsedCart = JSON.parse(cart);
    const updatedCart = {...parsedCart,  '1' : {quantity: 1}};
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ items: updatedCart })
  }

  removeItemFromCart = () => {
    this.props.deleteCartItem({ product_id: 1 })
  }


  // render(){

  //   const { cart } = this.props; 
  //   console.log(cart)
    
  //   var content; 
  //   if (!cart) {
  //     content = 'No cart for u mister'
  //   }
  //   else {
  //    content = cart.length === 0 ? 'Sorry no items' : 
  //     <Grid>
  //       <GridInner>
  //         <GridCell desktop='12' tablet='8' phone='4'>
  //           <List style={{width: '100%'}}>
  //             {cart.map( (item, key) => {
  //               return <GridCell desktop='12' tablet='8' phone='4' key={key}>
  //                 <ListItem>
  //                   {item.product.base_product.name}
                    
  //                   <ListItemMeta className='h-center'>
  //                    {// Quantity: {item.quantity} 
  //                    }
  //                   </ListItemMeta>
  //                   <ListItemGraphic icon='clear' onClick={() => this.removeItemFromCart()}/>
  //                 </ListItem>
  //                 <ListDivider/>
  //               </GridCell>
  //             })
  //             }
  //           </List>
  //         </GridCell>
  //       </GridInner>
  //     </Grid>
  //   }
  addCallbackHandler = (id) => {
    this.setState({items: {...this.state.items, [id]: {quantity: this.state.items[id].quantity + 1}}});
  }

  RemoveCallbackHandler = (id) => {
    if(this.state.items[id].quantity - 1 <= 0){
      delete this.state.items[id];
      this.setState({items: {...this.state.items}})
    } else{
      this.setState({items: {...this.state.items, [id]: {quantity: this.state.items[id].quantity - 1}}});
    }
  }

  handleChange = (id, target) => {
    this.setState({items: {...this.state.items, [id]: {quantity: target.value}}});
  }

  render(){
    const content = Object.keys(this.state.items).length === 0 ? 'Sorry no items' : 
      <React.Fragment>
        {Object.keys(this.state.items).map( (key) => (
          <CartItemCard 
            addCallback={this.addCallbackHandler}
            removeCallback={this.RemoveCallbackHandler}
            handleChangeCallback={this.handleChange}
            item={{...this.state.items[key], prodID: key}} 
            key={key} 
          />
        ))}
      </React.Fragment>
      
    return(
      <React.Fragment>
        <Grid>
          <GridInner>
          
            <GridCell desktop='12' tablet='8' phone='4'>
              <h4>Cart</h4>
              <Button onClick={() => this.addItemToCart()}>
                Kuken
              </Button>
              {content}
              <Button onClick={() => this.fetchCart()}>
                Hejsan
              </Button>
              <Button onClick={ () => this.removeItemFromCart()}>
                tab ort ett item
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export const ShopPopupContent = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser, fetchCart, postProductToCart, deleteCartItem })(UNCShopPopupContent));
