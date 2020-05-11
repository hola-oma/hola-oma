import React from 'react';
import DictateButton from 'react-dictate-button';

const RecordButton: React.FC = () => {
  const handleDictate = () => {
    console.log("Dictation is being handled");
  }

  const handleProgress = () => {
    console.log("Progress is being made");
  }

  return (
    <DictateButton
      className="my-dictate-button"
      grammar="#JSGF V1.0; grammar districts; public <district> = Tuen Mun | Yuen Long;"
      onDictate={ handleDictate }
      onProgress={ handleProgress }
    >
    Start/stop
  </DictateButton>
  )
}

export default RecordButton;
