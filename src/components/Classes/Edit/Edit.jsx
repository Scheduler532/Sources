import styles from './Edit.module.css';
import { Header } from '../../Header/Header';
import { Subjects } from '../Subjects/Subjects';
import { Version_data } from "../../data/Version_data";
import { isMacOs } from 'react-device-detect';
import { db } from "../../Auth/Auth";
import { updateDoc,doc } from "firebase/firestore";
import { auth } from "../../Auth/Auth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Edit = ({setIsOpen,setIsEditing}) => {
    //リロード対策
    const isOnline = navigator.onLine;
    const navigate = useNavigate();
    useEffect(()=> {
        if (!(auth.currentUser) && isOnline){
            navigate('/',{state:'/Classes'})
        }
    })

    const save = () => {
        //localstorage経由でjsonデータを取得、その後にfirestoreにアップロードする
        const Info = JSON.parse(localStorage.getItem('Info'));
        const classes = Info.classes;
        const classid = Info.classid;
        const usedsubj = Info.usedsubj ? Info.usedsubj : [];

        if(localStorage.getItem('islogin') && Info){
            var userid;
            if (isOnline){
                userid = auth.currentUser.uid;
            }

            updateDoc(doc(db,'users',userid),{'classes':classes});
            updateDoc(doc(db,'users',userid),{'classid':classid});
            updateDoc(doc(db,'users',userid),{'usedsubj':usedsubj});
        }
        setIsOpen(true);
        setIsEditing(false);
    };

    const SaveWKey = (e) => { //ctrl+Sで保存　macOSとその他で場合分け
        if(isMacOs){
            if(e.key === 's' && e.metaKey) {
                e.preventDefault();
                save();
            }
        }else{
            if(e.key === 's' && e.ctrlKey) {
                e.preventDefault();
                save();
            }
        }
    }

    document.body.addEventListener('keydown', (e)=>SaveWKey(e)) //ctrl (cmd) + s を検知

    const Info = JSON.parse(localStorage.getItem('Info'));
    const sub_data = Info.classes ? Info.classes : {};

    return (
        <div style={{display:'flex', position:'absolute', zIndex:"2000", width:"100%"}}>
            <div className={styles.bg} style={{backgroundColor:"white", width:"100%"}}>
                <Header/>
                <span align="right" className={styles.version}>v{Version_data()}</span>
                <div className={styles.content}>
                    <div>
                        <span className={styles.title}>- クラス </span>
                        <span className={styles.savebutton} style={{ textDecoration: 'none' }} onClick={save}>保存</span>
                    </div>
                    <Subjects isEditing = {true} sub = {sub_data}/>
                </div>
            </div>
        </div>
    );
  }