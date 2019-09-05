import React from 'react';
import { Home, Head, About } from '../../components';
import { homeUrl, baseUrl, companyUrl, aboutUrl, paymentUrl } from '../../components/App/routes';
import './scss/index.scss';
import { SalePage, CompanyPage } from '..';

const LayoutPage = (props) => {
    let url = window.location.pathname;
    let renderMe = () => {
        if (homeUrl === url || baseUrl === url) {
            return <Home />
        } else if (url === aboutUrl) {
            return <About />
        } else if (url === companyUrl) {
            return <CompanyPage />
        } else if (url === paymentUrl) {
            return <SalePage />
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
