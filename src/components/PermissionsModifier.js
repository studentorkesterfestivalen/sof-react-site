import React, { Component } from 'react';
import { render } from "react-dom";

import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';

import { Formik, FieldArray } from "formik";
import * as Yup from 'yup';

const categories = [
  { id: "0", name: "All" },
  { id: "1", name: "Orchestra Admin" },
  { id: "2", name: "List Orchestra Signups # Not used atm!" },
  { id: "3", name: "Modify Arrticles" },
  { id: "4", name: "List Users" },
  { id: "5", name: "Modify Users" },
  { id: "6", name: "Delete Users" },
  { id: "7", name: "List Cortege Applications" },
  { id: "8", name: "Approve Cortege Applications" },
  { id: "9", name: "List Funkis Applications" },
  { id: "10", name: "Analyst" },
  { id: "11", name: "Ticketer" },
  { id: "12", name: "Editor" }
];


const changePermissions = (values, bag) => {
  console.log(values);
  console.log("Inne")
}


class PermissionsModifier extends Component{
  constructor(props){
    super(props);
    this.state = {
      "0"  : true,
      "1"  : true,
      "2"  : true,
      "3"  : true,
      "4"  : true,
      "5"  : true,
      "6"  : true,
      "7"  : true,
      "8"  : true,
      "9"  : true,
      "10" : true,
      "11" : true,
      "12" : true

    }
  }



  render(){
    const content = categories.map( (index, category) =>
      <Checkbox
          label={category.name}
          key={category.id}
          checked={this.state[category.id] || false}
          onChange={evt => this.setState({[category.id]: evt.target.checked})}
        />
    )
    return(
      <React.Fragment>

        { content }

      </React.Fragment>
    );
  }
  // <React.Fragment>
  //   <Formik
  //     initialValues={{ Permissions: [ ] }}
  //     onSubmit={changePermissions()}
  //     render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
  //       <React.Fragment>
  //         <FieldArray
  //           name="Permissions"
  //           render={arrayHelpers => (
  //             <React.Fragment>
  //               {categories.map(category => (
  //                 <div key={category.id}>
  //                   <label>
  //                     <input
  //                       name="Permissions"
  //                       type="checkbox"
  //                       value={category.id}
  //                       checked={values.Permissions.includes(category.id)}
  //                       onChange={e => {
  //                         if (e.target.checked) arrayHelpers.push(category.id);
  //                         else {
  //                           const idx = values.Permissions.indexOf(category.id);
  //                           arrayHelpers.remove(idx);
  //                         }
  //                       }}
  //                     />{" "}
  //                     {category.name}
  //                   </label>
  //                 </div>
  //               ))}
  //             </React.Fragment>
  //           )}
  //         />
  //         <Button raised type='submit' disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
  //           Change admin permissions
  //         </Button>
  //
  //         <pre>{JSON.stringify(values, null, 2)}</pre>
  //       </React.Fragment>
  //     )}
  //   />
  // </React.Fragment>
};

export default PermissionsModifier;
