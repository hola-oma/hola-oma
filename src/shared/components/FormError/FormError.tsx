import React from 'react';
import { Alert } from '@material-ui/lab';
import Child from '../Child/Child';

import './FormError.css';

interface IFormError {
  error: String
}

const FormError: React.FC<IFormError> = ({ error }) => {
  return (
    <>
      {error && 
        <Child item xs={12}>
          <Alert severity="error" className="errorAlert">{error}</Alert>
        </Child>
      }
    </>
  )
}

export default FormError;
