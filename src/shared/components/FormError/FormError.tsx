import React from 'react';
import { Alert } from '@material-ui/lab';
import Child from '../Child/Child';

import './FormError.css';

interface IFormError {
  error: String;
  severity?: "error" | "success" | "info" | "warning" | undefined;
}

const FormError: React.FC<IFormError> = ({ error, severity="error" }) => {
  return (
    <>
      {error && 
        <Child item xs={12}>
          <Alert severity={severity} className={`${severity+'Alert'}`}>{error}</Alert>
        </Child>
      }
    </>
  )
}

export default FormError;
