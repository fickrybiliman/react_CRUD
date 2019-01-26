import React from 'react';

const FormErrors = ({ formErrors }) => {
  return (
    <div>
      {Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0) {
          return (
            <p 
              className = "p-3 mb-2 bg-danger text-white"
              key = {i} > {fieldName.toUpperCase()} {formErrors[fieldName]} 
            </p>
          )
        } else {
          return '';
        }
      })}
    </div>
  )
}

export default FormErrors;