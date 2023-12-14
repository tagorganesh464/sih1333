import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import UserLoginContextStore from "./context/UserLoginContextStore";
import DomainContextProvider from "./context/DomainContextProvider";
// import { AppContextProvider } from "./context/AppContextProvider";
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyD1SOor7kxJiv8Dzi07N_5mVq740Lf-s3I",
//   authDomain: "podverse-5a6db.firebaseapp.com",
//   projectId: "podverse-5a6db",
//   storageBucket: "podverse-5a6db.appspot.com",
//   messagingSenderId: "280786456383",
//   appId: "1:280786456383:web:2e8f112da55e1addc0cd8a",
//   measurementId: "G-8PHNSE0K33",
// };

// Initialize Firebase
// initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
    <UserLoginContextStore>
    
    <DomainContextProvider>
      <App  />
      </DomainContextProvider>
      
     
   
    </UserLoginContextStore>
    
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
