

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyDto8s1XGuR-7SeKEjuaSuK3l0XKMyaBHU",
    authDomain: "demoweb-io.firebaseapp.com",
    projectId: "demoweb-io",
    storageBucket: "demoweb-io.appspot.com",
    messagingSenderId: "196920910927",
    appId: "1:196920910927:web:d4b983fb9b0297160a363a",
    measurementId: "G-4N2WMLWS6L"
  };



  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);




 function firebaseSignUp(userInfo){
  const {userEmail,userPassword} = userInfo;
  return createUserWithEmailAndPassword(auth, userEmail, userPassword);


    
}

 function firebaseSignIn(email,password) {

 return signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     const user = userCredential.user;
    //     alert('successfull')
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(errorMessage)
    // });
}

export { firebaseSignIn, firebaseSignUp }