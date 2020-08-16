import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (

          <div>
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          </div>
        )        
      } else {
        return '';
      }
    })}
  </div>