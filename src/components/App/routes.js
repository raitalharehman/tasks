import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "..";
import { HomePage, AboutPage, LoginPage } from "../../views";
import { history } from "../..";
import { UserContext } from "../ContextProvider/context";

export const baseUrl = "/";
export const homeUrl = "/home";
export const aboutUrl = "/about";

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
                                <Route exact path={baseUrl} component={HomePage} />
                                :
                                <Route exact path={baseUrl} component={LoginPage} />
                        }
                        <PrivateRoute exact path={homeUrl} component={HomePage} />
                        <PrivateRoute exact path={aboutUrl} component={AboutPage} />
                        <Route component={NotFound} />
                    </Switch>)}
        </UserContext.Consumer>
    )
}
