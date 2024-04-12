import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports'; 
import '../styles/Textgen.css'; 
 Amplify.configure(config);


export function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <>
    <div className='container'>
      <h1 className='header'>Please Upload an Image</h1>

      <button className='upload-button'>Upload Image</button>
      <button onClick={signOut} className="absolute top-1 right-14  bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">Sign Out</button>

    </div>
    </>
  );
}

export default withAuthenticator(App);






