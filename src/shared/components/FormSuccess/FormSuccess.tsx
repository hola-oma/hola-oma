import React from 'react';
import { Alert } from '@material-ui/lab';
import Child from '../Child/Child';

import './FormSuccess.css';

interface IFormSuccess {
  show: boolean,
  message: String
}

const FormSuccess: React.FC<IFormSuccess> = ({ show, message }) => {
  return (
    <>
      {show && 
        <Child item xs={12}>
          <Alert severity="success" className="successAlert">{message}</Alert>
        </Child>
      }
    </>
  )
}

export default FormSuccess;
