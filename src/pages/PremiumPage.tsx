
import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'



const PremiumPage = () => {
  return (
    <Authenticator>
        {({ signOut}) => (
            <div>
                <h1>Hello, Welcome to Da Site </h1>
                <h3>You are being authenticated...</h3>
                <h2>Something</h2>
            </div>
        )}

    </Authenticator>
  )
}

export default PremiumPage
export {}; 