import { Link } from "react-router-dom"
import styles from './404.module.css'

export const Page404 = () => {
  return (
    <div align="center">
    <span className={styles.notfound_title}>Not Developed</span>
    <p className={styles.notfound_text}>Sorry, this page is under construction.</p>
    <Link to="/" className={styles.back}>Homeに戻る</Link>
  </div>
  )
}