import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBCOpAMlxCsMpPvyHDeCdNGS8WfgGJ-G6E",
  authDomain: "pursuit-fbase-auth.firebaseapp.com",
  databaseURL: "https://pursuit-fbase-auth.firebaseio.com",
  projectId: "pursuit-fbase-auth",
  storageBucket: "pursuit-fbase-auth.appspot.com",
  messagingSenderId: "534019135106",
  appId: "1:534019135106:web:3fafad7c49742b255a469b"
};

app.initializeApp(config);

export default app;