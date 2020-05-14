import React, { useEffect, useState } from 'react';
import createPonyfill from 'web-speech-cognitive-services/lib/SpeechServices';
import DictateButton from 'react-dictate-button';

import MicIcon from '@material-ui/icons/Mic';

import './RecordButton.css';
import Child from 'shared/components/Child/Child';
import Column from 'shared/components/Column/Column';

interface IRecordButton {
  handleDictationDone: (result: any) => void;
  handleProgress: (result: any) => void;
  handleError: (result: any) => void;
}

const RecordButton: React.FC<IRecordButton> = ({ handleDictationDone, handleProgress, handleError }) => {
  const [azureSettings, setAzureSettings] = useState<any>(null);
  const [recording, setRecording] = useState(false);

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

  const onProgress = (result: any) => {
    setRecording(true);
    handleProgress(result);
  }

  const onDictationDone = (result: any) => {
    setRecording(false);
    handleDictationDone(result);
  }

  const onErrorHappened = (e: any) => {
    setRecording(false);
    handleError(e);
  }

  return (
    <Column container alignItems="center" justify="center">
      <Child xs={12}>
        <DictateButton
          onProgress={ onProgress }
          className={`my-dictate-button noMargin recordButton ${recording ? 'recordButtonRecording recordAnim' : 'recordButtonIdle' }`}
          speechGrammarList={azureSettings?.SpeechGrammarList}
          speechRecognition={azureSettings?.SpeechRecognition}
          onDictate={ onDictationDone }
          onError = { onErrorHappened }
        >
          <MicIcon />
        </DictateButton>
      </Child>

      <Child xs={6}>
        <span>{recording ? 'Listening...' : 'Press to listen'}</span>
    </Child>

  </Column>
  )
}

export default RecordButton;
