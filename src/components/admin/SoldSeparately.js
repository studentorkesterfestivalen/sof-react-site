import React, {Component} from 'react';
import { GridInner, GridCell } from '@rmwc/grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import { Formik, Form } from 'formik/dist/index';
import {Button} from '@rmwc/button'
import LoadButton from '../forms/components/LoadButton';
import { connect } from 'react-redux';
import api from '../../api/axiosInstance';

const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products,
});

class SoldSeparately extends Component {
  constructor(props){
    super(props);
    this.state = { loading : false, dialogOpen : false, dialogTitle: "", dialogMessage : "" , patches: 0, saturday_tickets:0};
  }


  increase = (prod_id, amount_tickets) => {
    this.setState({loading:true});
    api.put('/shopping_product/sold_separately', { product_id: prod_id, amount: amount_tickets}, {timeout: 1000*10})
      .then(response => {
        this.setState({loading:false, dialogOpen:true, dialogMessage: "Lyckades"});
      })
      .catch((e) => {
        this.setState({loading:false, dialogOpen:true, dialogMessage: "Misslyckades"});
      })
  };

  render(){
    // const baseProductIds = this.props.baseProducts[prodID];
    // const baseProduct = this.props.products[baseProductIds['base_id']];
    // const product = baseProduct.products[baseProductIds['prod_id']];


    // const { prodID, amount } = this.props.item;



    const products = this.props.products;
    return (
      <React.Fragment>
      <Dialog
        open={this.state.dialogOpen}
        onClose={(evt) => {
          this.setState({ dialogOpen:false })
        }}
        className='unclickable-scrim-dialog'
        >
        <DialogTitle>
          {this.state.dialogTitle}
        </DialogTitle>
        <DialogContent>
          {this.state.dialogMessage}
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" type='button' isDefaultAction>
            Stäng
          </DialogButton>
        </DialogActions>
      </Dialog>

        <GridInner>
          <GridCell desktop="12" tablet="8" phone="4" >
          <Button  onClick={() => this.setState({ saturday_tickets: this.state.saturday_tickets-1})}>
          -
          </Button>
            {this.state.saturday_tickets}
            <Button  onClick={() => this.setState({saturday_tickets: this.state.saturday_tickets+1})}>
            +
            </Button>
            <LoadButton raised loading={this.state.loading} onClick={() => {
              this.setState({dialogTitle: "Försökte köpa " + this.state.saturday_tickets + " lördagsbiljetter"});
              this.increase(4, this.state.saturday_tickets)}} >
              Köp lördagsbiljett
            </LoadButton>
          </GridCell>
          <GridCell desktop="12" tablet="8" phone="4" >
          <Button  onClick={() => this.setState({patches: this.state.patches-1})}>
          -
          </Button>
            {this.state.patches}
            <Button  onClick={() => this.setState({patches: this.state.patches+1})}>
            +
            </Button>
            <LoadButton raised loading={this.state.loading} onClick={() =>{
              this.setState({dialogTitle: "Försökte köpa " + this.state.patches + " märken"});
              this.increase(3, this.state.patches)
            }}>
              Köp Märke
            </LoadButton>
          </GridCell>
        </GridInner>
      </React.Fragment>
    );

  }
};

export default connect(mapStateToProps)(SoldSeparately);
