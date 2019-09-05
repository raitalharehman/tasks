import React from 'react';
import { Link } from 'react-router-dom';
import './scss/index.scss';
import { companyUrl, paymentUrl } from '../App/routes';

function Head() {
  return (
    <header className="head-root">
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="">ECRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={companyUrl}>Company</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={""}>Contact</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sale</Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="">Projects/Deals</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="">Invoices</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="">Quotes/Proposal</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to={paymentUrl}>Payments</Link>
                {/* <Link className="dropdown-item" to="">Something else here</Link> */}
              </div>
            </li>
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
