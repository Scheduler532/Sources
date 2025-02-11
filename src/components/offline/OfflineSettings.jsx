import styles from "../Settings/Settings.module.css"
import Select from "react-select"
import { useEffect,useState } from "react"
import { GuestSubjCol } from "../guest/guest_settings/guest_subj_col"
import 'firebase/firestore';
import { useNavigate } from "react-router-dom"
import { OfflineHeader } from "./OfflineHeader";


export const OfflineSettings = () =>{
    const navigate = useNavigate()
    window.addEventListener('online',()=>{
        navigate('/',{state:'/Settings'})
    })
    const [classes,setclasses] = useState('unselected')
    const [art,setart] = useState('unselected')
    const [social,setsocial] = useState('unselected')
    const [science,setscience] = useState('unselected')
    const [politic,setpolitic] = useState('unselected')
    const [Info,setInfo] = useState(null)

    //localstrageからjson形式で受取
    useEffect(()=>{
        const  getInfo=  () =>{
            if(JSON.parse(localStorage.getItem('Info'))){
                const userInfo = JSON.parse(localStorage.getItem('Info'))
                setInfo(userInfo)
            }else{
                navigate('/Guest_Home',{state:'/Guest_settings'})
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
    const humanity3 = ["3-1","3-2","3年国探"]
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


    if (Info){

        const ClassChange = selectedOption => {

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
            setclasses(selectedOption.value)
        };
        
        const ArtChange = selectedOption => {
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.芸=selectedOption.value
            localStorage.setItem('Info',JSON.stringify(data))
            setart(selectedOption.value)
        };

        const SocialChange = selectedOption => {
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.日地=selectedOption.value
            localStorage.setItem('Info',JSON.stringify(data))
            setsocial(selectedOption.value)
        };
        const ScienceChange = selectedOption => {
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.物生=selectedOption.value
            localStorage.setItem('Info',JSON.stringify(data))
            setscience(selectedOption.value)
        };
        const PoliticChange = selectedOption => {
            const data = JSON.parse(localStorage.getItem('Info'))
            data.subjects.世政経=selectedOption.value
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
                            <p className={styles.content}>芸術: <div className={styles.selected}>{art}</div></p><br/>
                            <Select options={arts} components={{IndicatorSeparator: () => null,}} onChange={ArtChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>日本史/地理: <div className={styles.selected}>{social}</div></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange}  styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (science2.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>芸術: <div className={styles.selected}>{art}</div></p><br />
                            <Select options={arts} components={{IndicatorSeparator: () => null,}} onChange={ArtChange}  styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>日本史/地理: <div className={styles.selected}>{social}</div></p><br />
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>物理/生物: <div className={styles.selected}>{science}</div></p><br/>
                            <Select options={sciences} components={{IndicatorSeparator: () => null,}} onChange={ScienceChange} styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (humanity3.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>日本史/地理: <div className={styles.selected}>{social}</div></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>世政経: <div className={styles.selected}>{politic}</div></p><br/>
                            <Select options={politics} components={{IndicatorSeparator: () => null,}} onChange={PoliticChange} styles={selectStyle} className={styles.selection}/>
                        </div>
                    </div>
                )
            }else if (science3.includes(classes)){
                return(
                    <div>
                        <div>
                            <p className={styles.content}>日本史/地理: <div className={styles.selected}>{social}</div></p><br/>
                            <Select options={socials} components={{IndicatorSeparator: () => null,}} onChange={SocialChange} styles={selectStyle} className={styles.selection}/><br/>
                            <p className={styles.content}>物理/生物: <div className={styles.selected}>{science}</div></p><br/>
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

        const OfflineInfo = JSON.parse(localStorage.getItem('Offline'))
        const username = OfflineInfo.Username
        
        return(

            <div>
                <OfflineHeader />
                <div className={styles.body}>
                    <div className={styles.info}>
                        <p className={styles.greeting}>Hello, {username}</p> <br />                        
                        <h1 className={styles.margin}>Class</h1><br />
                        <h2 className={styles.content}>{classes}</h2>
                        <Select options={classlist} onChange={ClassChange} styles={selectStyle} className={styles.selection}/><br />
                        <h1 className={styles.margin}>Courses</h1>
                        <ElectiveSubjects /> <br />
                        <h1 className={styles.margin}>SubjectColor</h1> <br />
                        <GuestSubjCol Info = {Info} class={classes}/>
                    </div>
                </div>
            </div>
        )
    }
}
