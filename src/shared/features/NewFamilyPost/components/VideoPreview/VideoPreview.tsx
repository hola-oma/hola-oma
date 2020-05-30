import React from 'react';
import Row from 'shared/components/Row/Row';

interface IVideoPreview {
  videoSrc: string
}

const VideoPreview: React.FC<IVideoPreview> = ({videoSrc}) => {
  return (
    <Row justify="center">
        <video src={videoSrc}
            className="photo"
            preload="auto"
            controls
            style={{height: '95%', width: '95%'}}
        />
    </Row>
  )
}

export default VideoPreview;