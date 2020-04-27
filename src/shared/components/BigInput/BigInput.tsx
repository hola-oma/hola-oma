import React from 'react';
import { TextField } from '@material-ui/core';
import './BigInput.css';

/* Material UI's inputs have very tiny labels, so this is
a "customized" input designed to have a large label */

interface IBigInput {
  labelText: string,
  name: string,
  required: boolean,
  value: string,
  autoFocus: boolean,
  autoComplete: string,
  type: string,
  onChange: (e:any) => void,
}

// Notes:
// autoComplete is more like "auto fill", spec can be found here:
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
// Pass the string "off" to disable autofill, 
//   ie: you might want to autofill for a returning user (login) but not for a registering user
//       you might also not want to autofill the password (or maybe you do)

// "type" tells the browser what kind of data this field holds
// it is useful for obscuring passwords 

const BigInput: React.FC<IBigInput> = ({ labelText, name, required, value, autoFocus, autoComplete, type, onChange }) => {
  
  const inputProps = {
    type: type,
  };

  return (
    <div className="bigInput">
    <span className="bigInputLabel">{labelText}</span>
    <TextField
      name="displayName"
      variant="outlined"
      required={required}
      fullWidth
      id={name}
      autoFocus={autoFocus}
      value={value}
      autoComplete={autoComplete}
      inputProps={inputProps}
      onChange={onChange}
    />
    </div>
  )
}

export default BigInput;