import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from './shared/containers/header/Header';
import Routes from './Routes';

import './App.css';

import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

import { User } from 'shared/models/user.model';
import { getUserSettings } from 'services/user';
import { CssBaseline } from '@material-ui/core';

firebase.initializeApp(firebaseConfig);

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
  settingsComplete: boolean;
  setSettingsComplete: any;
  userData: User | undefined;
}

/* https://material-ui.com/customization/default-theme/?expand-path=$.typography */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#16344d'
    },
    secondary: {
      main: 'rgb(73,132,180)',
      contrastText: '#fff',
      dark: 'rgb(73,132,180)'
    }
  },
  spacing: 4,
  typography: {
    fontSize: 18,
    fontFamily: [
      'Roboto',
      'Pacifico'
    ].join(','),
  },
})

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [settingsComplete, setSettingsComplete] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();// call db and get stuff, put it in here
  const [sessionRead, setSessionRead] = useState<boolean>(false);

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
          } else {
            setSessionRead(true);
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

    try {
      // get user from db
      const settings: any = await getUserSettings();
      setUserData(settings);
      if (settings?.displayName && settings?.role) {
        setSettingsComplete(true);
      }
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    readSession();
  }, [isLoggedIn])

  return (
    /* https://reactjs.org/docs/context.html */
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, userData, settingsComplete, setSettingsComplete }}>

      <div className="App">
      
      <Router>

        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header isLoggedIn={isLoggedIn} settingsComplete={settingsComplete} />
            <Routes sessionRead={sessionRead} settingsComplete={settingsComplete} userData={userData} isLoggedIn={isLoggedIn} />
          </CssBaseline>
        </ThemeProvider>
      </Router>

      </div>

    </AuthContext.Provider>


  );
}

export default App;
