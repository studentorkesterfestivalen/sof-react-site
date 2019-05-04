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
        style={{display: 'flex', alignItems: 'center'}}
      >
        <ListDivider style={{width: '100%'}}/>
        <div style={{width: '100%', maxWidth: '12px'}}/>
        <HeaderType style={{flexGrow: '2', flexShrink: '0', margin: '0px'}}>
          {this.props.children}
        </HeaderType>
        <div style={{width: '100%', maxWidth: '12px'}}/>
        <ListDivider style={{width: '100%'}}/>
      </div>
    )
  }
}

export default Header;
