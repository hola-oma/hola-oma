import React, { useContext, useEffect } from "react";
import { AuthContext } from "./App";

import Login from "./shared/features/Login";
import Register from "./shared/features/Register";
import RegisterDetails from './shared/features/RegisterDetails'
import PostsView from './shared/features/PostsView/PostsView';
import SettingsView from './shared/features/SettingsView/SettingsView';
import AddAccountLink from './shared/features/AddAccountLink';

import { RouteComponentProps, withRouter, Switch, useHistory } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";

interface IRoutes {
  isLoggedIn: boolean;
}

const Routes: React.FC<IRoutes & RouteComponentProps> = (props) => {   // {} is a better alternative to "any"
    const { isLoggedIn } = props;
    const history = useHistory();

    const Auth = useContext(AuthContext);

    useEffect(() => {
      // this is what keeps you on PostsView by default, but it also has an unwanted
      // side-effect of making new users skip the role and display name steps of account creation
      if (isLoggedIn) {
        history.push('/posts');
      }
    }, [isLoggedIn]);

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} /> {/* default route */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRouteHoc exact path="/registerDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={RegisterDetails} />
          <ProtectedRouteHoc exact path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
          <ProtectedRouteHoc exact path="/settings" isLoggedIn={isLoggedIn} public={false} RouteComponent={SettingsView} />
          <ProtectedRouteHoc exact path="/addAccountLink" isLoggedIn={isLoggedIn} public={false} RouteComponent={AddAccountLink} />
        </Switch>
      </div>
    );
  };

export default withRouter(Routes);
