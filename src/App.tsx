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
import { blueGrey, teal } from '@material-ui/core/colors';
import {Post} from "./shared/models/post.model";

firebase.initializeApp(firebaseConfig);

interface IPostContext {
  post: Post;
  setPost: any;
}

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: any;
  userData: User | undefined;
}

const dummyPost = {
  pid: "",
  creatorID: "",
  from: "",
  read: false,
  message: "Empty post",
  photoURL: "",
  date: 1,
  receiverIDs: []
}

/* https://material-ui.com/customization/default-theme/?expand-path=$.typography */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800]
    },
    secondary: {
      main: teal[200],
      contrastText: '#000',
      dark: teal[800]
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
export const GlobalPost = React.createContext<IPostContext>({ post: dummyPost, setPost: null });

function App() {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();// call db and get stuff, put it in here
  const [post, setPost] = useState<Post>(dummyPost);

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
      <GlobalPost.Provider value={{ post, setPost}}>

      <div className="App">
      
      <Router>

        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header isLoggedIn={isLoggedIn} />
            <Routes userData={userData} isLoggedIn={isLoggedIn} />
          </CssBaseline>
        </ThemeProvider>
      </Router>

      </div>

      </GlobalPost.Provider>
    </AuthContext.Provider>


  );
}

export default App;
