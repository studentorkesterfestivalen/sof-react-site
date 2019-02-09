import React, { PureComponent } from 'react';

import { TextField, TextFieldHelperText } from '@rmwc/textfield';

export default class FormTextInput extends PureComponent {
  // constructor(props){
  //   super(props)
  // }


  render(){
    const {touched, error, ...props} = this.props;
    return(
      <React.Fragment>
        <TextField 
          invalid={touched && this.props.error}
          {...props}
        />
        {touched && error && <TextFieldHelperText persistent style={{color: '#FF0000'}}>{error}</TextFieldHelperText>}
      </React.Fragment>
    );
  }
}
