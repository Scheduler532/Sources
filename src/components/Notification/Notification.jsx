//通知受け取ってalert吐くためのcomponent
import React, { useState, useEffect } from "react";
import { auth, db, onMessageListener, requestForToken } from "../Auth/Auth";
import { doc, updateDoc } from "firebase/firestore";
import { isSmartPhone } from "../Header/Header";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    if (notification?.title) {
      alert("title: " + notification?.title + "\nbody: " + notification?.body);
    }
  }, [notification]);

  requestForToken();


    const setToken = async () =>{
    const token = await requestForToken()
    if(auth.currentUser){
      console.log(token)
      const userid = auth.currentUser.uid
      if(isSmartPhone()){
        updateDoc(doc(db,'users',userid),{'token':token})
      }
    }
  }

  setToken()
  
  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <div />;
};

export default Notification;

//これ実行すれば通知流せる
export const sendPushNotification = async ( classes,title, body) => {
  const response = await fetch("https://us-central1-schedular-412113.cloudfunctions.net/sendNotificationToAll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ classes,title, body }),
  });

  const result = await response.text();
  console.log(result);
};


