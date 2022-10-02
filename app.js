function addPostInfo(){
    var addPostBtn = document.getElementById('add_post_link_btn');
    addPostBtn.href = './ad-post/index.html'
 
}


// onclick(ad-post/backArrow)
function back(){
    var backArrow = document.getElementById('left_arrow_a');
    backArrow.href = '../index.html'
}




var getSRC;
function previewFile() {
    var adImageInput = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    
    reader.onloadend = function () {
        getSRC = reader.result;
    };
    
    if (adImageInput) {
        reader.readAsDataURL(adImageInput);
    } else {
        getSRC = "";
    }
}
function Ad(adImg,adTitle,adPrice,adLocation){
    this.adImg = adImg;
    this.adTitle = adTitle;
    this.adPrice = adPrice;
    this.adLocation = adLocation;
}
var getRegisteredAd;
// onreload="" event on body 
function registeredAdInLocalStorage(){
    //get push-user data from local storage
    if (localStorage.getItem('registeredAd')){
        
        getRegisteredAd = JSON.parse(localStorage.getItem('registeredAd'));
    }
    //if registeredUser not defined then create it
    else{
        
        localStorage.setItem('registeredAd', JSON.stringify([]));
    }
}

function adPosted(){

    // var adImageInput = document.getElementById('ad_image');
    var adTitleInput = document.getElementById('title_input');
    var adPriceInput = document.getElementById('price_input');
    var adLocationInput = document.getElementById('location_input');

    console.log(getRegisteredAd)


    // 

    // 
    getRegisteredAd.push(new Ad(getSRC,adTitleInput.value,adPriceInput.value,adLocationInput.value));

    localStorage.setItem('registeredAd', JSON.stringify(getRegisteredAd));

    
}

