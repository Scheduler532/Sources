import { Header } from "../Header/Header"
import styles from "./Settings.module.css"
import Select from "react-select"
import { auth } from "../Auth/Auth"
import { useEffect,useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import { db } from "../Auth/Auth"
import { updateDoc,doc } from "firebase/firestore"
import { SubjCol } from "./subj_col"
import swal from 'sweetalert2';
import 'firebase/firestore';
import { isSmartPhone } from "../Header/Header";
import SetNotification from "./SetNotification"


export const Settings = () =>{
    const isOnline = navigator.onLine

    if(!isOnline && auth.currentUser){
        swal.fire({
            title:'注意',
            html:'オフラインで実行中です。設定の変更はできません。',
            icon:'warning'
        })
    }

    const navigate = useNavigate()


    //offline=>online の時の処理
    window.addEventListener('online',()=>{
        navigate('/',{state:'/Settings'})
    })

    //リロード対策
    const pathname = useLocation().pathname
    useEffect(()=>{
    if (!(auth.currentUser) && isOnline){
        navigate("/",{state:pathname})
    }})



        
    
    const [classes,setclasses] = useState('unselected')
    const [art,setart] = useState('unselected')
    const [social,setsocial] = useState('unselected')
    const [science,setscience] = useState('unselected')
    const [politic,setpolitic] = useState('unselected')
    const [Info,setInfo] = useState(null)


   //文字色最適化（ベータ）
   const I = JSON.parse(localStorage.getItem('Info'));
    const txtcoladj = JSON.parse(localStorage.getItem('Info')).txtcoladj;
    const [istxtcoladjOn, setIstxtcoladjOn] = useState(txtcoladj); 
    const TxtColAdj = (event) => {
        setIstxtcoladjOn(event.target.checked);
        
        I.txtcoladj = !istxtcoladjOn;
        localStorage.setItem('Info',JSON.stringify(I));
        updateDoc(doc(db,'users',userid),{'txtcoladj':!istxtcoladjOn});
    }


    //localstrageからjson形式で受取
    const addData = (info,newdata) => {
        // データがすでに存在するかをチェック
        const subj=newdata[0]
        const col=newdata[1]
        const exists = info.subj_col[subj]
        if (!exists) {
            info.subj_col[subj]=col          
        };
        return(info)
    }
    useEffect(()=>{
        const  getInfo = () =>{
            if(JSON.parse(localStorage.getItem('Info'))){
                var userInfo = JSON.parse(localStorage.getItem('Info'))
                userInfo=addData(userInfo,["td_che","#4e963d9c"])
                userInfo=addData(userInfo,["td_bio","#4e963d9c"])
                userInfo=addData(userInfo,["td_phy","#4e963d9c"])
                userInfo=addData(userInfo,["td_his","#ff9a479c"])
                userInfo=addData(userInfo,["td_geo","#ff9a479c"])
                userInfo=addData(userInfo,["td_pub","#ff9a479c"])
                setInfo(userInfo)
            }
        }
        getInfo()
    },[])

    //初期値設定
    useEffect(()=>{
        if(Info){
            setclasses(Info.class)
            setart(Info.subjects.芸)
            setpolitic(Info.subjects.世政経)
            setsocial(Info.subjects.日地)
            setscience(Info.subjects.物生)
        }
    },[Info])
    
    const humanity2 =["2-1","2-2","2年国探"]
    const science2 =["2-3","2-4","2年理探"]
    const humanity3 = ["3-1","3-2"]
    const humanity3_tan = ["3年国探"]
    const science3 =["3-3","3-4","3年理探"]
    const sciencetankyuu = ["2年理探","3年理探"]
    
    const classlist =[
        { value:"1-1",label:"1-1"},
        { value:"1-2",label:"1-2"},
        { value:"1-3",label:"1-3"},
        { value:"1-4",label:"1-4"},
        { value:"1-5",label:"1-5"},
        { value:"1-6",label:"1-6"},
        { value:"2-1",label:"2-1"},
        { value:"2-2",label:"2-2"},
        { value:"2-3",label:"2-3"},
        { value:"2-4",label:"2-4"},
        { value:"2年理探",label:"2年理探"},
        { value:"2年国探",label:"2年国探"},
        { value:"3-1",label:"3-1"},
        { value:"3-2",label:"3-2"},
        { value:"3-3",label:"3-3"},
        { value:"3-4",label:"3-4"},
        { value:"3年理探",label:"3年理探"},
        { value:"3年国探",label:"3年国探"},
    ]

    const arts = [
        { value:" 音楽",label:" 音楽"},
        { value:" 美術",label:" 美術"},
        { value:" 書道",label:" 書道"}
    ]
    
    const politics =[   
        {value:" 世史",label:" 世界史"},
        {value:" 政経",label:" 政治経済"},
    ]

    const socials = humanity3.includes(classes) ?
    [   { value:" 地理β",label:" 地理β"},
        { value:" 歴史β",label:" 歴史β"}
    ]:[ { value:" 地理",label:" 地理"},
        { value:" 日史",label:" 日本史"}
    ]

    const sciences = sciencetankyuu.includes(classes)?
    [   {value:" 理物",label:" 理数物理"},
        {value:" 理生",label:" 理数生物"}
    ]:[ {value:" 物理",label:" 物理"},
        {value:" 生物",label:" 生物"}
    ]

    if (localStorage.getItem('islogin') && Info){
        var userid;
        if (isOnline){
            userid = auth.currentUser.uid;
        }

        const OfflineInfo = JSON.parse(localStorage.getItem('Offline'))
        const username = isOnline ? auth.currentUser.displayName : OfflineInfo.Username
        const usermail = isOnline ? auth.currentUser.email : OfflineInfo.Usermail

        const ClassChange = selectedOption => {
            updateDoc(doc(db,'users',userid),{'subjects.芸':null})
            updateDoc(doc(db,'users',userid),{'subjects.日地':null})
            updateDoc(doc(db,'users',userid),{'subjects.物生':null})
            updateDoc(doc(db,'users',userid),{'subjects.世政経':null})
            setart('unselected')
            setsocial('unselected')
            setscience('unselected')
            setpolitic('unselected')

            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects={
                '芸':null,
                '日地':null,
                '物生':null,
                '世政経':null
            }
            data.class = selectedOption.value
            localStorage.setItem('Info',JSON.stringify(data))
            updateDoc(doc(db,'users',userid),{'class':selectedOption.value})
            setclasses(selectedOption.value)
        };
        
        const ArtChange = selectedOption => {
            updateDoc(doc(db,'users',userid),{'subjects.芸':selectedOption.value})
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.芸=selectedOption.value
            setInfo(data)
            localStorage.setItem('Info',JSON.stringify(data))
            setart(selectedOption.value)
        };

        const SocialChange = selectedOption => {
            updateDoc(doc(db,'users',userid),{'subjects.日地':selectedOption.value})
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.日地=selectedOption.value
            setInfo(data)
            localStorage.setItem('Info',JSON.stringify(data))
            setsocial(selectedOption.value)
        };
        const ScienceChange = selectedOption => {
            updateDoc(doc(db,'users',userid),{'subjects.物生':selectedOption.value})
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.物生=selectedOption.value
            localStorage.setItem('Info',JSON.stringify(data))
            setInfo(data)
            setscience(selectedOption.value)
        };
        const PoliticChange = selectedOption => {
            updateDoc(doc(db,'users',userid),{'subjects.世政経':selectedOption.value})
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.世政経=selectedOption.value
            setInfo(data)
            localStorage.setItem('Info',JSON.stringify(data))
            setpolitic(selectedOption.value)
        };

        const selectStyle = {
            control: () => ({
            width: 135,
            height:25,
            border: "0.5px solid gray",
            display: "flex",
            }),
        };


        const ElectiveSubjects = () =>{
            if (humanity2.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>芸術: <span className={styles.selected}>{art}</span></p><br/>
                            <Select options={arts} components={{IndicatorSeparator: () => null,}} onChange={ArtChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>日本史/地理: <span className={styles.selected}>{social}</span></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange}  styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (science2.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>芸術: <span className={styles.selected}>{art}</span></p><br />
                            <Select options={arts} components={{IndicatorSeparator: () => null,}} onChange={ArtChange}  styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>日本史/地理: <span className={styles.selected}>{social}</span></p><br />
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>物理/生物: <span className={styles.selected}>{science}</span></p><br/>
                            <Select options={sciences} components={{IndicatorSeparator: () => null,}} onChange={ScienceChange} styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (humanity3.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>日本史/地理: <span className={styles.selected}>{social}</span></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>世政経: <span className={styles.selected}>{politic}</span></p><br/>
                            <Select options={politics} components={{IndicatorSeparator: () => null,}} onChange={PoliticChange} styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (humanity3_tan.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>日本史/地理: <span className={styles.selected}>{social}</span></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                        </div>
                    </div>
                )
            }else if (science3.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>日本史/地理: <span className={styles.selected}>{social}</span></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>物理/生物: <span className={styles.selected}>{science}</span></p><br/>
                            <Select options={sciences} components={{IndicatorSeparator: () => null,}} onChange={ScienceChange} styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <p className={styles.content}>選択科目なし</p>
                    </div>
                )
            }  
        }
        return(

            <div>
                <Header />
                <div className={isOnline ? styles.body : styles.offlinebody}>
                    <h1 className={styles.greeting}>Hello, {username}</h1> <br />
                    <div className={styles.info}>
                        <div>
                            <h1 className={styles.margin}>Your Account</h1> <br />
                            <h2 className={styles.content}>{usermail}</h2><br />
                        </div>
                        <div>
                            <h1 className={styles.margin}>Class</h1><br />
                            <h2 className={styles.content}>{classes}</h2><br />
                            <Select options={classlist} onChange={ClassChange} styles={selectStyle} className={styles.selection}/><br />
                        </div>
                        <div>
                            <h1 className={styles.margin}>Courses</h1>
                            <ElectiveSubjects /> <br />
                        </div>
                        <div>
                            <h1 className={styles.margin}>Subject Color</h1> <br />
                            <SubjCol Info = {Info} setInfo={setInfo} userid={userid} class={classes}/>
                        </div>
                        <div>
                            <SetNotification />
                        </div>
                        <br />
                        <div className={styles.togglecontainer}>
                            <label for='iToggleB' className={styles.TxtwButton}>文字色自動調節（beta）</label>
                            <label className={styles.iosToggleButton}>
                                <input type="checkbox" id='iToggleB' checked={istxtcoladjOn} onChange={TxtColAdj}/>
                            </label> 
                            <span className={styles.content}>{ isSmartPhone() ? "" : "- 時間割表の各セルの背景色に合わせて文字色を調節します"}</span> {/*変更点*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}