import styles from './Classes.module.css';
import { Header } from '../Header/Header';
import { Subjects } from './Subjects/Subjects';
import { Version_data } from "../data/Version_data";
import { useState } from 'react';
import { Edit } from './Edit/Edit';
import { Banner } from '../Banner/Banner';
import { auth } from '../Auth/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export const Classes = () => {
    //リロード対策
    const isOnline = navigator.onLine;
    const navigate = useNavigate();
    useEffect(()=> {
        if (!(auth.currentUser) && isOnline){
            navigate('/',{state:'/Classes'})
        }
    })

    const [isOpen, setIsOpen] = useState(false);
    const [isEditing,setIsEditing] = useState(false)
    const Info = JSON.parse(localStorage.getItem('Info'))
    const sub_data = Info.classes ? Info.classes : {};

    const startEditing = () => {
        if(!isOnline && auth.currentUser){
            Swal.fire({
                title:'注意',
                html:'オフラインで実行中です。クラスの編集はできません。',
                icon:'warning'
            })
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    return (
        <div>
            <div className={styles.bg}>
                {isEditing ? <Edit setIsOpen={setIsOpen} setIsEditing={setIsEditing} /> : ""}
                <Header/>
                <Banner error={false} content={'すべての変更を保存しました'} isOpen={isOpen} setIsOpen={setIsOpen}/> {/*引数名は統一*/}
                <span align="right" className={styles.version}>v{Version_data()}</span>
                <div className={styles.content}>
                    <div>
                        <p className={styles.title}>- クラス 
                            <span className={styles.editcontainer} onClick={()=>startEditing()}>
                                <span className={styles.edit}/> {/*編集用鉛筆マーク*/}
                            </span>
                        </p>
                    </div>
                    <Subjects isEditing = {false} sub = {sub_data}/>
                </div>
            </div>
        </div>
    );
  }

