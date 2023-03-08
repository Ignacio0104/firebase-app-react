// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getMessaging, getToken} from "firebase/messaging" //!Esto es para las notificaciones
import { getFirestore } from "firebase/firestore";

const vapidKey = "BD42GCdulO7DQ678NplI0jXoPpGz2cAdi7bnhu8kn-J65ROKmrpiiT7JprXgUNPKuxx9WBD74ZZteNeLyB3Uorc"
//*Esta clave la sacamos de configuracion del proyecto, cloud messaging, key pair

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVfRnDSw2UvTjjhK8doV_2mCWZq-j2-3M",
  authDomain: "fir-shopping-f13d3.firebaseapp.com",
  projectId: "fir-shopping-f13d3",
  storageBucket: "fir-shopping-f13d3.appspot.com",
  messagingSenderId: "597872807622",
  appId: "1:597872807622:web:413d429ddc629d2dd511c7"
};

//Token: fMkklduD3vhfwhuGD_-BAv:APA91bFHTdHt_b8GgZehMgYosBaxMl3039XNQWmShbkyR7ZTwKCHemR8FFhGju-pzvrChNS5yF9YRVo_dHvrztGpHHPewxx6WF92qdV1vx6Tcw3_vlFzsmhOGkCSAsfugZ3-FOPIbrK6

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authConfig = getAuth(app);
export const messaging = getMessaging(app);

getToken(messaging, { vapidKey })
  .then(currentToken => {
    //! si esto no anda: https://stackoverflow.com/questions/73108223/getting-error-firebaseerror-messaging-we-are-unable-to-register-the-default-s
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      //console.log('currentToken', currentToken);
      sendTokenToServer(currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  const sendTokenToServer = token =>{
    if(localStorage.getItem("tokenSentToServer")) return;

    localStorage.setItem("tokenSentToServer","1");
  }

export const db = getFirestore(app);