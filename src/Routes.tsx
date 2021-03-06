import React, { useEffect, useState } from "react";
import {css} from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

import About from './shared/features/About/About';
import SignIn from "./shared/features/SignIn/SignIn";
import Join from "./shared/features/Join/Join";
import RegisterDetails from './shared/features/RegisterDetails'
import PostsView from './shared/features/PostsView/PostsView';
import SettingsView from './shared/features/SettingsView/SettingsView';
import AddAccountLink from './shared/features/AddAccountLink';
import ResetPassword from './shared/features/ResetPassword';
import HandleReset from './shared/features/HandleReset';

import { RouteComponentProps, withRouter, Switch, useHistory } from "react-router";
import { Route } from "react-router-dom";
import ProtectedRouteHoc from "ProtectedRouteHoc";
import { User } from "shared/models/user.model";
import FamilyMsgView from "./shared/features/FamilyMsgView/FamilyMsgView";
import CreatePost from "./shared/features/CreatePost/CreatePost";
import { Grid } from "@material-ui/core";
import SentGrandparentReply from "./shared/features/GrandparentViews/GrandparentReply/SentGrandparentReply";
import GrandparentReplyOpts from "./shared/features/GrandparentViews/GrandparentReply/GrandparentReplyOpts";
import GetEmojiReply from "./shared/features/GrandparentViews/GrandparentReply/GetEmojiReply";
import GetVoiceReply from "./shared/features/GrandparentViews/GrandparentReply/GetVoiceReply";
import GetPhotoReply from "./shared/features/GrandparentViews/GrandparentReply/GetPhotoReply";

interface IRoutes {
  isLoggedIn: boolean;
  userData: User | undefined;
  settingsComplete: boolean;
  sessionRead: boolean;
}

const Routes: React.FC<IRoutes & RouteComponentProps> = (props) => {   // {} is a better alternative to "any"
    const { isLoggedIn, userData, settingsComplete, sessionRead } = props;
    const history = useHistory();

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
        }
      }
    }, [isLoggedIn, userData, history, settingsComplete, setIsLoading]); 

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
            <Route exact path="/" component={SignIn} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/handleReset" component={HandleReset} />
            <Route exact path="/about" component={About} />
        {
          sessionRead && (
            <>
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/registerDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={RegisterDetails} />
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/posts" isLoggedIn={isLoggedIn} public={false} RouteComponent={PostsView} />
              <ProtectedRouteHoc exact path="/postDetails" isLoggedIn={isLoggedIn} public={false} RouteComponent={FamilyMsgView} />
              <ProtectedRouteHoc exact path="/newPost" isLoggedIn={isLoggedIn} public={false} RouteComponent={CreatePost} />
              <ProtectedRouteHoc exact path="/startReply" isLoggedIn={isLoggedIn} public={false} RouteComponent={GrandparentReplyOpts} />
              <ProtectedRouteHoc exact path="/sentReply" isLoggedIn={isLoggedIn} public={false} RouteComponent={SentGrandparentReply} />
              <ProtectedRouteHoc exact path="/emoji" isLoggedIn={isLoggedIn} public={false} RouteComponent={GetEmojiReply} />
              <ProtectedRouteHoc exact path="/voice" isLoggedIn={isLoggedIn} public={false} RouteComponent={GetVoiceReply} />
              <ProtectedRouteHoc exact path="/photo" isLoggedIn={isLoggedIn} public={false} RouteComponent={GetPhotoReply} />
              <ProtectedRouteHoc exact setIsLoading={setIsLoading} path="/settings" isLoggedIn={isLoggedIn} public={false} RouteComponent={SettingsView} />
              <ProtectedRouteHoc exact path="/addAccountLink" isLoggedIn={isLoggedIn} public={false} RouteComponent={AddAccountLink} />
            </>
          )
        }

        </Switch>
    </div>
    );
  };

export default withRouter(Routes);
