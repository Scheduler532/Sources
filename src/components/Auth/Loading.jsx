import { GridLoader } from 'react-spinners'
import styles from './Loading.module.css'


const LoadingScreen=()=> {
    return (
      <div className={styles.bg}>
        <div className={styles.loading}>
          <GridLoader color='rgb(110, 196, 205)' speedMultiplier='1'  cssOverride=
          {{
              display: "block",
              position:"absolute",
              top:"40%",
              justifySelf:'center'
          }} />
          <div className={styles.title} align="center">Scheduler</div>
        </div>
      </div>
    )
}

export {LoadingScreen}