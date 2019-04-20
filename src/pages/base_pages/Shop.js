import React, { Component } from 'react';

import ArticleCard from '../../components/page_components/ArticleCard';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { withRouter } from 'react-router-dom';

import { fetchProducts } from '../../actions/shop';
import { connect } from 'react-redux'

const test_articles = [
  {name: 'Biljett - Torsdag', description: 'hi hello my name is a text that explains this product', cost: 1337, id: 0, imageURL:'https://www.eventwristbands.com/images/products/7616.png' },
  {name: 'Biljett - Fredag', description: 'Hejsan hoppsan en sådan grej, hipp hurra och hej', cost: 42, id: 1, imageURL: 'https://www.wristband.com/getmedia/00c5dd96-7d96-4330-a1cf-a91ffe02fd05/tyvek.png.aspx'},
  {name: 'Biljett - Lördag', description: 'Tagga SOF!', cost: 9001, id: 2, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/615mvW2E03L._SX425_.jpg'},
  {name: 'Biljett - Helhelg', description: 'bing bing bong', cost: 13, id: 3, imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmVgAlNz8TvpImvL_-UusOPUtbM-ym-o0vcp2V0fQFDjeYpXQSQ'},
  {name: 'Märke', description: 'Visa bandeeen', cost: 3.14, id: 4, imageURL: 'https://cdn.shopify.com/s/files/1/1275/7969/products/pretty-useful-co-send-noods-patch_1024x.jpg?v=1517845970'},
]

class Shop extends Component{
  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  componentDidMount(){
    this.props.fetchProducts();
  };

  static pageTitle(){
    return <FormattedMessage id='Shop.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Shop.navTitle' />
  }

  render() {
    const articles = test_articles.map(article => (
      <GridCell phone='4' tablet='4' desktop='6'>
        <ArticleCard
          article={article}
        />
      </GridCell>
    ));
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            {articles}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(null, {fetchProducts})(withRouter(injectIntl(Shop, { withRef: true })));
