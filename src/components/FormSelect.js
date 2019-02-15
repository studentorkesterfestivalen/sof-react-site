import React, { Component } from 'react';
import { Select } from '@rmwc/select';

class FormSelect extends React.Component {


  handleChange = value => {
    // this is going to call setFieldValue and manually update values.instr
    this.props.onChange(this.props.field, value.target.value);
    if (this.props.specialAns) {
      this.props.specialAns(value.target.value);
    }
  };

  handleBlur = () => {
    //this is going to call setFieldTouched and manually update touched.topcis
   this.props.onBlur(this.props.field, true);
  };

  render() {
    return (
      <React.Fragment>
        <Select
          enhanced
          label={this.props.label}
          options={this.props.options}
          //multi={true}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
      </React.Fragment>
    );
  }
}

export default FormSelect;