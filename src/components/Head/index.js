import React from 'react';
import { Link } from 'react-router-dom';
import './scss/index.scss';
import { devicesUrl } from '../App/routes';
import { UserContext } from '../ContextProvider/context';

function Head() {
  return (
    <header className="head-root">
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="">NARSUN</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={devicesUrl}>Home</Link>
            </li>
            <UserContext.Consumer>
              {({logout}) => (
                <li className="nav-item" onClick={() => logout()}>
                  <div className="nav-link c-p">Logout</div>
                </li>
              )}
            </UserContext.Consumer>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    </header>
  );
}

export default Head;
