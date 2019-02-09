import React, { PureComponent, forwardRef } from 'react';

import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';

import posed from 'react-pose';

const FTextFieldHelperText = forwardRef((props, ref) => (
  <TextFieldHelperText elementRef={ref} {...props}>
    {props.children}
  </TextFieldHelperText>
));

const PosedErrorText = posed(FTextFieldHelperText)({
  error: {
    height: 'auto'
  },
  noError: {
    height: '0'
  }
});


export default class FormTextInput extends PureComponent {
  constructor(props){
    super(props)
  }


  render(){
    const {touched, error, ...props} = this.props;

    const errorPose = (touched && error) ? 'error' : 'noError';
    return(
      <React.Fragment>
        <TextField 
          invalid={touched && this.props.error}
          {...props}
        />

          <PosedErrorText pose={errorPose} persistent style={{color: '#FF0000'}}>
            {touched && error}
          </PosedErrorText>

        {//touched && error && <TextFieldHelperText persistent style={{color: '#FF0000'}}>{error}</TextFieldHelperText>}
        }
      </React.Fragment>
    );
  }
}
