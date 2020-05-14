import React, { useEffect, useState } from 'react';
import createPonyfill from 'web-speech-cognitive-services/lib/SpeechServices';
import DictateButton from 'react-dictate-button';

interface IRecordButton {
  handleDictationDone: (result:any) => void;
}

const RecordButton: React.FC<IRecordButton> = ({ handleDictationDone }) => {
  const [azureSettings, setAzureSettings] = useState<any>(null);

  useEffect(() => {
    if (!azureSettings) {
      createPonyfill({
        credentials: {
          region: 'westus',
          subscriptionKey: process.env.REACT_APP_azure
        }
      }).then((data: any) => {
        setAzureSettings({SpeechGrammarList: data.SpeechGrammarList, SpeechRecognition: data.SpeechRecognition});
      })
    }

  }, []);

  const onProgress = () => {
    console.log("making progress");
  }

  return (
    <>
      <DictateButton
      onProgress={ onProgress }
      className="my-dictate-button bigButton noMargin"

      speechGrammarList={azureSettings?.SpeechGrammarList}
      speechRecognition={azureSettings?.SpeechRecognition}
      onDictate={ handleDictationDone }
    >
    START RECORDING
  </DictateButton>
  </>
  )
}

export default RecordButton;
