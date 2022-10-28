// import * as firebase from "firebase/app";
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDQCdl14wyonnfAasoeaAdtlp1Wip6AKbI",
    authDomain: "ueeceb.firebaseapp.com",
    projectId: "ueeceb",
    storageBucket: "ueeceb.appspot.com",
    messagingSenderId: "1014994353688",
    appId: "1:1014994353688:web:31f852e8af2f3476790d6d"
  };
  
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   export default {
//         firebase,
        

//   }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;