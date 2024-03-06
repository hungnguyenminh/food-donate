import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

const url = {
  donate: '/donate',
  receive: '/revceive',
};

const firebaseConfig = {
  apiKey: 'AIzaSyD1WxNcjS799aHBXR287FhQVtYULccYSDU',
  authDomain: 'food-donate-c56e5.firebaseapp.com',
  databaseURL: 'https://food-donate-c56e5-default-rtdb.firebaseio.com',
  projectId: 'food-donate-c56e5',
  storageBucket: 'food-donate-c56e5.appspot.com',
  messagingSenderId: '305720062472',
  appId: '1:305720062472:web:295d9cf90a1baa337717bd',
  measurementId: 'G-89M3Y24Y8L',
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(appFirebase);

// Firestore
const db = getFirestore(appFirebase);

const authFirebase = getAuth(appFirebase);

export { database, db, authFirebase, url };
