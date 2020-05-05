import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import Child from './Child/Child';
import Row from './Row/Row';

interface ICredentialsLeftTitle {
  icon: any,
  title: String,
  subtitle: String
}

const CredentialsLeftTitle: React.FC<ICredentialsLeftTitle> = ({ icon, title, subtitle }) => {
  return (
    <Row justify="space-between" alignItems="flex-start">
      <Child container xs={12} justify="center">
        <Avatar className="formAvatar">
          {icon}
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
