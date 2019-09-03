import React from 'react';
import { Home, Head, About } from '../../components';
import { homeUrl, baseUrl, companyUrl, aboutUrl } from '../../components/App/routes';
import Company from '../CompanyPage';
import './scss/index.scss';

const LayoutPage = (props) => {
    let url = window.location.pathname;
    let renderMe = () => {
        if (homeUrl === url || baseUrl === url) {
            return <Home />
        } else if (url === aboutUrl) {
            return <About />
        } else if (url === companyUrl) {
            return <Company />
        }
    }
    return (
        <div className="app-root">
            <Head />
            {renderMe()}
        </div>
    );
}

export default LayoutPage;
