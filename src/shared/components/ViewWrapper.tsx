import React from 'react';
import { Box } from '@material-ui/core';
import Row from './Row/Row';
import { isMobileSafari, isMobile } from 'react-device-detect';
import Copyright from './Copyright';

interface IViewWrapper {
  showCopyright?: boolean
}

const ViewWrapper: React.FC<IViewWrapper> = ({ children, showCopyright, ...gridProps }) => {
  return (
    <Box pl={6} pr={6} className="viewWrapperBox">
      <Row justify="center" className={isMobileSafari ? 'fullHeightMobileSafari' : isMobile ? 'fullHeightMobile' : 'fullHeight'}>
          <div className="viewWrapperDiv">
            {children}
          </div>
          {showCopyright ? <Copyright/> : ''}
        </Row>
    </Box>
  )
}

export default ViewWrapper;