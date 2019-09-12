import React from 'react';
import { Home, Head } from '../../components';
import { homeUrl, baseUrl } from '../../components/App/routes';
import './scss/index.scss';

const LayoutPage = (props) => {
    let url = window.location.pathname;
    let renderMe = () => {
        if (homeUrl === url || baseUrl === url) {
            return <Home />
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
