import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAwv5UYcJ-94crcGzu9ySsfUQmH4GjLiGQ",
  authDomain: "animal-1d959.firebaseapp.com",
  databaseURL: "https://animal-1d959.firebaseio.com",
  projectId: "animal-1d959",
  storageBucket: "animal-1d959.appspot.com",
  messagingSenderId: "638154077783"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
