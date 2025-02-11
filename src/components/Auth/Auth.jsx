import { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage } from "firebase/messaging";
import { getAuth,GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { getFirestore,doc,setDoc,getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { LoadingScreen } from "./Loading";


const app = initializeApp({
    apiKey: "AIzaSyBJS4vl9KGH5qPIIGv6aMBNhV4bSMStyGs",
    authDomain: "schedular-412113.firebaseapp.com",
    projectId: "schedular-412113",
    storageBucket: "schedular-412113.appspot.com",
    messagingSenderId: "860429400662",
    appId: "1:860429400662:web:ea6b26102be323177f19f7",
    measurementId: "G-6VRDPLPHDT"
});

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);


export const requestForToken = async () => {
    try {
      const token = await getToken(messaging, { vapidKey: 'BIqh-X1xIGcVJn6gIq-o3nzPim4q0IZee8hZYUNWLftRFvkHP8wC8RXjVeD30pC7Dyq4Qx2S6Hfx7iUDQ0tj5kA' });
      if (token) {
        return token;
      } else {
        console.log('No registration token available.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload);
            resolve(payload);
        });
    }
);

const Auth =  () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isOnline = navigator.onLine;
    
    useEffect(()=>{
        const LoginCheck =()=>{
            if (!isOnline && (localStorage.getItem('Offline')) && localStorage.getItem('islogin')){
                console.log('offline');
                navigate('/Home');
            }else{
                onAuthStateChanged(auth, async (user) => {
                    //offline =>onlineになったときにもっかい動作させるよう
                    window.addEventListener('online',()=>{
                        LoginCheck();
                    })

                    if (user !== null){
                        const userid = user.uid;
                        //userDocに情報を保存
                        const userDoc = await getDoc(doc(db,'users',userid));
                        //userDocにデータがあるかで場合分け
                        if (!userDoc.data()) {
                            //初期値
                            localStorage.setItem('Info',
                                JSON.stringify({
                                    'class': null,
                                    'subjects':{'芸':null,'物生':null,'日地':null,'世政経':null,},
                                    'subj_col':{td_art:["#ffadf49c", "#000000"],td_bio:["#4e963d9c", "#000000"],td_che:["#4e963d9c", "#000000"],td_en:["#ffe8379c", "#000000"],td_geo:["#ff9a479c", "#000000"],td_his:["#ff9a479c", "#000000"],td_homE:["#9863be9c", "#000000"],td_info:["#63b6b79c", "#000000"],td_ja:["#ff3e3e9c", "#000000"],td_math:["#2c68ff9c", "#000000"],td_none:"#ffffff",td_pe:["#ffd6aa9c", "#000000"],td_phy:["#4e963d9c", "#000000"],td_pub:["#ff9a479c", "#000000"]},
                                    "table_prop":{"width":630, "height":430, "left":25, "top":178},
                                    "notes":
                                        {
                                            "one":{"type":"txt", "left":200, "top":200, "content":"これはテストです"},
                                            "two":{"type":"cdc", "left":300, "top":200, "content":"countdowncalender"}
                                        },
                                })
                            )
                            setDoc(
                                doc(getFirestore(), "users", userid),{
                                    'class': null,
                                    'subjects':{'芸':null,'物生':null,'日地':null,'世政経':null,},
                                    "subj_col":{td_art:["#ffadf49c", "#000000"],td_bio:["#4e963d9c", "#000000"],td_che:["#4e963d9c", "#000000"],td_en:["#ffe8379c", "#000000"],td_geo:["#ff9a479c", "#000000"],td_his:["#ff9a479c", "#000000"],td_homE:["#9863be9c", "#000000"],td_info:["#63b6b79c", "#000000"],td_ja:["#ff3e3e9c", "#000000"],td_math:["#2c68ff9c", "#000000"],td_none:"#ffffff",td_pe:["#ffd6aa9c", "#000000"],td_phy:["#4e963d9c", "#000000"],td_pub:["#ff9a479c", "#000000"]},
                                    "table_prop":{"width":630, "height":430, "left":25, "top":178},
                                    "notes":
                                        {
                                            "one":{"type":"txt", "left":200, "top":200, "content":"これはテストです"},
                                            "two":{"type":"cdc", "left":300, "top":200, "content":"countdowncalender"}
                                        }
                                }
                            )
                            localStorage.setItem('IsAfterBackgroundcolorUpdateLogin','true');
                            localStorage.setItem('txtcoladj',true);

                        }else{
                            const Info = userDoc.data();
                            const subj_col = Info.subj_col;
                            //↓データ形式の変更用
                            if(localStorage.getItem('IsAfterBackgroundcolorUpdateLogin')!=='true' && typeof Info.subj_col.td_art === 'string'){
                                //以下教科色自由枠拡大アプデの影響によるバグへの対応
                                if(!subj_col.td_bio){
                                    subj_col.td_bio = subj_col.td_sci;
                                }
                                if(!subj_col.td_che){
                                    subj_col.td_che = subj_col.td_sci;
                                }
                                if(!subj_col.td_phy){
                                    subj_col.td_phy = subj_col.td_sci;
                                }
                                if(!subj_col.td_geo){
                                    subj_col.td_geo = subj_col.td_soci;
                                }
                                if(!subj_col.td_his){
                                    subj_col.td_his = subj_col.td_soci;
                                }
                                if(!subj_col.td_pub){
                                    subj_col.td_pub = subj_col.td_soci;
                                }

                                const ColcodeToL = (color) => {
                                    const col = color;
                                    var hex;
                                    try{
                                        hex = col.substring(1);
                                    } catch(error){
                                        hex = col;
                                    }
                                    const r = parseInt(hex.substring(0, 2), 16);
                                    const g = parseInt(hex.substring(2, 4), 16);
                                    const b = parseInt(hex.substring(4, 6), 16);
                                    const max = Math.max(r,g,b)/255;
                                    const min = Math.max(r,g,b)/255;
                                    const l= (max + min) / 2;
                                    return(l< 0.5 ? '#ffffff' : '#000000');
                                }

                                
                                Info.subj_col={
                                    td_art:[subj_col.td_art, ColcodeToL(subj_col.td_art)],
                                    td_bio:[subj_col.td_bio, ColcodeToL(subj_col.td_bio)],
                                    td_che:[subj_col.td_che, ColcodeToL(subj_col.td_che)],
                                    td_en:[subj_col.td_en, ColcodeToL(subj_col.td_en)],
                                    td_geo:[subj_col.td_geo, ColcodeToL(subj_col.td_geo)],
                                    td_his:[subj_col.td_his, ColcodeToL(subj_col.td_his)],
                                    td_homE:[subj_col.td_homE, ColcodeToL(subj_col.td_homE)],
                                    td_info:[subj_col.td_info, ColcodeToL(subj_col.td_info)],
                                    td_ja:[subj_col.td_ja, ColcodeToL(subj_col.td_ja)],
                                    td_math:[subj_col.td_math, ColcodeToL(subj_col.td_math)],
                                    td_none:"#ffffff",
                                    td_pe:[subj_col.td_pe, ColcodeToL(subj_col.td_pe)],
                                    td_phy:[subj_col.td_phy, ColcodeToL(subj_col.td_phy)],
                                    td_pub:[subj_col.td_pub, ColcodeToL(subj_col.td_pub)]
                                };

                                setDoc(doc(getFirestore(), "users", userid),Info);
                            }
                            localStorage.setItem('Info',JSON.stringify(Info));
                        }

                        //以下Assignmentsの同期
                        const assignments_data = await getDoc(doc(db,'assignments','data'))
                        sessionStorage.setItem('Assignments_Save',JSON.stringify(assignments_data.data()));
                        
                        //NotificationTime関係
                        const userdoc = await getDoc(doc(db,'reminders',userid))
                        const info=userdoc.data()
                        if(info){
                            localStorage.setItem('NotificationTime',info.NotificationTime)
                        }
                        
                        //locationは他ページからリロード対策で飛んできたときに送られてくる
                        //そのページに送り返すために使用
                        if (location.state){
                            localStorage.setItem('islogin',true);
                            navigate(location.state);
                        }else{
                            localStorage.setItem('islogin',true);
                            navigate('Home');
                        }
                        sessionStorage.setItem('isAssignmentsSaved',true);
                        localStorage.setItem('IsAfterBackgroundcolorUpdateLogin',true);
                    }else{
                        navigate('login');
                    }
                })
            }
        }
        LoginCheck();
    })

    return(
        <div>
            <LoadingScreen />
        </div>
    );
}

export {auth,provider,db};
export {Auth};