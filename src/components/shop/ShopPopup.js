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

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  //isOpen: state.login.accountPopupOpen,
});

class UNCDesktopShopPopup extends React.PureComponent {

  setPopupState = (state) => {
    this.props.setShopPopupOpen(state);
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
    localStorage.setItem('cart', JSON.stringify({}));
    //this.setState(cart === null ? {items: JSON.stringify({}) } : {items: cart});
  }

  addItemToCart = () => {
    const cart = localStorage.getItem('cart');
    console.log(cart)
    const parsedCart = JSON.parse(cart);
    const updatedCart = {...parsedCart,  '1' : {quantity: 1}};
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ items: updatedCart })
  }

  removeAllItems = () => {
    this.setState( {items: {}}, () => {
      localStorage.setItem('cart', JSON.stringify({}));
    })
  }

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
              <Button onClick={this.addItemToCart}>
                Kuken
              </Button>
              {content}
              <Button onClick={this.removeAllItems}>
                Hejsan
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export const ShopPopupContent = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCShopPopupContent));
