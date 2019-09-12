import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import UserProvider from './components/ContextProvider';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "{your credential here}",
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: "{your credential here}",
    messagingSenderId: process.env.REACT_APP_messagingSenderId
});

const fbdb = firebaseApp.firestore();

export { fbdb };

export const history = createBrowserHistory();
history.listen((location, action) => {
    if (["PUSH"].includes(action)) {
        window.scroll({
            behavior: "smooth",
            top: 0
        });
    }
});
ReactDOM.render(
    <Router history={history}>
        <UserProvider><App /></UserProvider>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();
