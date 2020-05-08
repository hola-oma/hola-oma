import React, { useEffect, useState } from "react";
import {css} from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

import Login from "./shared/features/Login";
import Register from "./shared/features/Register/Register";
import RegisterDetails from './shared/features/RegisterDetails'
import PostsView from './shared/features/PostsView/PostsView';
import SettingsView from './shared/features/SettingsView/SettingsView';
import AddAccountLink from './shared/features/AddAccountLink';
import PhotoReplyPrototype from './shared/features/PhotoReplyPrototype';
import ResetPassword from './shared/features/ResetPassword';
import HandleReset from './shared/features/HandleReset';

import { RouteComponentProps, withRouter, Switch, useHistory, useLocation } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";
import { User } from "shared/models/user.model";
import FamilyMsgView from "./shared/features/FamilyMsgView/FamilyMsgView";
import CreatePost from "./shared/features/CreatePost/CreatePost";
import { Grid } from "@material-ui/core";
import NewGrandparentReply from "./shared/features/GrandparentViews/GrandparentReply/NewGrandparentReply";

interface IRoutes {
  isLoggedIn: boolean;
  userData: User | undefined;
  settingsComplete: boolean;
}

const Routes: React.FC<IRoutes & RouteComponentProps> = (props) => {   // {} is a better alternative to "any"
    const { isLoggedIn, userData, settingsComplete } = props;
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
      if (isLoggedIn && settingsComplete) {
        if (userData === undefined) {
          history.replace('/registerDetails');
        } else {
          console.log("Something went wrong with logging in");
          console.log(userData);
        }
      }
    }, [isLoggedIn, userData, history, settingsComplete, location, setIsLoading]); 

    return (
      <div>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item xs={12}>
            <div className="loadingSpinner" style={isLoading ? {} : {display: 'none'}}>
              <ClockLoader css={override} size={150} color={"#444444"} loading={isLoading} />
            </div>
          </Grid>
        </Grid>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/handleReset" component={HandleReset} />
        {
          settingsComplete && (
            <>
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/registerDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={RegisterDetails} />
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
              <ProtectedRouteHoc exact path="/postDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={FamilyMsgView} />
              <ProtectedRouteHoc exact path="/newPost" isLoggedIn={isLoggedIn} public={false} RouteComponent={CreatePost} />
              <ProtectedRouteHoc exact path="/newReply" isLoggedIn={isLoggedIn} public={false} RouteComponent={NewGrandparentReply} />
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/settings" isLoggedIn={isLoggedIn} public={false} RouteComponent={SettingsView} />
              <ProtectedRouteHoc exact path="/photoReplyPrototype" isLoggedIn={isLoggedIn} public={false} RouteComponent={PhotoReplyPrototype} />
              <ProtectedRouteHoc exact path="/addAccountLink" isLoggedIn={isLoggedIn} public={false} RouteComponent={AddAccountLink} />
            </>
          )
        }

        </Switch>
    </div>
    );
  };

export default withRouter(Routes);
