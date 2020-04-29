import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

// the component to test 
import Register from '../Register';

test('The registration page is properly formed', async() => {
  // arrange
  // container = array of DOM nodes on the page
  // getByText = built-in utility function for getting elements by the text they contain 
  // getByLabelText = not used below, but another option for getting form fields by label 
  const { container, getByText } = 
    render(
      <Register />
  )

  //expect(container).toMatchSnapshot();
  
  const header = getByText('Register a new account');
  const bigInputLabels = container.querySelectorAll('.bigInputLabel'); // should be 2 of them 
  const signUpButton = getByText('Sign up');

  const errorAlert = container.querySelectorAll('.errorAlert'); // get by ID 
  
  // act
  // nothing to click or "do" here, moving along to asserts...

  // assert
  expect(header).toBeInTheDocument();
  expect(bigInputLabels.length).toBe(2);
  expect(bigInputLabels[0]).toHaveTextContent("E-Mail Address");
  expect(bigInputLabels[1]).toHaveTextContent("Password");

  expect(signUpButton).toBeInTheDocument();

  expect(errorAlert.length).toBe(0); // error shouldn't show by default 
});

// todo: user tries to submit empty form
test('The registration form cannot be submitted empty', async() => {
  // arrange
  const { container, getByText } = 
    render(
      <Register />
  )
  const signUpButton = getByText('Sign up');

  // act 
  // click the register button 
  fireEvent.click(signUpButton);

  await waitFor(() => container.querySelectorAll('.errorAlert'));

  // assert
  expect(container.querySelectorAll('.errorAlert').length).toBe(1); // error alert should be visible now

});

// todo: user tries to submit form with no password
// todo: mock server response if user tries to register an email address that exists already