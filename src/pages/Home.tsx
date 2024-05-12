import React, { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk'; 
import { StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESSKEY!,
  secretAccessKey: process.env.REACT_APP_SECRETKEY!, 
  region: 'us-east-1'
});

const polly = new AWS.Polly(); 
const s3 = new AWS.S3();


interface AudioInfo {
  url: string;
  fileName: string;
}

const Home = () => {
  const [text, setText] = useState(""); 
  const [audioUrl, setAudioUrl] = useState<AudioInfo | null>(null); // State to store audio URL
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for audio element

  async function textSpeech() {
    try {
      const data = await polly.synthesizeSpeech({
        Engine: "neural",
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Danielle"      
      }).promise();

      const audioStream = data.AudioStream;
      if (audioStream) {
        const audioData = new Uint8Array(audioStream as Buffer);
        const audioBlob = new Blob([audioData], { type: "audio/mpeg" });

        // Generate unique file name
        const now = new Date();
        const fileName = `speech_${now.getHours()}${now.getMinutes()}.mp3`;
        //const fileName = `generatedspeech_${Date.UTC(1,2).toString()}.mp3`;

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl({ url, fileName }); // Set the audio URL and file name
      }
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Text to Speech Converter</h1>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 px-3 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter text here..."
        ></textarea>
        <button 
          onClick={textSpeech} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mb-4"
        >
          Convert to Speech
        </button>

        {/* Buttons for playing, pausing, and downloading audio */}
        {audioUrl && (
          <div className="flex justify-center items-center">
            <audio ref={audioRef} src={audioUrl.url} controls className="w-full mb-4" />
            <div className="flex items-center">
              <button 
                onClick={playAudio} 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mr-2 ml-6"
              >
                Play
              </button>
              <button 
                onClick={pauseAudio} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mr-2"
              >
                Pause
              </button>
              <a 
                href={audioUrl.url} 
                download={audioUrl.fileName} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
