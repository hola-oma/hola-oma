import React from 'react';
import { Button } from '@material-ui/core';
import Child from './Child/Child';

interface IFormSubmitButton {
  buttonText: String
}

const FormSubmitButton: React.FC<IFormSubmitButton> = ({ buttonText }) => {
  return (
    <Child item xs={12}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="bigButton"
        id="formSubmitButton"
      >
        {buttonText}
      </Button>
    </Child>
  )
}

export default FormSubmitButton;