import React from 'react';
import { Typography } from '@material-ui/core';

import '../../Grandparent.css';

interface IMessageTextDisplay {
  message: string;
}

export const MessageTextDisplay: React.FC<IMessageTextDisplay> = ({message}) => { 

  const calculateFontSizeClass = () => {
    if (message.length < 100) {
      return 'grandparentFontSizeBig';
    } else if (message.length >= 100 && message.length < 300) {
      return 'grandparentFontSizeMedium';
    } else {
      return 'grandparentFontSizeSmall'
    }
  }

  return (
    <Typography
      className={calculateFontSizeClass()}
      component="p"
      style={{overflowWrap: "break-word", maxWidth: "91vw"}}
      align={message.length <= 50 ? "center" : "left"}
    >
      {`"` + message + `"`}
    </Typography>
  )

}

export default MessageTextDisplay;