import React from 'react';
import { ListDivider } from '@rmwc/list';

class Header extends React.Component {
  render(){
    var HeaderType = 'h4';
    if(this.props.tag){
        HeaderType = this.props.tag;
    }
    return(
      <div
        style={{...this.props.style, display: 'flex', alignItems: 'center'}}
      >
        <ListDivider style={{width: '100%'}}/>
        <HeaderType style={{flexGrow: '2', flexShrink: '0', margin: '0px 12px'}}>
          {this.props.children}
        </HeaderType>
        <ListDivider style={{width: '100%'}}/>
      </div>
    )
  }
}

export default Header;
