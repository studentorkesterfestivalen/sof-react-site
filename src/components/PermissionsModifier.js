giimport React from 'react';
import { render } from "react-dom";
import { Formik, FieldArray } from "formik";

const categories = [
  { id: "0", name: "All" },
  { id: "1", name: "Orchestra Admin" },
  { id: "2", name: "List Orchestra Signups" },
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


export const PermissionsModifier = () => (
  <React.Fragment>
    <Formik
      initialValues={{ Permissions: [] }}
      onSubmit={""
      }
      render={({ values }) => (
        <React.Fragment>
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
                      />{" "}
                      {category.name}
                    </label>
                  </div>
                ))}
              </React.Fragment>
            )}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </React.Fragment>
      )}
    />
  </React.Fragment>
);
