import React from 'react';
import { Link } from '@material-ui/core';
import Child from './Child/Child';

const LoginHelp: React.FC = () => {
  return (
    <Child xs={12}>
      <br/>
      <span className="boldText">Help</span>

      <ul className="helpOptions">
        <li>
          <Link href="/resetPassword" className="bigLink">
            Forgot password
          </Link>
        </li>
        <li>
        <Link href="/join" className="bigLink">
          Don't have an account
        </Link>
        </li>
      </ul>
    </Child>
  )
}

export default LoginHelp;