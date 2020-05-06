import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import * as UserService from 'services/user';

// the component to test 
import SignIn from '../SignIn';

describe('Sign-in Page', () => {
  let signUserInWithEmailAndPasswordSpy: any;

  beforeEach(() => {
    signUserInWithEmailAndPasswordSpy = jest.spyOn(UserService, 'signUserInWithEmailAndPassword').mockReturnValue(Promise.resolve(true));
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })

  it('The sign in page is properly formed', async() => {
    // arrange

    // container = array of DOM nodes on the page
    // getByText = built-in utility function for getting elements by the text they contain 
    // getByLabelText = not used below, but another option for getting form fields by label 
    
    const { container, getByText } = 
      render(
        <SignIn />
      );

    const header = getByText('Returning users');
    const bigInputLabels = container.querySelectorAll('.bigInputLabel'); // should be 2 of them 
    const signInButton = getByText('Sign in');
  
    const errorAlert = container.querySelectorAll('.errorAlert'); // get by ID 
    
    // act
    // nothing to click or "do" here, moving along to asserts...
  
    // assert
    // expect(container).toMatchSnapshot();
    expect(header).toBeInTheDocument();
    expect(bigInputLabels.length).toBe(2);
    expect(bigInputLabels[0]).toHaveTextContent("E-Mail Address");
    expect(bigInputLabels[1]).toHaveTextContent("Password");
  
    expect(signInButton).toBeInTheDocument();
  
    expect(errorAlert.length).toBe(0); // error shouldn't show by default 
  });
  
  it('The sign-in form cannot be submitted empty', async() => {
    jest.spyOn(UserService, 'signUserInWithEmailAndPassword').mockReturnValue(Promise.reject(new Error('error')));

    // arrange
    const { container, getByText } = 
      render(
        <SignIn />
      );

    const signInButton = getByText('Sign in');
  
    // act 
    fireEvent.click(signInButton);
  
    await waitFor(() => container.querySelectorAll('.errorAlert'));
  
    // assert
    expect(container.querySelectorAll('.errorAlert').length).toBe(1); // error alert should be visible now
  
  });
  
  it('The sign-in form can be submitted with a valid email address and valid password', async() => {
    // arrange
    const { container, getByText } = 
    render(
      <SignIn />
    );
    const signInButton = getByText('Sign in');

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
    fireEvent.click(signInButton);

    await waitFor(() => {});
  
    expect(signUserInWithEmailAndPasswordSpy).toHaveBeenCalled();
  });

  it('The sign-in form cannot be submitted with a valid email address and invalid password', async() => {

    // arrange
    const { container, getByText } = 
    render(
      <SignIn />
    );

    const signInButton = getByText('Sign in');

    const bigInputLabels = container.querySelectorAll('.bigInput'); // should be 2 of them 
    const emailInput = bigInputLabels[0].querySelectorAll('input')[0];
    const passwordInput = bigInputLabels[1].querySelectorAll('input')[0];
  
    const mockEmail = "test@unsuccessful.com";
    const mockInvalidPassword = "";
    const mockEmailEvent = {target: {value: mockEmail}};
    const mockPasswordEvent = {target: {value: mockInvalidPassword}};
  
    // act
    fireEvent.change(emailInput, mockEmailEvent);
    fireEvent.change(passwordInput, mockPasswordEvent);
  
    // click the submit button
    fireEvent.click(signInButton);

    await waitFor(() => {});
  
    expect(signUserInWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
  
  });
});