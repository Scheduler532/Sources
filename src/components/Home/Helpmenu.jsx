import { Link } from "react-router-dom"
import styles from './home.module.css'

//もう使わないけど一応残しておく
export const HelpMenu = (props) =>{
    const {open,setOpen} = props
    
    return(
        <div className={styles.helpmenucontainer} id='help'>
            <div align="right"><button className={styles.circlebutton} onClick={()=>{setOpen(!open)}} id='btn'>?</button></div>
            {open ? (
                <span className={styles.menu} id="menu">
                    <ul className={styles.helpmenu} >
                        <a href="https://forms.gle/9ExuRPUDyRMcMxxp8" target="_blank" className={styles.helpmenu} rel="noopener noreferrer">
                            <li>フィードバックを送信</li>
                        </a>
                        <Link to='/Usage' className={styles.helpmenu}  rel="noopener noreferrer">
                            <li>使い方</li>
                        </Link>
                        <a href="https://wataru532.github.io/Scheduler/" className={styles.helpmenu}>
                            <li>About Scheduler</li>
                        </a>
                        <Link to='/UpdateLog' className={styles.helpmenu}  rel="noopener noreferrer">
                            <li>Update Log</li>
                        </Link>
                    </ul>
                </span>
            ):(
                ""
            )}
        </div>
    )
}