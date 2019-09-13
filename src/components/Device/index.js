import React from 'react';
import './scss/index.scss';
import DeviceTable from '../Home/devicestable';
import { UserContext } from '../ContextProvider/context';

function Device() {
  return (<UserContext.Consumer>
    {
      ({ settings }) => (
        settings ?
          <div className="App container">
            <DeviceTable />
          </div>
          : null
      )}
  </UserContext.Consumer>);
}

export default Device;
