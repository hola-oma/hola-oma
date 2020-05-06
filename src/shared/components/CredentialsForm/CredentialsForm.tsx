import React from 'react';
import FormSubmitButton from '../FormSubmitButton';
import FormError from '../FormError/FormError';
import FormSuccess from '../FormSuccess/FormSuccess';

/* This form is used for "user account" type forms
   ex: Register, Login, Settings, addAccountLink... probably more...

   showSuccess is optional and used only on forms that have a 'success' message
   which at this time is only the password reset form
*/

interface ICredentialsForm {
  onSubmit: any,
  submitText: String,
  showSuccess?: boolean,
  error: String
}

const CredentialsForm: React.FC<ICredentialsForm> = ({ onSubmit, submitText, error, showSuccess = false, children }) => {
  return (
    <form onSubmit={onSubmit} className="credentialsForm" noValidate>
      {children}

      <FormSubmitButton buttonText={submitText}/>
      <FormError error={error}/>
      <FormSuccess show={showSuccess} message="E-mail sent! Check your inbox."/>

    </form>
  )
}

export default CredentialsForm;