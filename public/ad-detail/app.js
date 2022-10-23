import {getAdDetailFromDB} from '../firebase.js'
// getAdDetail()
function getAdId() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    // document.getElementById('adID').innerHTML = `${id}`;
    return id;

}

window.getAdDetails = async function(){
    const adDetail = await getAdDetailFromDB();

    var adImage = document.getElementById('det_ad_img');
    adImage.src = `${adDetail.imgUrl}`

    var adDesciption = document.getElementById('det_ad_des');
    adDesciption.innerText = `${adDetail.adDes}`

    var adPrice = document.getElementById('det_ad_price')
    adPrice.innerText = adDetail.adPrice

    var adTitle = document.getElementById('det_ad_title')
    adTitle.innerText = adDetail.adTitle

    var adLocation = document.getElementById('det_ad_location')
    adLocation.innerText = adDetail.adLocation

    console.log(adDetail)
}
// adDes: "table for sell in cheap price"
// adLocation: "karachi, Pakistan"
// adPrice: "RS 500"
// adTitle: "Brand new Table"
// id: "tl1JzrwEP18Oqigy7rHE"
// imgUrl: "https://firebasestorage.googleapis.com/v0/b/demoweb-io.appspot.com/o/images%2Ftable.jfif?alt=media&token=ad5a2fae-6100-4b24-a8a2-da631977750b"
// userId: "NwAwIU4k06fC5mdHcKq0KovD4Kq2"

export{getAdId}