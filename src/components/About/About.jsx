import styles from './About.module.css'
import { Link } from 'react-router-dom'
import { isSmartPhone } from '../Header/Header'
import logo from '../../images/logo.png'

export const About =()=>{
    if(isSmartPhone()){
        return(

        <div>
        <div className={styles.blur1}></div>
        <div align="center"><p1 className={styles.Saboutp1} >Scheduler</p1></div>
        <div align="center"><p2 className={styles.Saboutp2}>時間割を、</p2></div>
        <div align="center"><p3 className={styles.Saboutp3}>もっとスマートに</p3></div>
        <div align="center"><img className={styles.Saboutimg1} src={logo} alt=''/></div><br />
        <div align="center"><Link to='/' className={styles.Saboutlogin} align="center">早速使ってみる</Link></div>
        <div className={styles.apologize}>
        <div align="center"><h1>This page is now under construction</h1></div>
        <div align="center"><h5>We apologize for the inconvinient.</h5></div>
        </div>
</div>
    )
    }else{
        return(
            <div>
                <div className={styles.blur1}></div>
                <div align="center"><p1 className={styles.aboutp1} >Scheduler</p1></div>
                <div align="center"><p2 className={styles.aboutp2}>時間割を、</p2></div>
                <div align="center"><p3 className={styles.aboutp3}>もっとスマートに</p3></div>
                <div align="center"><img className={styles.aboutimg1} src={logo} alt=''/></div><br />
                <div align="center"><Link to='/' className={styles.aboutlogin} align="center">早速使ってみる</Link></div>
                <div align="center"><h1>This page is now under construction</h1></div>
                <div align="center"><h5>We apologize for the inconvinient.</h5></div>
        </div>
    )
}
}