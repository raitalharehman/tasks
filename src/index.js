import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import UserProvider from './components/ContextProvider';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";


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
