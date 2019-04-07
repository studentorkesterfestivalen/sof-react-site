import React, {Component} from 'react'

import { Grid } from '@rmwc/grid'
import Klarna from '../../components/Klarna'


class Shop extends Component
{
  constructor(props){
    super(props);
  }

  static pageTitle(){
    return "Shop";
  }

  static pageNavTitle(){
    return "Shop";
  }

  render(){
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <Klarna/>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Shop;
