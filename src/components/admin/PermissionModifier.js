import React, { Component } from 'react';
import { render } from "react-dom";
import { Button } from '@rmwc/button';
import { Formik, FieldArray, Form } from "formik/dist/index";
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





class PermissionModifier extends Component{
  constructor(props){
    super(props);

    this.changePermissions = this.changePermissions.bind(this);
  }



  changePermissions(values, bag) {

    var sum = values.Permissions.reduce(
      (accumulator, currentValue) =>
      accumulator + Math.pow(2, currentValue), 0
    );
{/*    changePermissions(sum)
    .then( (response) => {

    })
    .catch((error) => {
      let errors = {};
      for (let key in error.response.data.errors) {
        errors[key] = error.response.data.errors[key][0]; // for now only take the first error of the array
      }

      console.log("Error when trying to change permissions: ", errors);
      bag.setErrors(errors);
    })
    console.log(sum);

    bag.setSubmitting(false);*/}

  };

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{ Permissions: [ ] }}
          onSubmit={this.changePermissions}
          render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
            <Form style={{width: '100%'}} className='update-admin-permissions'>
              <FieldArray
                name="Permissions"
                render={arrayHelpers => (
                  <React.Fragment>
                    {categories.map(category => (
                      <div key={category.id}>
                        <label>
                          <input
                            name="Permissions"
                            type="checkbox"
                            value={category.id}
                            checked={values.Permissions.includes(category.id)}
                            onChange={e => {
                              if (e.target.checked) arrayHelpers.push(category.id);
                              else {
                                const idx = values.Permissions.indexOf(category.id);
                                arrayHelpers.remove(idx);
                              }
                            }}
                          />{""}
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              />
              <Button raised type='submit' disabled={!isValid || isSubmitting }>
                Change admin permissions
              </Button>

              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        />
      </React.Fragment>
    );
  };
}

export default PermissionModifier;
