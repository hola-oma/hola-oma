import React from 'react';
import { render, fireEvent, waitFor, wait } from '@testing-library/react';
import * as UserService from 'services/user';

// the component to test 
import Register from '../Register';
import { getUserSettings } from 'services/user';

describe('Register Page', () => {
  let createNewUserWithEmailAndPasswordSpy: any;
  let container: any;
  let getByText: any;

  beforeEach(() => {
    createNewUserWithEmailAndPasswordSpy = jest.spyOn(UserService, 'createNewUserWithEmailAndPassword').mockReturnValue(Promise.resolve(true));

    // container = array of DOM nodes on the page
    // getByText = built-in utility function for getting elements by the text they contain 
    // getByLabelText = not used below, but another option for getting form fields by label 
    const { container: wrapper, getByText: getByTextFn } = 
      render(
        <Register />
      );

    container = wrapper;
    getByText = getByTextFn;

  });

  test('The registration page is properly formed', async() => {
    
    // arrange
    const header = getByText('Register a new account');
    const bigInputLabels = container.querySelectorAll('.bigInputLabel'); // should be 2 of them 
    const signUpButton = getByText('Sign up');
  
    const errorAlert = container.querySelectorAll('.errorAlert'); // get by ID 
    
    // act
    // nothing to click or "do" here, moving along to asserts...
  
    // assert
    // expect(container).toMatchSnapshot();
    expect(header).toBeInTheDocument();
    expect(bigInputLabels.length).toBe(2);
    expect(bigInputLabels[0]).toHaveTextContent("E-Mail Address");
    expect(bigInputLabels[1]).toHaveTextContent("Password");
  
    expect(signUpButton).toBeInTheDocument();
  
    expect(errorAlert.length).toBe(0); // error shouldn't show by default 
  });
  
  test('The registration form cannot be submitted empty', async() => {
    
    // arrange
    const signUpButton = getByText('Sign up');
  
    // act 
    // click the register button 
    fireEvent.click(signUpButton);
  
    await waitFor(() => container.querySelectorAll('.errorAlert'));
  
    // assert
    expect(container.querySelectorAll('.errorAlert').length).toBe(1); // error alert should be visible now
  
  });
  
  test('The registration form can be submitted with a valid email address and valid password', async() => {
  
    // arrange
    const signUpButton = getByText('Sign up');

    const bigInputLabels = container.querySelectorAll('.bigInput'); // should be 2 of them 
    const emailInput = bigInputLabels[0].querySelectorAll('input')[0];
    const passwordInput = bigInputLabels[1].querySelectorAll('input')[0];
  
    const mockEmail = "test@successful.com";
    const mockPassword = "1234567";
    const mockEmailEvent = {target: {value: mockEmail}};
    const mockPasswordEvent = {target: {value: mockPassword}};
  
    // act
    fireEvent.change(emailInput, mockEmailEvent);
    fireEvent.change(passwordInput, mockPasswordEvent);
  
    // assert
    expect(emailInput.value).toBe(mockEmail);
    expect(passwordInput.value).toBe(mockPassword);

    // act (part 2)
    // click the submit button
    fireEvent.click(signUpButton);

    await waitFor(() => {});
  
    expect(createNewUserWithEmailAndPasswordSpy).toHaveBeenCalled();
  
  });
});