import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "..";
import { LayoutPage, LoginPage } from "../../views";
import { history } from "../..";
import { UserContext } from "../ContextProvider/context";

export const baseUrl = "/";
export const paymentUrl = "/payment";
export const homeUrl = "/home";
export const companyUrl = "/company";
export const devicesUrl = "/devices";
export const settingsUrl = "/settings";
export const usersUrl = "/users";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <UserContext.Consumer>
            {({ token }) => (
                <Route
                    {...rest}
                    render={props =>
                        token ? (
                            <Component {...props} />
                        ) : (
                                <>
                                    {history.push(baseUrl)}
                                </>
                            )
                    }
                />
            )}
        </UserContext.Consumer>
    );
}
export default function Routes() {
    return (
        <UserContext.Consumer>
            {
                ({ token }) => (
                    <Switch>
                        {
                            token ?
                                <Route exact path={baseUrl} component={LayoutPage} />
                                :
                                <Route exact path={baseUrl} component={LoginPage} />
                        }
                        <PrivateRoute exact path={homeUrl} component={LayoutPage} />
                        <PrivateRoute exact path={devicesUrl} component={LayoutPage} />
                        <PrivateRoute exact path={settingsUrl} component={LayoutPage} />
                        <PrivateRoute exact path={usersUrl} component={LayoutPage} />
                        <Route component={NotFound} />
                    </Switch>)}
        </UserContext.Consumer>
    )
}
