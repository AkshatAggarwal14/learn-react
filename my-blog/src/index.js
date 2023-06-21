import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//! These are all public keys!
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB4bcuOqObAnaTwLFh1xq51Y2KdrZch-6M',
    authDomain: 'my-react-blog-4eb06.firebaseapp.com',
    projectId: 'my-react-blog-4eb06',
    storageBucket: 'my-react-blog-4eb06.appspot.com',
    messagingSenderId: '469177371086',
    appId: '1:469177371086:web:70c0b5c78d288464a1439f',
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
