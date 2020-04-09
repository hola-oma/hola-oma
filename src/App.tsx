import React, { useState, useEffect } from 'react';
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

  const readSession = () => {
    const request = window.indexedDB.open("firebaseLocalStorageDb", 1);
    request.onsuccess = function(event: any) {
      // get database from event
      const db = event.target.result;
  
      // create transaction from database
      const transaction = db.transaction('firebaseLocalStorage', 'readwrite');
      const authStore = transaction.objectStore('firebaseLocalStorage')
      const authResult = authStore.getAll();
      authResult.onsuccess = async (event: any) => {
        const [targetResult] = event.target.result;
        if (targetResult?.value?.uid) {
          setLoggedIn(true);
        }
      }
      console.log(firebase.auth().currentUser?.getIdToken());
    }
  };

  useEffect(() => {
    readSession();
  }, []); // whenever page loads, read session and see if we're logged in


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
