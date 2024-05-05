import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';
import { Predictions } from '@aws-amplify/predictions';
Amplify.configure(config);

const Login = () => {
  const [response, setResponse] = useState("Input to translate...");
  const [textTranslate, setTextTranslate] = useState("");
  const [targetLang, setTargetLang] = useState("en"); // Default language is English

  async function translateText() {
    try {
      const result = await Predictions.convert({
        translateText: {
          source: {
            text: textTranslate,
          },
          targetLanguage: targetLang
        }
      });
      setResponse(result.text);
    } catch (error:any) {
      console.error('Error translating text:', error);
      setResponse(error.message);
    }
  }

  function setText(event:any) {
    setTextTranslate(event.target.value);
  }

  function setLanguage(event:any) {
    setTargetLang(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-blue-700 text-center text-xl mb-4">Test</h2>
      <div className="flex items-center mb-4">
        <textarea
          value={textTranslate}
          onChange={setText}
          className="border rounded p-2 mr-2 resize-none focus:outline-none"
          rows={5}
          cols={40}
          placeholder="Enter your prompt here..."
        />
        <button
          onClick={translateText}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded shadow focus:outline-none"
        >
          Translate
        </button>
       
          <select value={targetLang} onChange={setLanguage}>
          <option value='ar'>Arabic</option>
          <option value='zh'>Chinese (Simplified)</option>
          <option value='zh-TW'>Chinese (Traditional)</option>
          <option value='cs'>Czech</option>
          <option value='da'>Danish</option>
          <option value='nl'>Dutch</option>
          <option value='en'>English</option>
          <option value='fi'>Finnish</option>
          <option value='fr'>French</option>
          <option value='de'>German</option>
          <option value='el'>Greek</option>
          <option value='he'>Hebrew</option>
          <option value='hi'>Hindi</option>
          <option value='hu'>Hungarian</option>
        <option value='id'>Indonesian</option>
        <option value='it'>Italian</option>
          <option value='ja'>Japanese</option>
        <option value='ko'>Korean</option>
        <option value='ms'>Malay</option>
        <option value='no'>Norwegian</option>
      <option value='fa'>Persian</option>
        <option value='pl'>Polish</option>
      <option value='pt'>Portuguese</option>
        <option value='ro'>Romanian</option>
        <option value='ru'>Russian</option>
        <option value='es'>Spanish</option>
        <option value='sv'>Swedish</option>
        <option value='tr'>Turkish</option>
        <option value='uk'>Ukrainian</option>
        <option value='ur'>Urdu</option>
        <option value='vi'>Vietnamese</option>


        </select>
        <p className='ml-5'>{response}</p>
      </div>
    </div>
  );
};

export default Login;
