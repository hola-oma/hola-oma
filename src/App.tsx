import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './shared/containers/header/Header';
import Routes from './Routes';

import './App.css';

import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    /* https://reactjs.org/docs/context.html */
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, setLoggedIn }}>

    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes isLoggedIn={isLoggedIn } />
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
