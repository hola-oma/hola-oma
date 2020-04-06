import React from 'react';
import {Route, Redirect, withRouter, RouteComponentProps} from 'react-router-dom';
import firebase from 'firebase/app';

/* Adapted from example here: https://github.com/indreklasn/react-fire-auth-example/blob/chapter-2/src/ProtectedRouteHoc.js
  Updated to match modern react conventions
  HOC = higher order component
*/

interface IProtectedRouteHoc {
  isLoggedIn: boolean;
  public: boolean;
  RouteComponent: any;
  path: string;
  component?: any;
  exact: any;
}

const ProtectedRouteHoc: React.FC<IProtectedRouteHoc & RouteComponentProps> = ({ RouteComponent, isLoggedIn, component, ...rest }: IProtectedRouteHoc) => {
	if (isLoggedIn || rest.public) {
    const user = firebase.auth().currentUser;
		return (
			<Route
				{...rest}
				render={props => {
					return <RouteComponent user={user} {...props}></RouteComponent>;
				}}
			/>
		);
	}
	return <Redirect to={{ pathname: '/' }} />;
};

export default withRouter(ProtectedRouteHoc);
