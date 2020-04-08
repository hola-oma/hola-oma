import React from "react";
import Login from "./shared/features/Login";
import Register from "./shared/features/Register";
import RegisterDetails from './shared/features/RegisterDetails'
import PostsView from './shared/features/PostsView';
import SettingsView from './shared/features/SettingsView';
import { RouteComponentProps, withRouter, Switch } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";
import PostDetails from "./shared/features/PostDetails";

interface IRoutes {
  isLoggedIn: boolean;
}

class Routes extends React.Component<RouteComponentProps & IRoutes, {}> {   // {} is a better alternative to "any"
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} /> {/* default route */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRouteHoc exact path="/registerDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={RegisterDetails} />
          <ProtectedRouteHoc exact path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
          <ProtectedRouteHoc exact path="/viewPost" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostDetails} />
          <ProtectedRouteHoc exact path="/settings" isLoggedIn={isLoggedIn} public={false} RouteComponent={SettingsView} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);

