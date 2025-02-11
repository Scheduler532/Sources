import { Link,useLocation,useNavigate } from 'react-router-dom'
import { auth } from '../Auth/Auth'
import { signOut } from "firebase/auth";
import styles from './Header.module.css'
import logo from '../../images/logo.png'
import { Hamburger } from './hamburger/hamburger';
import { useEffect } from 'react';
import { useState } from 'react';
import { SaveAssignments } from '../Assignments/SaveAssignments';
import { Version_data } from '../data/Version_data';
import { isMobile,isTablet } from 'react-device-detect';

export const isSmartPhone = () => {
    if (isMobile || isTablet) {
      return true;
    } else {
        return false;
    }
}

export const HeaderTop = () => {
    SaveAssignments();
    const navigate = useNavigate()
    const isOnline = navigator.onLine
    const pathname = useLocation().pathname;
    const [open,setOpen] =useState(false);

    const offInfo = JSON.parse(localStorage.getItem('Offline'))
    const UserIcon =()=>{
        if(offInfo){
            const IconData = offInfo.Usericon
            return(
                <div>
                    <img src={IconData} id='usericon' className={`${styles.SPicon} ${open ? styles.open : ""}`} alt ='' onClick={()=>{setOpen(!open)}}/>
                    {open ? (<Menu open={open} setOpen={setOpen} icon={IconData} name={offInfo.Username} mail={offInfo.Usermail}/>) :''}
                </div>
            )
        }else{
            return(
                <div>
                    <img src={auth.currentUser.photoURL} alt='' className={`${styles.SPicon} ${open ? styles.open : ""}`} onClick={()=>{setOpen(!open)}}/>
                    {open ? (<Menu open={open} setOpen={setOpen} icon={auth.currentUser.photoURL} name={auth.currentUser.displayName} mail={auth.currentUser.email}/>) :''}
                </div>
            )
        }
    }
    //リロード対策
    useEffect(() => {
        if (!(auth.currentUser) && isOnline){
            navigate("/",{state :pathname})
        }
    })
            
    const now = pathname.replace('/','') === "Classes-Edit" ? "Classes" : pathname.replace('/','');
    if (localStorage.getItem('islogin')){

        if (isSmartPhone()){
            return(
                <div className={styles.hbody}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Home')}}/>
                    <div className={styles.Stitle}>
                    <p className={styles.Stitle}>{now} </p>
                    </div>
                </div>
                <div align="right">
                    <UserIcon />
                </div>
        </div>
        )
    }else{

        return(
            <div className={styles.hbody}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Home')}}/>
                    <div className={styles.title}>
                    <p className={styles.title}>Scheduler - {now}</p>

                    </div>
                </div>
                <div align="right" >
                    <UserIcon />
                </div>
        </div>
    )
}
}
}

export const Menu = ({open,setOpen,icon,name,mail}) => {
    return (
        <div className={styles.transparent_bg} onClick={()=>setOpen(!open)}>
            <span className={styles.menu} id="menu" onClick={(e) => {e.stopPropagation(); }}>
                <ul className={styles.helpmenu} >
                    <img src={icon} className={styles.menuImg}></img>
                    <div className={styles.txtcont}>
                        <span className={styles.menuUName}>{name}</span>
                        <span className={styles.menuUMail}>{mail}</span>
                    </div>
                    <li><a href="https://forms.gle/9ExuRPUDyRMcMxxp8" target="_blank" className={styles.helpmenu} rel="noopener noreferrer">
                            フィードバックを送信
                    </a></li>
                    <li><Link to='/Usage' className={styles.helpmenu}  rel="noopener noreferrer">
                        使い方
                    </Link></li>
                    <li><a href="https://wataru532.github.io/Scheduler/" className={styles.helpmenu}>
                        About Scheduler
                    </a></li>
                    <li><Link to='/UpdateLog' className={styles.helpmenu}  rel="noopener noreferrer">
                        Update Log
                    </Link></li>
                    <hr/>
                    <li><Link onClick={()=>{
                            console.log(2)
                            signOut(auth)
                            localStorage.setItem('islogin',false)
                    }} to = '/'  className={styles.logout}>Log Out</Link></li>
                    <span style={{padding: "5px 10px", color:"rgb(155, 155, 155)", fontWeight:"lighter", fontSize:"small", userSelect:"none",cursor:"default"}}>v{Version_data()}</span>
                </ul>
            </span>
        </div>
    )
}

export const Header = () => {
    SaveAssignments();
    const navigate = useNavigate()
    const isOnline = navigator.onLine
    const pathname = useLocation().pathname;
    const now = pathname.replace('/','') === "Classes-Edit" ? "Classes" : pathname.replace('/','');
    const [open,setOpen] = useState(false);

    const offInfo = JSON.parse(localStorage.getItem('Offline'))
    const UserIcon = (Handy)=>{
        if(offInfo){
            const IconData = offInfo.Usericon
            return(
                <div>
                    {Handy.Handy === true ? (
                        <div>
                            <img src={IconData} id='usericon' className={`${styles.SPicon} ${open ? styles.open : ""}`} alt ='' onClick={()=>{setOpen(!open)}}/>
                        </div>
                    ): (<div>
                            <img src={IconData} id='usericon' className={`${styles.Picon} ${open ? styles.open : ""}`} alt ='' onClick={()=>{setOpen(!open)}}/>
                        </div>)
                    }
                    
                    {open ? (<Menu open={open} setOpen={setOpen} icon={IconData} name={offInfo.Username} mail={offInfo.Usermail}/>) :''}
                </div>
            )
        }else{
            return(
                <div>
                    {Handy.Handy === true ? (
                        <div>
                            <img src={auth.currentUser.photoURL} alt='' className={`${styles.SPicon} ${open ? styles.open : ""}`} onClick={()=>{setOpen(!open)}}/>
                        </div>
                    ): (<div>
                            <img src={auth.currentUser.photoURL} alt='' className={`${styles.Picon} ${open ? styles.open : ""}`} onClick={()=>{setOpen(!open)}}/>
                        </div>)
                    }
                    
                    {open ? (<Menu open={open} setOpen={setOpen} icon={auth.currentUser.photoURL} name={auth.currentUser.displayName} mail={auth.currentUser.email}/>) :''}
                </div>
            )
        }
    }
    //リロード対策
    useEffect(()=>{
        if (!(auth.currentUser) && isOnline){
            navigate("/",{state:pathname})
        }
    })

    if(localStorage.getItem('islogin')){
        if (isSmartPhone()){
            return(
            <div className={styles.hbody}>
                <div className={styles.flex}>
                    <img src={logo} className={styles.Slogo} alt='' onClick={() =>{navigate('/Home')}} id='icon'/>
                    <div className={styles.Stitle}>
                    <p className={styles.Stitle}>{now}</p>
                    </div>
                </div>
                <Hamburger />
                <div align="right">
                    <UserIcon Handy={true}/>
                </div>
            </div>
        )
        }else{
            return(

                <div className={styles.hbody}>
                    <div className={styles.flex}>
                        <img src={logo} className={styles.Plogo} alt='' onClick={() =>{navigate('/Home')}} id = 'icon'/>
                        <div className={styles.title}>
                            <p className={styles.title}>Scheduler - {now}</p>
                        </div>
                    </div>

                    <div align="right">
                        <UserIcon Handy={false}/>
                    </div>
                        
                    <div align="left">
                        <Link to = '/Home' className={styles.home}>Home</Link>
                        <Link to = '/Assignments' className={styles.assignments}>Assignments</Link>
                        <Link to = '/Classes' className={styles.classes}>Classes</Link>
                        <a href="https://mail.google.com/chat/u/0/#chat/home" class={styles.chats} target="_blank" rel="noopener noreferrer">Chats</a>
                        <Link to = '/Settings' className={styles.settings}>Settings</Link>
                    </div>
                </div>
            )
        }
    }
}