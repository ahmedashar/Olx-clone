

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
  import { getFirestore, setDoc, doc, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js"


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
  const db = getFirestore(app);
  const storage = getStorage(app);




async function firebaseSignUp(userInfo){
  const {userEmail,userPassword} = userInfo;
  const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
  await addUserToDb(userInfo, userCredential.user.uid)

    
}
function addUserToDb(userInfo,uid){
  const {userEmail,userName} = userInfo;
  return setDoc(doc(db,"users",uid),{userEmail, userName})
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

// uploadImage,
async function uploadImage(adImg){
  const storageRef = ref(storage, `images/${adImg.name}`);
  const snapshot = await uploadBytes(storageRef, adImg);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

// for post ad to db
function adPostToDb(adTitle,adDes,adPrice,adLocation,imgUrl){
  const userId = auth.currentUser.uid
  return addDoc(collection(db,'ads'),{adTitle,adDes,adPrice,adLocation,imgUrl,userId})
}


// get ads form db

async function getAdsFromDb(){
  const querySnapshot = await getDocs(collection(db, 'ads'))
  const ads = []
  
  querySnapshot.forEach((doc)=>{
    ads.push({id: doc.id, ...doc.data()})
  });
  return ads
}

export { firebaseSignIn, firebaseSignUp, adPostToDb, uploadImage, getAdsFromDb }