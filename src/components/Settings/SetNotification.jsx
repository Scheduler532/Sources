import React, { useState,useEffect } from "react";

import { db } from "../Auth/Auth";
import styles from "./Settings.module.css"
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import { TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { auth } from "../Auth/Auth";
import { setDoc,doc, updateDoc } from "firebase/firestore";



const BaseTimePicker =()=>{
	const userid=auth.currentUser.uid

	const [time,setTime] = useState(localStorage.getItem('NotificationTime'))//0~1440の分表示

	const [value, setValue] = useState(dayjs());//hh:mm　表示


	useEffect(()=>{
		if(time){
			const hour=time/60 |0
			const minute=time%60
			setValue(dayjs().hour(hour).minute(minute))
		}
	},[time])




	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<TimePicker
			label="Select Time"
			value={value}
			onChange={(newValue) => {
				setValue(newValue)
				
				const selectedHour = newValue.hour(); // 時間
				const selectedMinute = newValue.minute(); // 分
				const Time = selectedHour*60+selectedMinute
				setTime(Time)

				setDoc(doc(db,'reminders',userid),{
					'IsNotification':true,
					'NotificationTime':Time,
					'userid':userid
				})
			}}
			renderInput={(params) => <TextField {...params} />}
			ampm={false}
		/>
		</LocalizationProvider>
	);
}
	  

const ToggleSwitchButton = ({isOn,setIsOn }) => {
	const userid = auth.currentUser.uid
	const navigate=useNavigate()
    const requestPermission = async () => {
		let permission = Notification.permission
		if(permission ==='default'){
			permission = await Notification.requestPermission();
		}
		setIsOn(!isOn)
		localStorage.setItem('IsNotification',isOn?0:1)
		if(isOn===false && (permission ==='default' || permission ==='denied' || permission===undefined)){
			
			swal.fire({
				title:'お願い',
				html:'通知が許可されていません。ブラウザの設定から許可してください',
				icon:'info'
			})
			setIsOn(false)
			localStorage.setItem('IsNotification',0)
			navigate('/',{state:'/Settings'})
		}
		if(isOn===true){
			updateDoc(doc(db,'reminders',userid),{
				IsNotification:false
			})
		}else{
			updateDoc(doc(db,'reminders',userid),{
				IsNotification:true
			})
		}
    }

        return(
            <div>
				<label className={styles.iosToggleButton}>
					<input type="checkbox" id='iToggleB' checked={isOn} onChange={requestPermission}/>
				</label> 
            </div>
        )
}


const AssignmentToggle =()=>{
	const Info = JSON.parse(localStorage.getItem('Info'))
	const [isOn,setIsOn]=useState(Info.isAssignmentNotification===true ?true:false)
	
	console.log(Info.isAssignmentNotification)
	console.log(isOn)
	const userid = auth.currentUser.uid

	useEffect(()=>{
		if(isOn !== undefined){
			Info.isAssignmentNotification =isOn
			localStorage.setItem('Info',JSON.stringify(Info))
			updateDoc(doc(db,'users',userid),{
				isAssignmentNotification:isOn
			})
		}
	},[isOn,userid,Info])
	
	return(
		<div >
			<p>Receive Assingnment Notifications</p>
			<label className={styles.iosToggleButton}>
				<input type="checkbox" id='iToggleB' checked={isOn} onChange={()=>{setIsOn(!isOn)}}/>
			</label> 
		</div>
	)
}

const SetNotification = () => {

  const ison = Boolean(parseInt(localStorage.getItem('IsNotification')))?true:false

  const [isOn, setIsOn] = useState(ison)
  if(localStorage.getItem('IsNotification')===null){
	localStorage.setItem('IsNotification',0)
  }

  
  if(isOn){
	return (
		<div>
			<p className={styles.margin}>Notification</p> <br />
			<div className={styles.NotificationToggle}>
				<ToggleSwitchButton className="toggle-switch-button" isOn = {isOn} setIsOn={setIsOn} />
			</div>
			<div className={styles.SetiingNotification}>
				<p>Notification Time</p>
				<br />
				<BaseTimePicker />
			</div>
			<br />
			<div className={styles.AssignmentToggle}>
				<AssignmentToggle />
			</div>
		</div>
	);
  }else{
	return(
		<div>
		<p1 className={styles.margin}>Notification</p1> <br />
		<div className={styles.NotificationToggle}>
			<ToggleSwitchButton isOn = {isOn} setIsOn={setIsOn} />
		</div>
	</div>
	)
  }
};

export default SetNotification;
