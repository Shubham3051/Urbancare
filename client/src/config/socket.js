import socket from 'socket.io-client'
let socketinstance=null;
export const initializeSocket=(chatId)=>{
    console.log("..",import.meta.env.VITE_API_URL);
    console.log("ddd",String(chatId));
    
    socketinstance=socket(import.meta.env.VITE_API_URL,{
        auth:{
            token:localStorage.getItem('token')
        },
        query:{
            chatid: (chatId)
        }
        
        
    }
);
    return socketinstance;
}
export const recievemessage=(eventname,cb)=>{
socketinstance.on(eventname,cb);
console.log(22,eventname,cb);

}
export const sendmessage=(eventname,cb)=>{
    socketinstance.emit (eventname,cb);
    }