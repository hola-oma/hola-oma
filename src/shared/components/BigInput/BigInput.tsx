import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './BigInput.css';

/* Material UI's inputs have very tiny labels, so this is
a "customized" input designed to have a large label */

interface IBigInput {
  error: boolean,
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

const BigInput: React.FC<IBigInput> = ({ error, labelText, name, required, value, autoFocus, autoComplete, type, onChange }) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const passwordVisible = () => {
    if (showPassword) {
      return 'text';
    } else {
      return 'password';
    }
  }

  const passwordAdornment = () => {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      );
  }

  return (
    <div className="bigInput">
      <span className="boldText bigInputLabel">{labelText}</span>
      <TextField
        error={error}
        name="displayName"
        variant="outlined"
        required={required}
        fullWidth
        id={name}
        autoFocus={autoFocus}
        value={value}
        autoComplete={autoComplete}
        InputProps={{
          type: type === "password" ? passwordVisible() : type, // if type is password, use passwordVisible to determine type, otherwise pass type through
          endAdornment: type === "password" ? passwordAdornment() : ''}}
        onChange={onChange}
      />
    </div>
  )
}

export default BigInput;