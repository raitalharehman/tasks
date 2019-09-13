import React from 'react';
import { Head } from '../../components';
import { homeUrl, baseUrl, devicesUrl, settingsUrl, usersUrl } from '../../components/App/routes';
import './scss/index.scss';
import Device from '../../components/Device';
import MyNavigation from '../../components/Home/nav';
import VerticalTabs from '../../components/Home/tab';
import Setting from '../../components/Setting';
import User from '../../components/User';
import { UserContext } from '../../components/ContextProvider/context';


const LayoutPage = () => {
    let url = window.location.pathname;
    let renderMe = () => {
        if (homeUrl === url || baseUrl === url) {
            return <Device />
        } else if (devicesUrl === url) {
            return <Device />
        } else if (settingsUrl === url) {
            return <UserContext.Consumer>
                {
                    ({ settings }) => (
                        settings ?
                            <Setting />
                            : null
                    )}
            </UserContext.Consumer>

        } else if (usersUrl === url) {
            return <User />
        }
    }
    return (
        <div className="app-root">
            <Head />
            <div className="container nav-style">
                <UserContext.Consumer>
                    {
                        ({ settings }) => (
                            settings ?
                                <MyNavigation />
                                :
                                <VerticalTabs />
                        )
                    }
                </UserContext.Consumer>
            </div>
            {renderMe()}
        </div>
    );
}

export default LayoutPage;
