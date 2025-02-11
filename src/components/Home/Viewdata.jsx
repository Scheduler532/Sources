import { use, useEffect } from 'react';
import { auth } from "../Auth/Auth";
import { useNavigate } from 'react-router-dom';


const now = new Date();
const year = now.getFullYear()
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();

const classroom_name = [
    "3-1","3-2","3-3","3-4","3年理探","3年国探",
    "2-1","2-2","2-3","2-4","2年理探","2年国探",
    "1-1","1-2","1-3","1-4","1-5","1-6"
]

const subj_col_class = {
" 現国":"td_ja", " 言文":"td_ja", " 論国":"td_ja", " 漢文":"td_ja", " 古文":"td_ja", " 古漢":"td_ja", " 古典":"td_ja"," 国語":"td_ja", //国語
" 実数A":"td_math", " 実数B":"td_math", " 応数":"td_math", " 理数Ⅱα":"td_math"," 理数E":"td_math"," 数Ⅱ":"td_math"," 数B":"td_math"," 数BC":"td_math"," ⅢC":"td_math", //数学
" 数ⅡⅢ":"td_math", " 理数Ⅱβ":"td_math"," 数Ⅰ":"td_math"," 数A":"td_math", " 理数Ⅰ":"td_math"," 数Ⅲ":"td_math", " 理数Ⅱ":"td_math",' 数ＢC':'td_math',' 理数Ⅰα':'td_math',
'  理数Ⅰβ':'td_math',' 数ⅢC':'td_math',' 理数Ⅰβ':'td_math'," 数学":"td_math",
" 総英":"td_en"," EC":"td_en"," DDI":"td_en"," 英語":"td_en", //英語
" EW":"td_en"," 論表":"td_en",' 総英ⅡⅢ':'td_en',' 総英ⅠⅡ':'td_en',' 総英Ⅲ':'td_en',
" 歴史":"td_his"," 地理":"td_geo"," 世史":"td_his"," 日史":"td_his"," 政経":"td_pub", " 歴史β":"td_his"," 地理β":"td_geo"," 公共":"td_pub"," 世公":"td_pub",//社会
" 物理":"td_phy", " 物基":"td_phy", " 理物":"td_phy", " 生物":"td_bio", " 生基":"td_bio", " 理生":"td_bio", " 化学":"td_che", " 化基":"td_che", " 理化":"td_che"," 自α":"td_bio", " 自β":"td_che"," 自科":"td_che",' 理科':'td_che',//理科
" 家":"td_homE", " 情報Ⅰ":"td_info", " 保":"td_pe", " 体理":"td_pe"," 体":"td_pe", " 音楽":"td_art", " 美術":"td_art", " 書道":"td_art", " ":"td_none"//その他
}

//画像をBase64に変換
async function getImageBase64(url) {
    const response = await fetch(url)
    const contentType = response.headers.get('content-type')
    const arrayBuffer = await response.arrayBuffer()
    let base64String = btoa(
    String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    )
    return `data:${contentType};base64,${base64String}`
}


export const OfflineViewdata = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const OfflineInfo = JSON.parse(localStorage.getItem('Offline'));
        const nextInfo = JSON.parse(localStorage.getItem('datanext'));
        const Info = JSON.parse(localStorage.getItem('Info'));

        // データが存在しない場合は画面遷移
        if (!OfflineInfo|| !Info) {
            navigate('/'); // 遷移先を適宜変更してください
            return;
        }

        const jsonData = OfflineInfo.ScheduleData;
        const jsonDatanext = nextInfo.data;
        const userclass = Info.class;

        const data_none = [" ", " ", " ", " ", " ", " ", " ", " ", "データ", " ", " ", " ", " ", " ", "入力", " ", " ", " ", " ", " ", "待ち", " ", " ", " ", " ", " ", " ", " ", " ", " "];
        const art = Info.subjects.芸;
        const social = Info.subjects.日地;
        const science = Info.subjects.物生;
        const politic = Info.subjects.世政経;
        const usercourse = { " 芸": art, " 理物生": science, " 物生": science, " 日地": social, " 地歴β": social, " 世公": politic };


        const classdata = jsonData[classroom_name.indexOf(userclass) + 2] ? jsonData[classroom_name.indexOf(userclass) + 2]["null"] : null

        setTimeout(()=>{
            if (jsonData !== 'none') {
                for (let i = 0; i < 30; i++) {
                    let d = classdata[i];
                    if ([" 芸", " 物生", " 理物生", " 日地", " 地歴β", " 世公"].includes(d)) {
                        classdata[i] = usercourse[d];
                    }
                    d = classdata[i];
                    const targetid = document.getElementById(String(i));
                    if (targetid) {
                        const subj_col = subj_col_class[d];
                        targetid.innerHTML = d;
                        if (d === " ") {
                            targetid.style.border = '0px';
                            targetid.style.boxShadow = '0px 0px 0px 0px';
                        } else {
                            targetid.style.backgroundColor = (typeof Info.subj_col[subj_col] === 'object') ? Info.subj_col[subj_col][0] : Info.subj_col[subj_col];
                        }
                    }
                }
            } else {
                for (let i = 0; i < 30; i++) {
                    const targetid = document.getElementById(String(i));
                    if (!targetid) {
                        continue; // 要素が見つからない場合、次のループにスキップ
                    }
                    targetid.innerHTML = data_none[i];
                    targetid.className = "td_none";
                    targetid.style.border = '0px';
                    targetid.style.backgroundColor = '#ffffff';
                    targetid.style.boxShadow = '0px 0px 0px 0px';
                }
            }
            
            if (jsonDatanext !== 'none') {
                const classdatanext = jsonDatanext[classroom_name.indexOf(userclass) + 2]["null"]
                for (let i = 30; i < 60; i++) {
                    let d = classdatanext[i - 30];
                    if ([" 芸", " 物生", " 理物生", " 日地", " 地歴β", " 世公"].includes(d)) {
                        classdatanext[i - 30] = usercourse[d];
                    }
                    d = classdatanext[i - 30];
                    const targetid = document.getElementById(String(i));
                    if (targetid) {
                        const subj_col = subj_col_class[d];
                        targetid.innerHTML = d;
                        if (d === " ") {
                            targetid.style.border = '0px';
                            targetid.style.boxShadow = '0px 0px 0px 0px';
                        } else {
                            targetid.style.backgroundColor = (typeof Info.subj_col[subj_col] === 'object') ? Info.subj_col[subj_col][0] : Info.subj_col[subj_col];
                        }
                    }
                }
            } else {
                for (let i = 30; i < 60; i++) {
                    const targetid = document.getElementById(String(i));
                    if (!targetid) {
                        continue; // 要素が見つからない場合、次のループにスキップ
                    }
                    targetid.innerHTML = data_none[i - 30];
                    targetid.className = "td_none";
                    targetid.style.border = '0px';
                    targetid.style.backgroundColor = '#ffffff';
                    targetid.style.boxShadow = '0px 0px 0px 0px';
                }
            }
        },[0])
    }, [navigate]);
};

var res = 0;
var resn = 0;
function day_process(){
    if (year%4==0 && !(year%100==0 && year%400!=0)) {
        var dates = [31,29,31,30,31,30,31,31,30,31,30,31];
    } else{
        var dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    }

    //Monday
    if (date-day+1 > dates[month]){
        var mon_date = date-day+1 - dates[month];
    } else if (date-day+1 <= 0){
        var mon_date = dates[month === 0 ? 11 : month-1] + date-day+1;
    }else{
        var mon_date = date - day + 1;
    }

    //Friday
    if (date-day+5 > dates[month]){
        var fri_date = date-day+5-dates[month];
    } else if (date-day+5 <= 0){
        var fri_date =  dates[month === 0 ? 11 : month-1] + date-day+5;
    }else{
        var fri_date =  date - day + 5;
    }

    //Month
    if(date < 10 && mon_date > fri_date){
        var m_1 = month;
        var m_2 = month+1;
        var m_1_new = m_2;
        var m_2_new = m_2;
    }
    else if(date > 10 && mon_date > fri_date){
        var m_1 = month+1;
        var m_2 = month+2;
        var m_1_new = m_2;
        var m_2_new = m_2;
    }
    else{
        var m_1 = month+1;
        var m_2 = m_1;
        if(mon_date+7 > dates[month]){
            var m_1_new = m_1 + 1;
            var m_2_new = m_1 + 1;
        } else if(fri_date + 7 > dates[month]){
            var m_1_new = m_1;
            var m_2_new = m_1 + 1;
        } else{
            var m_1_new = m_1;
            var m_2_new = m_2;
        }
    }

    if(m_1 > 12) m_1 -= 12;
    if(m_1 === 0) m_1 = 12;
    if(m_2 > 12) m_2 -= 12;
    if(m_2 === 0) m_2 = 12;
    if(m_1_new > 12) m_1_new -= 12;
    if(m_1_new === 0) m_1_new = 12;
    if(m_2_new > 12) m_2_new -= 12;
    if(m_2_new === 0) m_2_new = 12;

    //Nextweek
    if(m_1_new != m_2_new) {
        var mon_date_new = mon_date + 7;
    } else if(m_1_new != m_1){
        var mon_date_new = mon_date + 7 - dates[m_1 - 1];
    } else {
        var mon_date_new = mon_date + 7;
    }

    res = String(m_1)+String(mon_date);
    resn = String(m_1_new) + String(mon_date_new);
}
day_process();

export const  Viewdata =  (thisweek) =>{
    //選択科目のデータを取得するプログラムを記述
    const Info =  JSON.parse(localStorage.getItem('Info'))
    const art =  Info.subjects.芸
    const social =  Info.subjects.日地
    const science =  Info.subjects.物生
    const politic =  Info.subjects.世政経
    const selectionData = {
        "class": (classroom_name.indexOf(Info.class)+2), //12 as 2年理探
        "subjects":{" 芸":art, " 理物生":science, " 物生":science, " 日地":social," 地歴β":social," 世公":politic}
    }
   

    const data_none = [" "," "," "," "," "," ",
                        " "," ","データ"," "," "," ",
                        " "," ","入力"," "," "," ",
                        " "," ","待ち"," "," "," ",
                        " "," "," "," "," "," ",
    ]
    
   

    //今週
    try {
        fetch(`https://raw.githubusercontent.com/Wataru532/SchedulerStorage/main/scheduler_data${res}.json`)
        .then(function(response) { //データが存在しなかった場合の処理
            if (!response.ok) {
                for(let i = 0; i < 30; i++){
                    let targetid = document.getElementById(String(i));
                    targetid.innerHTML = data_none[i];
                    targetid.className = "td_none";
                    targetid.style.border='0px'
                    targetid.style.backgroundColor='#ffffff'
                    targetid.style.boxShadow='0px 0px 0px 0px'
                }
                const off = async()=>{
                    const b64 = await getImageBase64(auth.currentUser.photoURL)
                    const Offline ={
                        "updatedate":date,
                        "ScheduleData":'none',
                        "Username":auth.currentUser.displayName,
                        "Usericon":b64,
                        "Usermail":auth.currentUser.email,
                    }
                    localStorage.setItem('Offline',JSON.stringify(Offline))
                }
                off()            
            }
            return response.json();
        })
        .then(function(data) {
            const jsonData = data;
            window.setTimeout(async()=>{
                const b64 = await getImageBase64(auth.currentUser.photoURL)
                const Offline ={
                    "updatedate":date,
                    "ScheduleData":jsonData,
                    "Username":auth.currentUser.displayName,
                    "Usericon":b64,
                    "Usermail":auth.currentUser.email,
                }

                localStorage.setItem('Offline',JSON.stringify(Offline))
                const txtcoladj = JSON.parse(localStorage.getItem('Info')).txtcoladj; //txt colour adjustment

                const classData = jsonData[selectionData["class"]]["null"]; 
                for (let i = 0; i < 30; i++){ //選択教科表示、背景色変更
                    let d = classData[i]
                    if (d === " 芸" || d === " 物生" || d === " 理物生" || d === " 日地" || d === " 地歴β" || d === " 世公"){ //選択科目用
                        classData[i] = selectionData["subjects"][d]; 
                    } 
                    d = classData[i] 
                    
                    document.getElementById(String(i)).innerHTML = d; //データセット
                    let targetid = document.getElementById(String(i));
                    if (targetid){                                    //背景色変更用
                        let subj_col = subj_col_class[d];
                        targetid.name = subj_col ? subj_col : "td_none";
                        
                        if (d===" "){
                            targetid.style.border='0px'
                            targetid.style.boxShadow='0px 0px 0px 0px'
                            targetid.style.backgroundColor='#ffffff'
                        }else if (!subj_col){
                            targetid.style.backgroundColor='#ffffff'
                            targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                            targetid.style.border='1px whitesmoke solid'
                        }else{
                            targetid.style.backgroundColor = Info.subj_col[subj_col][0];
                            targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                            targetid.style.border='1px whitesmoke solid'
                            if(txtcoladj === true){
                                targetid.style.color = Info.subj_col[subj_col][1];
                            } else {
                                targetid.style.color = '#000000';
                            }
                        }      
                    }
                }
            },[10])
        })
        .catch(error => {let x = error});
    } catch(error) {
        let nothing = "error";
    }

    //来週
    try {
        fetch(`https://raw.githubusercontent.com/Wataru532/SchedulerStorage/main/scheduler_data${resn}.json`)
        .then(function(response) {
            if (!response.ok) { //データが存在しなかった場合の処理
                for(let i = 30; i < 60; i++){
                    let targetid = document.getElementById(String(i));
                    targetid.innerHTML = data_none[i-30];
                    targetid.className = "td_none";
                    targetid.style.backgroundColor='#ffffff'
                    targetid.style.border='0px'
                    targetid.style.boxShadow='0px 0px 0px 0px'
                }
                localStorage.setItem('datanext',JSON.stringify({data:'none'}))
            }
            return response.json();
        })
        .then(function(data) {
            const jsonData = data;
            window.setTimeout(async()=>{
                localStorage.setItem('datanext',JSON.stringify({'data':jsonData}))
                const txtcoladj = localStorage.getItem('txtcoladj') === 'true' ? true : false; //txt colour adjustment

                const classData = jsonData[selectionData["class"]]["null"]; 
                
                for (let i = 30; i < 60; i++){ //選択教科表示、背景色変更
                    let d = classData[i-30]
                    if (d === " 芸" || d === " 物生" || d === " 理物生" || d === " 日地" || d === " 地歴β" || d === " 世公"){ //選択科目用
                        classData[i-30] = selectionData["subjects"][d]; 
                    } 
                    d = classData[i-30] 
                    
                    document.getElementById(String(i)).innerHTML = d; //データセット
                    let targetid = document.getElementById(String(i));
                    if (targetid){                                    //背景色変更用
                        let subj_col = subj_col_class[d];
                        targetid.name = subj_col ? subj_col : "td_none";

                        if (d===" "){
                            targetid.style.border='0px'
                            targetid.style.boxShadow='0px 0px 0px 0px'
                            targetid.style.backgroundColor='#ffffff'
                        }else if (!subj_col){
                            targetid.style.backgroundColor='#ffffff'
                            targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                            targetid.style.border='1px whitesmoke solid'
                        }else{
                            targetid.style.backgroundColor = Info.subj_col[subj_col][0];
                            targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                            targetid.style.border='1px whitesmoke solid'
                            if(txtcoladj === true){
                                targetid.style.color = Info.subj_col[subj_col][1];
                            } else {
                                targetid.style.color = '#000000';
                            }
                        }      
                    }
                }
            },[10])
        })
        .catch(error => {let x = error});
    } catch(error) {
        let nothing = "error"
    }

}