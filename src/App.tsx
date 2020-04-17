import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './shared/containers/header/Header';
import Routes from './Routes';

import './App.css';

import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

import { User } from 'shared/models/user.model';
import { getUserSettings } from 'services/user';

firebase.initializeApp(firebaseConfig);

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
  userData: User | undefined;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();// call db and get stuff, put it in here 

  const readSession = async () => {
    let db;
    const request = window.indexedDB.open("firebaseLocalStorageDb", 1);
    request.onsuccess = async function(event: any) {
      // get database from event
      db = event.target.result;
  
      // create transaction from database
      try {
        const transaction = db.transaction('firebaseLocalStorage', 'readwrite');
        const authStore = transaction.objectStore('firebaseLocalStorage')
        const authResult = authStore.getAll();
        authResult.onsuccess = async (event: any) => {
          const [targetResult] = event.target.result;
          if (targetResult?.value?.uid) {
            setLoggedIn(true);
          }
        }
      } catch(e) {
        console.log(e);
      }
    }

    request.onupgradeneeded = async function(event: any) {
      db = event.target.result;
      db.createObjectStore('firebaseLocalStorage', {keyPath: 'fbase_key'});
    };

    // get user from db
    await getUserSettings().then((settings:any) => {
      setUserData(settings);
    });
  };

  useEffect(() => {
    readSession();
  }, [isLoggedIn])


  return (
    /* https://reactjs.org/docs/context.html */
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, userData }}>

    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes userData={userData} isLoggedIn={isLoggedIn} />
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
