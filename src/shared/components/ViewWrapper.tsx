import React from 'react';
import { GridProps, Box } from '@material-ui/core';
import Row from './Row/Row';
import { isMobileSafari } from 'react-device-detect';

const ViewWrapper: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Box pl={6} pr={6} className="viewWrapperBox">
      <Row justify="flex-start" className={isMobileSafari ? 'fullHeightMobileSafari' : 'fullHeight'}>
        <Row justify="center">
          <div className="" style={{display: 'flex', flexDirection: 'column'}}>
            {children}
          </div>
        </Row>
      </Row>
    </Box>
  )
}

export default ViewWrapper;