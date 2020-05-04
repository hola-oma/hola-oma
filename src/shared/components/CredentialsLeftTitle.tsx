import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Child from './Child/Child';
import Column from './Column/Column';
import Row from './Row/Row';

interface ICredentialsLeftTitle {
  title: String,
  subtitle: String
}

const CredentialsLeftTitle: React.FC<ICredentialsLeftTitle> = ({ title, subtitle }) => {
  return (
    <Row justify="space-between" alignItems="flex-start">
      <Child container xs={12} justify="center">
        <Avatar className="formAvatar">
          <AccountCircleIcon />
        </Avatar>
      </Child>

      <Child container xs={12} justify="center">
        <span className="boldText">
          {title}
        </span>
      </Child>

      <Child container xs={12} justify="center">
        <Typography align="center">{subtitle}</Typography>
      </Child>
    </Row>
  )
}

export default CredentialsLeftTitle;
