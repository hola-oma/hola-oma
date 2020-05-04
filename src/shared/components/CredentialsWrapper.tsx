import React from 'react';
import { GridProps, Box } from '@material-ui/core';
import Copyright from './Copyright';
import Column from './Column/Column';
import Row from './Row/Row';

const CredentialsWrapper: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <>
      <Box pl={6} pr={6}>
        <Row justify="space-between" xs={12} className="fullHeight">
            {children}
          <Copyright />
        </Row>
      </Box>

    </>
  )
}

export default CredentialsWrapper;