
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '../styles/Textgen.css'; 
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';
import { Predictions } from '@aws-amplify/predictions';
import AWS from "aws-sdk";
config.aws_project_region = 'us-east-1';
Amplify.configure(config);

export function App({ signOut, user }: WithAuthenticatorProps) {
 
  const [response, setResponse] = useState("Input to translate...");
  const [textTranslate, setTextTranslate] = useState("");
  const [targetLang, setTargetLang] = useState("en"); // Default language is English



  const [responsed, setResponsed] = useState("Upload Pic")
    async function identify(event:any){
      setResponsed("loading...")
      const {target: {files}} = event
      const file = files[0]
      const data = await Predictions.identify({
        text: { source: {file}, format: "PLAIN"}
      })
      setResponsed(data.text.fullText)
    }


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
    <>
    <div className='container max-h'>
      <button onClick={signOut} className="absolute top-2 right-16  bg-indigo-700 hover:bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded">Sign Out</button>
      <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-blue-700 text-center text-xl mb-4 mt-12 pt-5 ">Translate</h2>

      <div className="flex flex-col md:flex-row items-center">
        <textarea
          value={textTranslate}
          onChange={setText}
          className="border rounded p-2 mr-2 resize-none focus:outline-none"
          rows={5}
          cols={40}
          placeholder="Enter your prompt here..."
        />
        <button onClick={translateText} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 border border-blue-500 rounded shadow focus:outline-none mt-4  md:mb-2">
          Translate
        </button>

       
          <select value={targetLang} onChange={setLanguage}
          className='border rounded p-2 ml-2 mb-4 md:mb-0 md:mt-2 mt-2'>
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
        
      </div>
      <div className='border-solid border border-black mt-4 px-1 py-2'>
          <label className=' flex justify-center font-bold'>Translated Text:</label>
          <p className="text-center mt-1 max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]">{response}</p>

        </div>
      {/* <label className='mt-4'>Translated Text:</label>
      <p className='text-center mt-1'>{response}</p> */}
    </div>
    </div>
    </>
  );
}

export default withAuthenticator(App);