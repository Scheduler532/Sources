import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import styles from '../guest/guest_Header/hamburger/hamburger.module.css'

export const OfflineHamburger =()=>{
    return(
        <div id="outer-container">
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width={250}>
        <main id="page-wrap">
                <Link to = '/OfflineHome' className={styles.home}>Home</Link>
                <Link to = '/Assignments' className={styles.assignments}>Assignments</Link>
                <Link to = '/Classes' className={styles.classes}>Classes</Link>
                <a href="https://mail.google.com/chat/u/0/#chat/home" class={styles.chats} target="_blank" rel="noopener noreferrer">Chats</a>
                <Link to = '/OfflineSettings' className={styles.settings}>Settings</Link>
        </main>
        </Menu>
  </div>
    )
}