import styles from './Login.module.css'
import { LoginButton } from "./LoginButton";
import { isSmartPhone } from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../images/logo.png';

function Login() {
  const navigate = useNavigate()
  if (!navigator.onLine){
    navigate('/OfflineHome')
  }
  const islogin = localStorage.getItem('islogin')
  //ログイン済みなのにloginをわざわざ開いてくるやつ対策
  useEffect(()=>{
    if(islogin ==='true'){
      navigate('/Home')
    }
  })

  if (isSmartPhone()){
    return (
      <div className={styles.SLoginBody}>
        <a href="https://wataru532.github.io/Scheduler" target="_blank" rel="noopener noreferrer">
          <img src={logo} className={styles.schedulerlogo} width="50" height="50"/>
          <span className={styles.Title}>Scheduler</span>
        </a>
        <div className={styles.login}>
          <div className={styles.Sloginscreen}>
            <span className={styles.loginTitle}>Login</span>
            <div>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className={styles.LoginBody}>
        <a href="https://wataru532.github.io/Scheduler" target="_blank" rel="noopener noreferrer">
          <img src={logo} className={styles.schedulerlogo} width="50" height="50"/>
          <span className={styles.Title}>Scheduler</span>
        </a>
        <div className={styles.login}>
          <div className={styles.loginscreen}>
            <span className={styles.loginTitle}>Login</span>
            <div>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {Login}