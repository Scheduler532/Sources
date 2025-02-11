import { SubjectData } from '../data/SubjectData';
import styles from './Assignments.module.css';
import { useState } from 'react';

const id_to_name = {
    "a":"全校","g1":"1年次","g2":"2年次","g3":"3年次",
    "n1":"1年普通科","n2":"2年普通科","n3":"3年普通科","t1":"1年探究科","t2":"2年探究科","t3":"3年探究科",
    "11":"1-1","12":"1-2","13":"1-3","14":"1-4","15":"1-5","16":"1-6",
    "21":"2-1","22":"2-2","23":"2-3","24":"2-4","25":"2年国探","26":"2年理探",
    "31":"3-1","32":"3-2","33":"3-3","34":"3-4","35":"3年国探","36":"3年理探",
    "ja":"国語","math":"数学","en":"英語","che":"化学","phy":"物理","bio":"生物","geo":"地理","his":"歴史","pub":"公共",
    "info":"情報","homE":"家庭科","art":"芸術","pe":"保健体育","none":"その他"
}

const now = new Date();
const year = now.getFullYear()
const month = now.getMonth();
const date = now.getDate();
//投稿欄表示
export const Expanded = ({setIsExpanded,title,subject,classtype,duedate,content,author,isNear,changeCol,isHandy}) => {
    const duedate_l = duedate.split('-').map((x) => Number(x)); //[YYYY,MM,DD]
    const disableClick = (e) => {
        e.stopPropagation();
    };
    const [isInfoOpen,setIsInfoOpen] = useState(false);

    return (
        <div className={styles.postbg} onClick={()=>setIsExpanded(false)}>
            <div className={`${styles.postcontainer} ${isHandy ? styles.handy : ''}`} onClick={disableClick}>
                <span className={styles.infobutton} onClick={()=>setIsInfoOpen(!isInfoOpen)}>︙</span> {/*Info Button*/}
                {isInfoOpen ? (<div className={styles.postbg} style={{backgroundColor:"transparent"}} onClick={()=>setIsInfoOpen(false)}/>) : ''}
                <span className={`${styles.infoopen} ${isInfoOpen ? styles.open : ''}`} onClick={disableClick}>投稿者：{author}</span>
                <span className={styles.closebutton} onClick={()=>setIsExpanded(false)}>X</span> {/*Close Button*/}
                <h1>{title}
                {changeCol ? (
                    <div className={styles.danger} style={{fontSize:"70%",marginTop:"0.33em",marginLeft:"0.33em"}}>!</div> //提出期限が近づいているときに表示
                ): ""}
                </h1>
                <div className={styles.datecontainer}>
                    <span className={styles.heading}>期限</span>
                    {changeCol 
                        ? (<span className={styles.contenttxt} style={{color:"rgb(228, 20, 20)"}} >{duedate_l[0]}年{duedate_l[1]}月{duedate_l[2]}日</span>) 
                        : (<span className={styles.contenttxt}>{duedate_l[0]}年{duedate_l[1]}月{duedate_l[2]}日</span>)
                    }
                    {isNear==="today" ? (<span className={styles.contenttxt}>今日！</span>) : ''}
                    {isNear==="overdue" ? (<span className={styles.contenttxt}>期限を過ぎました</span>) : ''}
                </div>
                <div className={styles.tagscontainer}>
                    <span className={styles.heading} style={{fontSize:'70%'}}>タグ</span>
                    <span className={styles.tagtxt}>{id_to_name[classtype]}</span>
                    <span className={styles.tagtxt} style={{marginRight:0}}>{id_to_name[subject]}</span> {/*背景色を選択した色にしたい*/}
                </div>
                <div className={styles.contentcontainer}>
                    <span className={styles.heading}>詳細</span><br/>
                    <span className={styles.contenttxt}>{content}</span>
                </div>
            </div>
        </div>
    )
}

//一枚一枚のカード
export const Card = ({title,subject,classtype,duedate,content,author,isHandy}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const duedate_l = duedate.split('-').map((x) => Number(x)); //[YYYY,MM,DD]

    var isNear;
    var changeCol = false;
    if(year===duedate_l[0]){
        if(month+1===duedate_l[1]){
            if(duedate_l[2] - date > 0){
                if(duedate_l[2] - date < 7) {
                    isNear = true;
                    changeCol = true;
                } else {
                    isNear = false;
                }
            } else if(duedate_l[2] === date){
                changeCol = true;
                isNear = "today";
            } else {
                isNear = "overdue";
            }
        } else if(month+1 > duedate_l[1]) {
            isNear = "overdue";
        } else { //判定甘め +30日
            if(duedate_l[2]+30 - date > 0){
                if(duedate_l[2]+30 - date < 7) {
                    isNear = true;
                    changeCol = true;
                } else {
                    isNear = false;
                }
            } else if(duedate_l[2]+30 === date){
                changeCol = true;
                isNear = "today";
            } else {
                isNear = "overdue";
            }
        }
    } else if(year > duedate_l[0]) {
        isNear = "overdue";
    } else { //めんどくさいんで後で書きます
        isNear = false;
    }

    return(
        <div>
            {isExpanded ? (
                <Expanded 
                    setIsExpanded={setIsExpanded} 
                    title={title} 
                    subject={subject} 
                    classtype={classtype} 
                    duedate={duedate} 
                    content={content}
                    author={author}
                    isNear={isNear}
                    changeCol={changeCol}
                    isHandy={isHandy}
                />) 
            : ''}
            <span className={styles.cardflexbox}>
                <span className={`${styles.cardcontainer} ${isHandy ? styles.handy : ''}`} onClick={()=>setIsExpanded(true)}>
                    <span className={styles.cardtitle}>{title} {/*タイトル*/}
                        {changeCol ? (
                            <div className={styles.danger} style={{fontSize:"70%",marginTop:"0.33em",marginLeft:"0.33em"}}>!</div> //提出期限が近づいているときに表示
                        ): ""}
                    </span>
                    <br/>{changeCol /*期日*/
                            ? (<span className={styles.cardduedate} style={{color:"rgb(228, 20, 20)"}} >{duedate_l[0]}年{duedate_l[1]}月{duedate_l[2]}日まで</span>) 
                            : (<span className={styles.cardduedate}>{duedate_l[0]}年{duedate_l[1]}月{duedate_l[2]}日まで</span>)
                        }<br/>
                    <span className={styles.cardtagcontainer}> {/*タグ*/}
                        <span className={styles.cardtag}>#{id_to_name[classtype]}</span>
                        <span className={styles.cardtag}>#{id_to_name[subject]}</span>
                    </span>
                </span>
            </span>
        </div>
    )
}

export const PostedCard = ({gotdata,isHandy,tag}) => {  //tag = [class,subject]
    const [overdueopen,setOverdueopen] = useState(false);

    //サイドバーで表示教科およびクラスを選択したときにデータをソートする用
    const type = SubjectData().type==="探究科" ? 't' : 'n';
    const grade = tag[0][0];
    const sortedData = [];
    if(tag[0] !== "all"){ 
        for(let item of gotdata) { //tagは現在選択中のタグ（ユーザーが）
            if(tag[0]===item.class){
                if(tag[1]==="all" || tag[1]===item.subject) {
                    sortedData.push(item);
                }
            } else if('g'+grade===item.class || type+grade===item.class || 'a'===item.class){
                if(tag[1]===item.subject){
                    sortedData.push(item);
                }
            }
        } 
    } else { //選択が「すべて」だったらデータは変わらない
        for(let i = 0; i < gotdata.length; i++){
            sortedData.push(gotdata[i]);
        }
    } 

    //データソート
    const over = [];
    sortedData.sort((a, b) => Number(a.duedate.split('-').join('')) - Number(b.duedate.split('-').join('')));

    const today = year * 10 ** 4 + (month + 1) * 10 ** 2 + date;

    let i = 0;
    while (i < sortedData.length) { // 最後の要素までしっかり処理
        let d = Number(sortedData[i].duedate.split('-').join(''));
        if (d < today) {
            over.push(sortedData[i]);
            sortedData.splice(i, 1);
            i--; // 要素削除後、インデックスを調整
        }
        i++;
    }

const new_overdue_list = Array.from(new Set(over.map((item) => JSON.stringify(item))))
    .map((item) => JSON.parse(item))
    .sort((a, b) => Number(a.duedate.split('-').join('')) - Number(b.duedate.split('-').join('')));


    new_overdue_list.sort((a,b) => Number(a.duedate.split('-').join('')) - Number(b.duedate.split('-').join(''))); //日付順にソート
    return (
        <div>
            {Object.entries(sortedData).map(([num,item],index) => (
                <div key={index}>
                    <Card title={item.title} subject={item.subject} classtype={item.class} duedate={item.duedate} content={item.content} author={item.author} isHandy={isHandy}/>
                </div>

            ))}
            {new_overdue_list.length > 0 ? (
                <div>
                    <div className={`${styles.overduetxtcontainer} ${isHandy ? styles.handy :''}`} onClick={()=> setOverdueopen(!overdueopen)}>
                        <div className={styles.overduetxt}>
                            過去の課題・連絡<span className={`${styles.caret} ${overdueopen ? styles.open : ''}`}/>
                        </div>
                    </div>
                    {overdueopen ? (
                        new_overdue_list.map((item,index)=> (
                            <div key={index}>
                                <Card title={item.title} subject={item.subject} classtype={item.class} duedate={item.duedate} content={item.content} author={item.author} isHandy={isHandy}/>
                            </div>
                        ))
                    ):''}
                </div>
            ) : ''}
        </div>
    )
}