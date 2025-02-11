import { signInWithPopup } from "firebase/auth";
import styles from './Login.module.css'
import { auth,provider } from '../Auth/Auth'
import { useNavigate } from "react-router-dom"

function LoginButton(){
    const navigate = useNavigate()
    const signInWithGoogle = () =>{
      signInWithPopup(auth,provider)
      .then((result) => {
          navigate('/')
      }
      ).catch((error) => {
        console.log(error)
      })
    }
    return (
      <div>
        <button className={styles.buttonOutline} onClick={signInWithGoogle}>
          <p>Signin With Google</p> 
        </button>
      </div>
    )
  }

export {LoginButton}