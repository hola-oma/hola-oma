import React, { useEffect, useState } from "react";

import Login from "./shared/features/Login";
import Register from "./shared/features/Register";
import RegisterDetails from './shared/features/RegisterDetails'
import PostsView from './shared/features/PostsView/PostsView';
import SettingsView from './shared/features/SettingsView/SettingsView';
import AddAccountLink from './shared/features/AddAccountLink';

import { RouteComponentProps, withRouter, Switch, useHistory } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";
import { User } from "shared/models/user.model";
import FamilyMsgView from "./shared/features/FamilyMsgView/FamilyMsgView";
import CreatePost from "./shared/features/CreatePost/CreatePost";

interface IRoutes {
  isLoggedIn: boolean;
  userData: User | undefined;
}

const Routes: React.FC<IRoutes & RouteComponentProps> = (props) => {   // {} is a better alternative to "any"
    const { isLoggedIn, userData } = props;
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if (isLoggedIn) {
        if (userData?.role) {
          history.push('/posts');
        } else {
          history.push('/registerDetails');
        }
      }
    }, [isLoggedIn, userData, history]);

    return (
      <div>
        <div style={isLoading ? {} : {display: 'none'}}>
          <p>Loading...{isLoading} </p>
        </div>
        <div style={isLoading ? {display: 'none'} : {}}>
        <Switch>
          <Route exact path="/" component={Login} /> {/* default route */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRouteHoc exact path="/registerDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={RegisterDetails} />
          <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
          <ProtectedRouteHoc exact path="/postDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={FamilyMsgView} />
          <ProtectedRouteHoc exact path="/newPost" isLoggedIn={isLoggedIn} public={false} RouteComponent={CreatePost} />
          <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/settings" isLoggedIn={isLoggedIn} public={false} RouteComponent={SettingsView} />
          <ProtectedRouteHoc exact path="/addAccountLink" isLoggedIn={isLoggedIn} public={false} RouteComponent={AddAccountLink} />
        </Switch>
        </div>
      </div>
    );
  };

export default withRouter(Routes);
