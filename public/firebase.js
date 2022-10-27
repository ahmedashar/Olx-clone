

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
  import { getFirestore, setDoc, doc, addDoc, collection, getDocs, getDoc, where, query, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js"
// from ad detail
  import { getAdId } from './ad-detail/app.js'


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

// check user Sign In (on ad post) sell
function checkUserSignIn(){

  onAuthStateChanged(auth, (user) => {
    if (user) {
    
      var addPostBtn = document.getElementById('add_post_link_btn');
      addPostBtn.href = './ad-post/index.html'
    
    } else{
      alert('Please! Sign In')
    }
  });
}
//sign Out user
function signOutUserFirebase(){

      signOut(auth).then(() => {
        alert('Sign-out successful');
        document.getElementById('login_user').style.display = 'inline'
   
        document.getElementById('after_login_div').style.display = 'none'
      }).catch((error) => {
        alert(error.message)
          });
        }     
      

function checkUserLoginFirebase(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
    
      document.getElementById('login_user').style.display = 'none'
      document.getElementById('after_login_div').style.display = 'inline'
    
    } else{
      document.getElementById('login_user').style.display = 'inline'
      document.getElementById('after_login_div').style.display = 'none'
    }
  });
}

// /////////////////////// for Detail Page

async function getAdDetailFromDB(){
  const querySnapshot = await getDocs(collection(db, 'ads'))
  let ads;
  const adId = getAdId();

  querySnapshot.forEach((doc)=>{
      if(doc.id == adId){
    ads = {id: doc.id, ...doc.data()};
      }
  });
  return ads
}

async function getSellerInfoFromDB(sellerId){
  const querySnapshot = await getDocs(collection(db,'users'))
  let sellerInfo;
  
  querySnapshot.forEach((doc)=>{
    if(doc.id == sellerId){
      sellerInfo = {id: doc.id, ...doc.data()};
    }
  })
  return sellerInfo;
}

// for chatRooms



//create chatRoom in dataBase firestore in firebase (call from ad-detail/app.js)
function createRoom(sellerId) {
  const currentUserId = auth.currentUser.uid;
  const newRoomCreateInfo = {
    users: {
      [sellerId]: true,
      [currentUserId]: true,
    },
    createdAt: Date.now(),
    lastMessage: {},
  };
  return addDoc(collection(db, "chatrooms"), newRoomCreateInfo);
}


async function checkRoom(sellerId) {
  const currentUserId = auth.currentUser.uid;

  //get the data to chatrooms colection
  const q = query(
      collection(db, "chatrooms"),
      where(`users.${sellerId}`, "==", true),
      where(`users.${currentUserId}`, "==", true)
  );
  // console.log("querry ===>",q)
  const snapshot = await getDocs(q);
  // console.log("snapshot==>",snapshot)
  let room;
  //loop to collect the data
  snapshot.forEach((doc) => {
      // console.log("data user===>",doc.id,"==",doc.data())
      room = { id: doc.id, ...doc.data() };
  });
  return room;
  }


  // for chatRoom  file: chatroom.js
  function messages(text, roomId) {
    const obj = { text, createdAt: Date.now(), userId: auth.currentUser.uid };
    console.log("obj===>", obj);
    // ,essageRef = doc(db, "rooms", "roomA", "messages", "message1");
    console.log("roomId", roomId);
    const messageRef = addDoc(
      collection(db, "chatrooms", `${roomId}`, "messages"),
      obj
    );
    console.log("messges REf=======", messageRef);
  
    console.log(text);
    // alert(`messages ----${text}`)
  }

// get getChatroomData  file: chatroom.js
async function getChatroomData(chatroomId) {
  // alert("call the firebase function")
  const docRef = await doc(db, "chatrooms", `${chatroomId}`);
  const docSnap = await getDoc(docRef);
  console.log("firebase id===>", chatroomId);
  return docSnap.data();
}

// get realTime msgs   file: chatroom,js
function getRealtimeMessages(roomId, callback) {
  //2

  const q = query(
    collection(db, "chatrooms", `${roomId}`, "messages"),
    orderBy("createdAt")
  );
  onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    console.log(messages);
    callback(messages);
  });
}

// getFirestore,
// collection,
// addDoc,
// setDoc,
// doc,
// getDoc,
// getDocs,
// query,
// where,
// onSnapshot,
// orderBy,


export { firebaseSignIn, firebaseSignUp, adPostToDb, uploadImage, getAdsFromDb, checkUserSignIn,  signOutUserFirebase, checkUserLoginFirebase, getAdDetailFromDB, getSellerInfoFromDB, createRoom, checkRoom, messages, getChatroomData,getRealtimeMessages ,auth }