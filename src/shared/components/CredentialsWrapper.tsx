import React from 'react';
import { GridProps, Box } from '@material-ui/core';
import Copyright from './Copyright';
import Row from './Row/Row';
import { isMobileSafari } from 'react-device-detect';

const CredentialsWrapper: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Box pl={6} pr={6}>
      <Row justify="flex-start" className={isMobileSafari ? 'fullHeightMobileSafari' : 'fullHeight'}>
          {children}
        <Copyright />
      </Row>
    </Box>
  )
}

export default CredentialsWrapper;