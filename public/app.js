import { firebaseSignIn, firebaseSignUp, adPostToDb, uploadImage, getAdsFromDb,  checkUserSignIn,  signOutUserFirebase, checkUserLoginFirebase } from "./firebase.js";




window.addPostInfo = function(){
    try{
    checkUserSignIn(); //checking user is signIn, if yes then go to ad_detail.html
} catch(e){
    alert(e.message)
}

}


// onclick(ad-post/backArrow)
window.back = function(){
    var backArrow = document.getElementById('left_arrow_a');
    backArrow.href = '../index.html'
}

// show login
window.showLogin = function(){
    document.getElementById('login_form_container').style.display = 'inline';
   
}

// show SignUp
window.showSignUp = function(){
    document.getElementById('login_form_container').style.display = 'none'
    document.getElementById('signUp_form_container').style.display = 'inline'
}


// get sign Up
window.signUpUser = async function(){
    let userName = document.getElementById('signUp_name').value;
    let userEmail = document.getElementById('signUp_email').value;
    let userPassword = document.getElementById('signUp_password').value;
    
    try{
        await firebaseSignUp({userEmail, userPassword, userName})
        alert('signUp successfull');
        document.getElementById('login_form_container').style.display = 'inline'
        document.getElementById('signUp_form_container').style.display = 'none'
    }catch(e){
        alert(e.message)
    }

}

// get login user
window.loginUser = async function(){
    let userEmail = document.getElementById('login_email').value;
    let userPassword = document.getElementById('login_password').value;
    try{
        await firebaseSignIn(userEmail,userPassword)
        alert('Login Successfull')
        document.getElementById('login_form_container').style.display = 'none'
        
        document.getElementById('login_user').style.display = 'none'
          document.getElementById('after_login_div').style.display = 'inline'

}
catch(e){
    alert(e.message)
}
// console.log(userEmail,userPassword)
}

// signOut user
window.signOutUser = function(){

    signOutUserFirebase();

//     const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
}



// for ad-post

window.adPosted = async function(){
    let adTitle = document.getElementById('title_input').value;
    let adDes = document.getElementById('des_input').value;
    let adPrice = document.getElementById('price_input').value;
    let adLocation = document.getElementById('location_input').value;
    let adImg = document.getElementById('ad_image').files[0];
    // alert(adTitle)
    try{
        const imgUrl = await uploadImage(adImg);
        await adPostToDb(adTitle,adDes,adPrice,adLocation,imgUrl)
        alert('successfull')
        location.href = '../index.html'
    }catch(e){
        alert(e.message)
    }
}
// on Reload Home Page
window.getAds = async function(){
    const ads = await getAdsFromDb();
    const adElem = document.getElementById('ad_container');

    for(let item of ads){
        adElem.innerHTML += `
        <div class="ad_cards" onclick="gotoDetail('${item.id}')">
            <img class="ad_img" src=${item.imgUrl} alt="">
            <div class="ad_content">
                <p class="ad_title">${item.adTitle}</p>
                <h3 class="ad_price">${item.adPrice}</h3>
                <p class="ad_location">${item.adLocation}</p>
            </div>
        </div>
        `
    }

    checkUserLoginFirebase();
} 


window.gotoDetail = function(id){
    location.href = `./ad-detail/index.html?id=${id}`
}























// var getSRC;
// function previewFile() {
//     var adImageInput = document.querySelector("input[type=file]").files[0];
//     var reader = new FileReader();
    
//     reader.onloadend = function () {
//         getSRC = reader.result;
//     };
    
//     if (adImageInput) {
//         reader.readAsDataURL(adImageInput);
//     } else {
//         getSRC = "";
//     }
// }
// function Ad(adImg,adTitle,adPrice,adLocation){
//     this.adImg = adImg;
//     this.adTitle = adTitle;
//     this.adPrice = adPrice;
//     this.adLocation = adLocation;
// }
// var getRegisteredAd;
// // onreload="" event on body 
// function registeredAdInLocalStorage(){
//     //get push-user data from local storage
//     if (localStorage.getItem('registeredAd')){
        
//         getRegisteredAd = JSON.parse(localStorage.getItem('registeredAd'));
//     }
//     //if registeredUser not defined then create it
//     else{
        
//         localStorage.setItem('registeredAd', JSON.stringify([]));
//     }
// }

// function adPosted(){

//     // var adImageInput = document.getElementById('ad_image');
//     var adTitleInput = document.getElementById('title_input');
//     var adPriceInput = document.getElementById('price_input');
//     var adLocationInput = document.getElementById('location_input');

//     console.log(getRegisteredAd)


//     // 

//     // 
//     getRegisteredAd.push(new Ad(getSRC,adTitleInput.value,adPriceInput.value,adLocationInput.value));

//     localStorage.setItem('registeredAd', JSON.stringify(getRegisteredAd));

    
// }

