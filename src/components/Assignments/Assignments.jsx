import styles from './Assignments.module.css';
import { Header } from '../Header/Header';
import { Version_data } from "../data/Version_data"
import { useState } from 'react';
import { isSmartPhone } from '../Header/Header';
import { PostDisplay } from './PostDisplay';
import { PostedCard } from './PostedCard';
import { SubjectData } from '../data/SubjectData';
import { Banner } from '../Banner/Banner';
import { auth } from '../Auth/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

var subj_choose = []; //global
var classes = []; //global

//ここからsidebar

export const Circle_col = (props) => { //props = obj
    const bgcol = props.bg;
    return (
        <div>
            <span className={styles.circle} style={{ backgroundColor:bgcol }}></span>
        </div>
    )
}

export const Expandbutton = ({isOpen,setIsOpen}) => {
    return (
        <div>
            {isOpen ? <div className={styles.postbg} style={{backgroundColor:"transparent", zIndex:'99'}} onClick={()=>{setIsOpen(false)}}/> : ''}
            <div className={`${styles.expandbutton} ${isOpen ? styles.open : ''}`} onClick={()=>{setIsOpen(!isOpen)}}>
                <span className={`${styles.expandcaret} ${isOpen ? styles.open : ''}`}/>
            </div>
        </div>
    )
}


export const Sidebar = ({tag,setTag}) => { //tag = [class,subject,current]
    classes = ["全校"];
    const subjdata = SubjectData();
    const isHandy = isSmartPhone();
    
    const subj_choose_add = subjdata.subj_choose;
    const colourData = subjdata.colourData;
    const yourclass = subjdata.yourclass;
    const type = subjdata.type;

    subj_choose = subj_choose_add.map((x)=>x.trim());

    const subjid = {"数学":"math","国語":"ja","英語":"en","化学":"che","物理":"phy","理物":"phy","生物":"bio","理生":"bio",
        "地理":"geo","地理β":"geo","歴史":"his","歴史β":"his","日史":"his","世史":"his","公共":"pub","政経":"pub","情報":"info","家庭科":"homE","保健体育":"pe","音楽":"art",
        "書道":"art","美術":"art","その他":"none"}
    const subjcolours = [];
    for(let i = 0; i < subj_choose.length; i++){
        subjcolours.push(colourData[`td_${subjid[subj_choose[i]]}`][0]);
    }

    classes.push(`${yourclass[0]}年次`);
    classes.push(`${yourclass[0]}年${type}`);
    classes.push(yourclass);

    const blank = [];
    for(let i = 0; i < 10; i++){
        blank.push("");
    }
    
    const [isOpen,setIsOpen] = useState(false);

    var yourclass_tag;
    if(yourclass==="2年理探") {
        yourclass_tag = "26";
    } else if(yourclass==="2年国探") {
        yourclass_tag = "25";
    } else if(yourclass==="3年理探") {
        yourclass_tag = "36";
    } else if(yourclass==="3年国探") {
        yourclass_tag = "35";
    } else {
        yourclass_tag = yourclass.split("-").join("");
    }

    const content_list = () => {
        return (
            <ul>
                <li onClick={()=>setTag(["a","all","a"])}>全校<Circle_col id="school" bg="#ffffff"/></li>
                <li onClick={()=>setTag([`g${yourclass[0]}`,"all",`g${yourclass[0]}`])}>{yourclass[0]}年次<Circle_col id="grade" bg="#ffffff"/></li>
                <li onClick={()=>setTag([`${type==='探究科' ? 't' : 'n'}${yourclass[0]}`,"all",`${type==='探究科' ? 't' : 'n'}${yourclass[0]}`])}>{yourclass[0]}年{type}<Circle_col id="type" bg="#ffffff"/></li>
                <li onClick={()=>setTag([yourclass_tag,"all",yourclass_tag])}>{yourclass}<Circle_col id="class" bg="#ffffff"/></li>
                {subj_choose.map((item, index) => (
                    <li onClick={()=>setTag([yourclass_tag,subjid[item],subjid[item]])} key={index}>{item}<Circle_col id={item} bg={subjcolours[index]}/></li> 
                ))}
                    <li onClick={()=>setTag(["all","all","all"])}>全て<Circle_col id="all" bg="#abcdef"/></li>
                {blank.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )
    }


    if(isHandy) {
        return (
            <div>
                <div className={`${styles.sidebar_handy} ${isOpen ? styles.open : ''}`} id="sidebar">
                    {content_list()}
                </div>
                <Expandbutton isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        )
    } else {
        return (
            <div>
                <div className={styles.sidebar} id="sidebar">
                    {content_list()}
                </div>
            </div>
        )
    }
}
//ここまで

export const PostButton = ({setIsOpen,setIsError,setBannerContent}) => { //新規投稿作成ボタン
    const [isCreating,setIsCreating] = useState(false);
    const isHandy = isSmartPhone();

    const render = () => {
        if(isHandy){ //モバイル版は下からニュルっと出てくる感じ
            return(<PostDisplay v={isCreating} setv={setIsCreating} subjs={subj_choose} classes={classes} isHandy={true} setIsOpen={setIsOpen} setIsError={setIsError} setBannerContent={setBannerContent}/>)
        } else if(isCreating) {
            return(<PostDisplay v={isCreating} setv={setIsCreating} subjs={subj_choose} classes={classes} isHandy={false} setIsOpen={setIsOpen} setIsError={setIsError} setBannerContent={setBannerContent}/>)
        }
    }
    return (
        <div>
            <span className={styles.createbutton} onClick={()=>setIsCreating(!isCreating)}>＋投稿を作成</span>
            {render()}
        </div>
    )
}

export const Assignments = () => { //レンダー大元
    //リロード対策
    const isOnline = navigator.onLine;
    const navigate = useNavigate();
    useEffect(()=> {
        if (!(auth.currentUser) && isOnline){
            navigate('/',{state:'/Assignments'})
        }
    })
    const jsonData = JSON.parse(sessionStorage.getItem('Assignments_Save')); //Assignments Data
    const [isOpen, setIsOpen] = useState(false); 
    const [tag,setTag] = useState(["a","all","a"]);
    const isHandy = isSmartPhone();

    const id_to_name = {
        "all":"全て",
        "a":"全校","g1":"1年次","g2":"2年次","g3":"3年次",
        "n1":"1年普通科","n2":"2年普通科","n3":"3年普通科","t1":"1年探究科","t2":"2年探究科","t3":"3年探究科",
        "11":"1-1","12":"1-2","13":"1-3","14":"1-4","15":"1-5","16":"1-6",
        "21":"2-1","22":"2-2","23":"2-3","24":"2-4","25":"2年国探","26":"2年理探",
        "31":"3-1","32":"3-2","33":"3-3","34":"3-4","35":"3年国探","36":"3年理探",
        "ja":"国語","math":"数学","en":"英語","che":"化学","phy":"物理","bio":"生物","geo":"地理","his":"歴史","pub":"公共",
        "info":"情報","homE":"家庭科","art":"芸術","pe":"保健体育","none":"その他"
    }

    const subjdata = SubjectData();
    const colourData = subjdata.colourData;

    colourData.td_all=['#abcdef','#000000']
    colourData.td_none=['#ffffff','#000000']

    const [isError, setIsError] = useState(false);
    const [bannerContent,setBannerContent] = useState('');
    return (
        <div>
            <Header />
            <Banner error={isError} content={bannerContent} isOpen={isOpen} setIsOpen={setIsOpen}/> 
            <Sidebar tag={tag} setTag={setTag}/>
            <PostButton setIsOpen={setIsOpen} setIsError={setIsError} setBannerContent={setBannerContent}/>
            <span //タグ表示
                className={styles.tag_display} 
                style={colourData[`td_${tag[2]}`] 
                    ? {backgroundColor:colourData[`td_${tag[2]}`][0],color:colourData[`td_${tag[2]}`][1]} 
                    : undefined}>{id_to_name[tag[2]]}
            </span>
            <span align="right" className={styles.version}>v{Version_data()}</span><br/>
            <PostedCard gotdata={jsonData.assignments} isHandy={isHandy} tag={tag}/> 
        </div>
    )
}