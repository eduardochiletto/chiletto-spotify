import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router";
import ls from 'local-storage'

import Dashboard from "./pages/dashboard/Dashboard";
import Callback from "./pages/callback/Callback"
import Login from "./pages/login/Login";
import { logout, validateToken } from "./components/auth/auth-provider";

const ExternalRedirect = ({ to, ...routeProps }) => {
    return <Route {...routeProps} render={() => window.location = to} />;
};

class Routes extends React.Component {

    async componentDidMount() {
        try {
            await validateToken();
        } catch (error) {
            logout();
        }
    }

    render() {
        const host = `https://accounts.spotify.com/pt-BR/authorize`;
        const client_id = `c339f09e203f430583cdfd639b387049`;
        const response_type = `code`;
        const redirect_uri = `https://spotify-egcch.web.app/callback`;
        //const redirect_uri = `https://d93df2ef18de.ngrok.io/callback`;
        const scopes = `user-read-private%20user-read-email`;
        const url = `${host}/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scopes=${scopes}`;

        return (
            <Switch>

                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>

                <ExternalRedirect exact path="/spotify/connect" to={url} />

                <PrivateRoute exact path="/callback">
                    <Callback />
                </PrivateRoute>


                <Route path="/login" component={Login} />
                <Redirect from="*" to="/dashboard" />
            </Switch>
        );
    }
}

export default withRouter(Routes);


function PrivateRoute({ children, ...rest }) {

    return (
        <Route
            {...rest}
            render={({ location }) => {
                const user = ls.get('chilettoUser');
                if (user) {
                    return children;
                }

                return <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            }}
        />
    );
}
