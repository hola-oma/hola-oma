import React from 'react';
import DictateButton from 'react-dictate-button';

interface IRecordButton {
  handleDictationDone: (result:any) => void;
}

const RecordButton: React.FC<IRecordButton> = ({ handleDictationDone }) => {
  
  return (
    <DictateButton
      className="my-dictate-button bigButton noMargin"
      grammar="#JSGF V1.0; grammar districts; public <district> = Tuen Mun | Yuen Long;"
      onDictate={ handleDictationDone }
    >
    START RECORDING
  </DictateButton>
  )
}

export default RecordButton;
