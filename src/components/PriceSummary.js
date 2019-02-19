import React, { PureComponent, forwardRef } from 'react';

import { SimpleDataTable } from '@rmwc/data-table';

import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';

class PriceSummary extends PureComponent {
  // constructor(props){
  //   super(props)
  // }

  getSum = () => {
    return this.props.data.reduce( function(a, b){
      if(b.length !== 0){
        return a + b[3];
      } else{
        return a;
      }
    }, 0);
  }

  render(){
    console.log(this.props.intl);
    return(
      <React.Fragment>
        <SimpleDataTable
          getRowProps={row => {
            return row[0] === this.props.intl.formatMessage({id :'Prices.Total'}) ?
              {style: {fontWeight: 'bold'}} : {}
          }}
          getCellProps={(cell, index, isHead) => {
            return !isHead && cell &&(index === 2 || index ===3) ? {
                className: this.props.intl.locale === 'sv' ? 'addKr' : 'addSek',
              } : {}
          }}
          headers={[[
            this.props.intl.formatMessage({id :'Prices.Product'}),
            this.props.intl.formatMessage({id :'Prices.Amount'}),
            this.props.intl.formatMessage({id :'Prices.Each'}),
            this.props.intl.formatMessage({id :'Prices.Price'}),
          ]]}
          data={
            this.props.data
            .concat([[
              this.props.intl.formatMessage({id :'Prices.Total'})
              ,"","", this.getSum()
            ]])
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: state.isMobile
});

export default connect(mapStateToProps)(injectIntl(PriceSummary));
