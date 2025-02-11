import { OfflineHeader } from './OfflineHeader'
import styles from '../Home/home.module.css'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { isSmartPhone } from "../Header/Header"


const now = new Date();
const year = now.getYear();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var a = 0;
var b = 0;
const dates = year%4===0 &&!(year%100===0 && year%400!==0)
? [31,29,31,30,31,30,31,31,30,31,30,31]
: [31,28,31,30,31,30,31,31,30,31,30,31]

const classroom_name = [
                    "3-1","3-2","3-3","3-4","3年理探","3年国探",
                    "2-1","2-2","2-3","2-4","2年理探","2年国探",
                    "1-1","1-2","1-3","1-4","1-5","1-6"
                ]

const subj_col_class = {
    " 現国":"td_ja", " 言文":"td_ja", " 論国":"td_ja", " 漢文":"td_ja", " 古文":"td_ja", " 古漢":"td_ja", " 古典":"td_ja", //国語
    " 実数A":"td_math", " 実数B":"td_math", " 応数":"td_math", " 理数Ⅱα":"td_math"," 理数E":"td_math"," 数Ⅱ":"td_math"," 数B":"td_math"," 数BC":"td_math"," ⅢC":"td_math", //数学
    " 数ⅡⅢ":"td_math", " 理数Ⅱβ":"td_math"," 数Ⅰ":"td_math"," 数A":"td_math", " 理数Ⅰ":"td_math"," 数Ⅲ":"td_math", " 理数Ⅱ":"td_math",
    " 総英":"td_en"," EC":"td_en"," DDI":"td_en", //英語
    " EW":"td_en"," 論表":"td_en", 
    " 歴史":"td_soci"," 地理":"td_soci"," 世史":"td_soci"," 日史":"td_soci"," 政経":"td_soci", " 歴史β":"td_soci"," 地理β":"td_soci"," 公共":"td_soci", //社会
    " 物理":"td_sci", " 物基":"td_sci", " 理物":"td_sci", " 生物":"td_sci", " 生基":"td_sci", " 理生":"td_sci", " 化学":"td_sci", " 化基":"td_sci", " 理化":"td_sci"," 自α":"td_sci", " 自β":"td_sci"," 自科":"td_sci",//理科
    " 家":"td_homE", " 情報Ⅰ":"td_info", " 保":"td_pe", " 体":"td_pe", " 音楽":"td_art", " 美術":"td_art", " 書道":"td_art", " ":"td_none"//その他
}

function showDay() {
    return (weeks[day] + " " + months[month] + "/" + date + " " + now.getFullYear());
}

function showd_Mon(){
    if (date-day+1 > dates[month]){
        a = date-day+1 - dates[month];
    } else if (date-day+1 <= 0){
        a = dates[month-1] + date-day+1;
    }else{
        a = date - day + 1;
    }
    
    return a;
}

function showd_Tue(){
    if (date-day+2 > dates[month]){
        return date-day+2-dates[month];
    }else if (date-day+2 <= 0){
        return dates[month-1] + date-day+2;
    } else{
        return date - day + 2;
    }
}

function showd_Wed(){
    if (date-day+3 > dates[month]){
        return date-day+3-dates[month];
    }else if (date-day+3 <= 0){
        return dates[month-1] + date-day+3;
    } else{
        return date - day + 3;
    }
}

function showd_Thu(){
    if (date-day+4 > dates[month]){
        return date-day+4-dates[month];
    }else if (date-day+4 <= 0){
        return dates[month-1] + date-day+4;
    } else{
        return date - day + 4;
    }
}

function showd_Fri(){
    if (date-day+5 > dates[month]){
        b = date-day+5-dates[month];
    } else if (date-day+5 <= 0){
        b =  dates[month-1] + date-day+5;
    }else{
        b =  date - day + 5;
    }
    return b;
}

function month_Now(){
    if(date < 10 && a > b){
        var c = months[month-1];
        var d = months[month];
    }
    else if(date > 10 && a > b){
        c = months[month];
        d = months[month+1];
    }
    else{
        c = months[month];
        d = "none";
    }

    if (d === "none"){
        return c;
    }else{
        return c + " / " + d;
    }
}


//viewdataの代わり
const Viewdata=  () =>{
    const OfflineInfo = JSON.parse(localStorage.getItem('Offline'))
    const jsonData = OfflineInfo.ScheduleData;
    const userclass = OfflineInfo.Class
    const usercourse = OfflineInfo.Course

    const classData = jsonData[classroom_name.indexOf(userclass)+2]["null"]; 
    const Info = JSON.parse(localStorage.getItem('Info'))
    useEffect(()=>{
        for (let i = 0; i < 30; i++){ //選択教科表示、背景色変更
            let d = classData[i]
            if (d === " 芸" || d === " 物生" || d === " 理物生" || d === " 日地" || d === " 地歴β" || d === " 世政経"){ //選択科目用
            classData[i] = usercourse[d]; 
        } 
        d = classData[i] //更新しなきゃいけないの忘れてた
        
        document.getElementById(String(i)).innerHTML = d; //データセット
        let targetid = document.getElementById(String(i));
        if (targetid){                                    //背景色変更用
            let subj_col = subj_col_class[d];
            //ここのif文いらないかも
            //多分確実にsubj_col存在する
            if (d===" "){
                //なるほど
                targetid.style.border='0px'
                targetid.style.boxShadow='0px 0px 0px 0px'
            }else{
                targetid.style.backgroundColor = Info.subj_col[subj_col];
            }    
        }
    }
    },)
}

const HelpMenu = (props) =>{
    const {open,setOpen} = props
    
    return(
        <div id='help'>
        <div align="left"><button className={styles.circlebutton} onClick={()=>{setOpen(!open)}} id='btn'>?</button></div>
        {open ? (
        <div className={styles.menu} id="menu">
            <ul className={styles.helpmenu} >
                <a href="https://forms.gle/9ExuRPUDyRMcMxxp8" target="_blank" className={styles.helpmenu} rel="noopener noreferrer">
                    <li>フィードバックを送信</li></a>
                <Link to='/Guest_Usage' className={styles.helpmenu}  rel="noopener noreferrer">
                    <li>使い方</li></Link>
                <Link to='/About' className={styles.helpmenu} rel="noopener noreferrer">
                    <li>About Scheduler</li></Link>
                <Link to='/Guest_UpdateLog' className={styles.helpmenu}  rel="noopener noreferrer">
                    <li>Update Log</li></Link>
            </ul>
        </div>
        ):(
            ""
        )}
        </div>
    )
}

       
export const OfflineHome = () =>{
    const navigate = useNavigate()
    if(navigator.onLine){
        navigate('/')
    }
    window.addEventListener('online',()=>{navigate('/')})
    Viewdata()
    //Auth代わりにlocalstorage管理
    if(!(localStorage.getItem('Info'))){
        localStorage.setItem('Info',
            JSON.stringify({
                'class': null,
                'subjects':{'芸':null,'物生':null,'日地':null,'世政経':null,},
                "subj_col":{"td_ja":"#ff3e3e9c", "td_math":"#2c68ff9c", "td_en":"#ffe8379c", "td_sci":"#4e963d9c", "td_soci":"#ff9a479c", "td_homE":"#9863be9c", "td_info":"#63b6b79c", "td_pe":"#ffd6aa9c", "td_art":"#ffadf49c","td_none":"#ffffff"},
                "table_prop":{"width":630, "height":430, "left":25, "top":178},
                "notes":
                    {
                        "one":{"type":"txt", "left":200, "top":200, "content":"これはテストです"},
                        "two":{"type":"cdc", "left":300, "top":200, "content":"countdowncalender"}
                    }
            })
        )
    }
    const location = useLocation()
    if (location.state){
        navigate(location.state)
    }

    const [open,setOpen] =useState(false)




    const Info = JSON.parse(localStorage.getItem('Info'))
    const userclass = Info.class
    if (isSmartPhone()){
        return (
        <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <OfflineHeader />
            
            <div className={styles.body}>
                <div className={styles.info}> 
                    <p className={styles.p2}>Class : {userclass}</p><br />
                    <p className={styles.p2}>Today : {showDay()}</p><br />
                    <HelpMenu  open={open} setOpen={ setOpen }/>
                    <div align="right" className={styles.version}>v1.1.0</div>
                </div>
                <div className={styles.table_container} id="tableContainer" style={{width: "100%", height: "60%", position: "absolute"}}>
                    <div className={styles.resizer} id="bottomRightResizer"></div>
                    <table align="center" border="1" >
                        <thead>
                            <tr>
                                <th></th>
                                <th className= {day===1 ? styles.today : styles.not_today}>Mon</th>
                                <th className= {day===2 ? styles.today : styles.not_today}>Tue</th>
                                <th className= {day===3 ? styles.today : styles.not_today}>Wed</th>
                                <th className= {day===4 ? styles.today : styles.not_today}>Thu</th>
                                <th className= {day===5 ? styles.today : styles.not_today}>Fri</th>
                            </tr>
                            <tr>
                                <th>{month_Now()}</th>
                                <th className= {day===1 ? styles.today : styles.not_today}>{showd_Mon()}</th>
                                <th className= {day===2 ? styles.today : styles.not_today}>{showd_Tue()}</th>
                                <th className= {day===3 ? styles.today : styles.not_today}>{showd_Wed()}</th>
                                <th className= {day===4 ? styles.today : styles.not_today}>{showd_Thu()}</th>
                                <th className= {day===5 ? styles.today : styles.not_today}>{showd_Fri()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="tn">1</td><td className="htdata" id="0"></td><td className="htdata" id="6"></td><td className="htdata" id="12"></td><td className="htdata" id="18"></td><td className="htdata" id="24"></td></tr>
                            <tr><td className="tn">2</td><td className="htdata" id="1"></td><td className="htdata" id="7"></td><td className="htdata" id="13"></td><td className="htdata" id="19"></td><td className="htdata" id="25"></td></tr>
                            <tr><td className="tn">3</td><td className="htdata" id="2"></td><td className="htdata" id="8"></td><td className="htdata" id="14"></td><td className="htdata" id="20"></td><td className="htdata" id="26"></td></tr>
                            <tr><td className="tn">4</td><td className="htdata" id="3"></td><td className="htdata" id="9"></td><td className="htdata" id="15"></td><td className="htdata" id="21"></td><td className="htdata" id="27"></td></tr>
                            <tr><td className="tn">5</td><td className="htdata" id="4"></td><td className="htdata" id="10"></td><td className="htdata" id="16"></td><td className="htdata" id="22"></td><td className="htdata" id="28"></td></tr>
                            <tr><td className="tn">6</td><td className="htdata" id="5"></td><td className="htdata" id="11"></td><td className="htdata" id="17"></td><td className="htdata" id="23"></td><td className="htdata" id="29"></td></tr>
                        </tbody>
                    </table><br />
                </div>
            </div>
        </div>
    )
}else{
    return (
        <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <OfflineHeader />
            
            <div className={styles.body}>
                <div className={styles.info}> 
                    <p className={styles.p2}>Class : {userclass}</p><br />
                    <p className={styles.p2}>Today : {showDay()}</p><br />
                    <HelpMenu  open={open} setOpen={setOpen}/>
                    <div align="right" className={styles.version}>v1.1.0</div>
                </div>
                <div className={styles.table_container} id="tableContainer" style={{width: "70%", height: "60%", left: "15%"}}>
                    <div className={styles.resizer} id="bottomRightResizer"></div>
                    <table align="center" border="1" >
                        <thead>
                            <tr>
                                <th></th>
                                <th className= {day===1 ? styles.today : styles.not_today}>Mon</th>
                                <th className= {day===2 ? styles.today : styles.not_today}>Tue</th>
                                <th className= {day===3 ? styles.today : styles.not_today}>Wed</th>
                                <th className= {day===4 ? styles.today : styles.not_today}>Thu</th>
                                <th className= {day===5 ? styles.today : styles.not_today}>Fri</th>
                            </tr>
                            <tr>
                                <th>{month_Now()}</th>
                                <th className= {day===1 ? styles.today : styles.not_today}>{showd_Mon()}</th>
                                <th className= {day===2 ? styles.today : styles.not_today}>{showd_Tue()}</th>
                                <th className= {day===3 ? styles.today : styles.not_today}>{showd_Wed()}</th>
                                <th className= {day===4 ? styles.today : styles.not_today}>{showd_Thu()}</th>
                                <th className= {day===5 ? styles.today : styles.not_today}>{showd_Fri()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="tn">1</td><td className="htdata" id="0"></td><td className="htdata" id="6"></td><td className="htdata" id="12"></td><td className="htdata" id="18"></td><td className="htdata" id="24"></td></tr>
                            <tr><td className="tn">2</td><td className="htdata" id="1"></td><td className="htdata" id="7"></td><td className="htdata" id="13"></td><td className="htdata" id="19"></td><td className="htdata" id="25"></td></tr>
                            <tr><td className="tn">3</td><td className="htdata" id="2"></td><td className="htdata" id="8"></td><td className="htdata" id="14"></td><td className="htdata" id="20"></td><td className="htdata" id="26"></td></tr>
                            <tr><td className="tn">4</td><td className="htdata" id="3"></td><td className="htdata" id="9"></td><td className="htdata" id="15"></td><td className="htdata" id="21"></td><td className="htdata" id="27"></td></tr>
                            <tr><td className="tn">5</td><td className="htdata" id="4"></td><td className="htdata" id="10"></td><td className="htdata" id="16"></td><td className="htdata" id="22"></td><td className="htdata" id="28"></td></tr>
                            <tr><td className="tn">6</td><td className="htdata" id="5"></td><td className="htdata" id="11"></td><td className="htdata" id="17"></td><td className="htdata" id="23"></td><td className="htdata" id="29"></td></tr>
                        </tbody>
                    </table><br />
                </div>
            </div>
        </div>
    )
}
}
