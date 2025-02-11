import { Header } from "../Header/Header"
import styles from './home.module.css'
import { useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom"
import { isSmartPhone } from "../Header/Header"
import { auth } from "../Auth/Auth"
import { Table } from "./table"
import { OfflineViewdata, Viewdata } from "./Viewdata"
import { Warning } from "./warning"
import { useSwipeable } from 'react-swipeable'
import { Version_data } from "../data/Version_data"
import { Uniform } from "../Uniform/Uniform"
import Notification from "../Notification/Notification"


const now = new Date();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];



function showDay() {
    return (weeks[day] + " " + months[month] + "/" + date + " " + now.getFullYear());
}

export const Home = () =>{
    //リロード対策
    useEffect(()=> {
        if (!(auth.currentUser) && isOnline){
            navigate('/',{state:'/Home'})
        }
    })

    const navigate = useNavigate()
    const [isLeft, setIsLeft] = useState(true);
    const [Info,setInfo] = useState(null)
    useEffect(() => {
        // ローカルストレージから Info を取得
        const storedInfo = JSON.parse(localStorage.getItem("Info"));
        setInfo(storedInfo);
    
        // Info が null の場合に画面遷移
        if (!storedInfo) {
          navigate("/");
        } 
        
    }, [navigate]);

    
    const [thisweek,setWeek] = useState(true)
    const isOnline = navigator.onLine
    const [open,setOpen] =useState(false)
    
    //スワイプ判定系
    const swipetoggle = (e) => {
        if(e.dir==='Left'){
            setIsLeft(false);
        }else if(e.dir==='Right'){
            setIsLeft(true);
        }
        //console.log(e.dir)
    }
    
    const handlers = useSwipeable({
        onSwiped: (e) => swipetoggle(e),
        delta: 10,
        
    });
    
    document.addEventListener('keydown',function(event){
        if(event.key==='ArrowLeft'){
            setIsLeft(true)
        }else if (event.key === 'ArrowRight'){
            setIsLeft(false)
        }
    })
    //ここまで
    
    if (isOnline && auth.currentUser){
        Viewdata(thisweek)
    }else{
        OfflineViewdata()
        window.addEventListener('online',()=>{navigate('/')})
    }
    if(!Info){
        return null
    }
    const userclass = Info.class

    //popup
    Warning()

    if (isSmartPhone()){
        return (
            <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <Header />
            <span className={styles.body}>
                <span className={styles.info}> 
                    <span align="right" className={styles.version_mobile}>v{Version_data()}</span>
                    <span className={styles.p2}>{userclass}, 
                        <strong>{isLeft===true?'今週':'来週'}</strong>
                    </span>
                    <Uniform handy={true}/>
                </span>
                <span {...handlers}>
                    <Table setIsLeft={setIsLeft} isLeft={isLeft}/>
                </span>
            </span>
            <Notification />
        </div>
    )
    }else{
        return (
            <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
                <Header />
                <div className={styles.body}>
                    <span className={styles.info}> 
                        <span className={styles.p2}>Class : {userclass}</span>
                        <span align="right" className={styles.version}>v{Version_data()}</span> <br/>
                        <span className={styles.p2}>{showDay()} Displaying :  <strong>{isLeft===true?"今週":"来週"}</strong><span className={styles.toggleb_2} onClick={()=>{
                            setWeek.bind(null, !thisweek)
                            setIsLeft(!isLeft)
                            }}><strong>{isLeft ? '＞' : '＜'}</strong></span>
                        </span>
                        <Uniform handy={false}/>
                    </span>
                    <span {...handlers}>
                        <Table setIsLeft={setIsLeft} isLeft={isLeft}/>
                    </span>
                </div>
            </div>
        )
    }
}

export default Home;

