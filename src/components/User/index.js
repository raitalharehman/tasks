import React from 'react';
import './scss/index.scss';
import VerticalTabs from '../Home/tabusers';
import { UserContext } from '../ContextProvider/context';

function User() {
  return (<UserContext.Consumer>
    {
      ({ settings }) => (
        settings ?
          <div className="App container">
            <VerticalTabs />
          </div>
          : null
      )}
  </UserContext.Consumer>);
}

export default User;
