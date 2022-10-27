import {messages, getChatroomData, getRealtimeMessages, auth} from '../firebase.js'

getChatroomToDb();
realTime();

//chatroom Id function to get the URL room Id
function chatroomId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('room-id')
    return id
}


// send type msg to DB
window.sendMsg = function(){
    const text = document.getElementById('msg_input')
    if(text.value == ''){
        alert('emty is not accept')
        return
    }else{
        const roomId = chatroomId()
        messages(text.value,roomId)
        text.value = ""
    }
}


// get chat room  chat from DB
async function getChatroomToDb(){
    const id = chatroomId()
    // console.log('chatroom Id ===>',id)
     const data = await getChatroomData(id)
     console.log('data = ====>>>',data)
}


//  //////function to get the real time chat Data
function realTime(){
    const roomId =  chatroomId()
     getRealtimeMessages(roomId,(messages) => {
        //4
        console.log("room data",messages)
        const adsElem = document.getElementById('ads')
    console.log("real id",messages[0].id)
        adsElem.innerHTML = ''
        for (let item of messages) {

           let color;
           
            if(item.userId == auth.currentUser.uid ){
                color = "orange"
                console.log("auth.currentUser.uid",auth.currentUser.uid)
                }else{
                color = "blue"
                console.log(auth.currentUser.uid)
            }
            adsElem.innerHTML += ` 
            <div class="message-${color}" >
                <span>${item.text}</span>
                <span id="time">  ${new Date(item.createdAt).toLocaleTimeString()}</span>
            </div>`
        }
        
    })

}

