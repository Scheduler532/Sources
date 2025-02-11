import styles from './Uniform.module.css';
import { useState } from 'react';
import { SaveAssignments } from '../Assignments/SaveAssignments';
import { Banner } from '../Banner/Banner';
import { auth } from '../Auth/Auth';

export const CreateDisplay = ({v,setv,isHandy,setIsOpen}) => {

    const [selected,setSelected] = useState('全校')
    const jsonData = JSON.parse(sessionStorage.getItem('Assignments_Save'));
    var uniformData = jsonData ? jsonData.uniform : '';
    const [date,setDate] = useState(' - - -');
    const disableClick = (e) => {
        e.stopPropagation();
    };

    const sonntag = () => {
        const now = new Date();
        const year = now.getFullYear()
        const month = now.getMonth();
        const date = now.getDate();
        const day = now.getDay();

        var dates;
        if (year%4 === 0 && !(year%100 === 0 && year%400 !== 0)) {
            dates = [31,29,31,30,31,30,31,31,30,31,30,31];
        } else{
            dates = [31,28,31,30,31,30,31,31,30,31,30,31];
        }

        var sun_date; //Sunday
        if (date-day > dates[month]){
            sun_date = date-day - dates[month];
        } else if (date-day+1 <= 0){
            sun_date = dates[month === 0 ? 11 : month-1] + date-day;
        }else{
            sun_date = date - day;
        }

        var mon; //Month and Year
        var ye;
        if (sun_date <= date) {
            mon = month + 1; //monthは0オリジン
            ye = year;
        } else if (month === 0) {
            mon = 12;
            ye = year - 1;
        } else {
            mon = month;
            ye = year;
        }

        const weekfirst = ye * 10 ** 4 + mon * 10 **2 + sun_date;

        return weekfirst;
    }

    const add = () => {
        const gotdate = document.getElementById("d").value.split('-');
        const adddate = Number(gotdate[0]*10**4) + Number(gotdate[1]*10**2) + Number(gotdate[2]);
        const weekfirst = sonntag();

        //旧データのソートと削除
        uniformData = uniformData.filter(item => item.date >= weekfirst); 

        const container ={}
        container.date= adddate
        container.target= selected
        container.author=auth.currentUser.displayName
        if(container.date>=weekfirst){
            uniformData.push(container)
        }

        jsonData.uniform = uniformData;
        sessionStorage.setItem('Assignments_Save',JSON.stringify(jsonData));
        sessionStorage.setItem('isAssignmentsSaved','false');

        setv(false);
        SaveAssignments(); //やっぱ随時アップロードの方がいいかも（vβ3.0.0.14）
        setIsOpen(true);
        console.log("okeydokey");
    }
    const SelectGrade =(props)=>{
        const selected = props.selected
        const setSelected = props.setSelected
        const options = ["全校", "一年", "二年", "三年"];
        const handleChange = (event) => {
            setSelected(event.target.value);
        }


        return (
            <div className={styles.selectgrade}>
                <label htmlFor="">
                    対象クラス: 
                    <select value={selected} onChange={handleChange} className={styles.inputclass}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                </label>
            </div>
              
        );
    };

    
    if(isHandy) {
        return (
            <div>
                <div className={`${styles.postbg_handy} ${v ? '' : styles.close}`} onClick={()=>setv(false)}/> {/*背景*/}
                    <span className={`${styles.container_handy} ${v ? styles.open : ''}`} onClick={disableClick}>
                        <span className={styles.closebutton} onClick={()=>setv(false)}>X</span>
                        <div className={styles.title}>基準服登校日を追加</div>
                        <div className={styles.datecontainer} style={{width:"100%",top:"7em"}}>
                            <span className={styles.datetxt}>{date.split('-')[0]}年{date.split('-')[1]}月{date.split('-')[2]}日</span>
                            <input type="date" id="d" className={styles.inputdate} onChange={(e)=> setDate(e.target.value)}></input>
                            <div className={styles.selector}>
                                <SelectGrade setSelected={setSelected} selected={selected}/>
                            </div>
                        </div>
                        <div className={styles.confirmbutton_handy} onClick={add}>追加</div>
                    </span>
            </div>
        )
    } else {
        return (
            <div className={styles.postbg} onClick={()=>setv(false)}>
                <div className={styles.container} onClick={disableClick}>
                    <span className={styles.closebutton} onClick={()=>setv(false)}>X</span>
                    <span className={styles.title}>基準服登校日を追加</span>
                    <div className={styles.datecontainer}>
                        <span className={styles.datetxt}>{date.split('-')[0]}年{date.split('-')[1]}月{date.split('-')[2]}日</span>
                        <input type="date" id="d" className={styles.inputdate} onChange={(e)=> setDate(e.target.value)}></input>
                        <div className={styles.selector}>
                            <SelectGrade setSelected={setSelected} selected={selected}/>
                        </div>
                    </div>
                    <span className={styles.confirmbutton} onClick={add}>＞追加</span>
                </div>
            </div>
        )    
    }
}

export const Uniform = (handy) => {
    const [isCreating,setIsCreating] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const isHandy = handy.handy;

    const createdisplayrender = () => {
        if(!isHandy && isCreating){
            return(<CreateDisplay v={isCreating} setv={setIsCreating} isHandy={false} setIsOpen={setIsOpen}/>); /*デスクトップ版の画面*/
        } else if (isHandy) {
            return(<CreateDisplay v={isCreating} setv={setIsCreating} isHandy={true} setIsOpen={setIsOpen}/>); /*モバイル版の画面*/
        }
        return null;
    }
    
    return (
        <div>
            <Banner error={false} content={'すべての変更を保存しました'} isOpen={isOpen} setIsOpen={setIsOpen}/> {/*引数名は統一*/}
            <span className={styles.createbutton} onClick={()=>setIsCreating(!isCreating)}>＋基準服登校日</span>
            {createdisplayrender()}
        </div>
    )
}