import React from 'react';
import { ChromePicker } from 'react-color';
import { useState } from 'react'
import styles from './subj_col.module.css'
import { db } from "../Auth/Auth"
import { updateDoc,doc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';

const SubjCol = (props) => {
  const ColorPicker = (props)=> {
    const navigate= useNavigate()

    const subject = props.subject
    var Info=props.Info
    const setInfo=props.setInfo
    const userid = props.userid
    const subj_name_list={
      '国語':'td_ja',
      '数学':'td_math',
      '歴史':'td_his',
      '地理':'td_geo',
      '公共':'td_pub',
      '政経':'td_pub',
      '化学':'td_che',
      '物理':'td_phy',
      '生物':'td_bio',
      '英語':'td_en',
      '保体':'td_pe',
      '家庭科':'td_homE',
      '情報':'td_info',
      '芸術' :'td_art',
      'null' : 'td_none'
    }

    const subj = subj_name_list[subject]
    const subj_col = Info.subj_col[subj]

    const [subjcolor,setColor] = useState(subj_col)
    const [IsOpen,setOpen] = useState(false)

    const handleChange = (color) => {
      //stateに選択した色を保存
      setColor(color.hex);
      const txt_col = color.hsl.l < 0.5 ? '#ffffff' : '#000000'; 
      
      //それをlocalstrageとfirestoreに保存
      if (subj==='td_ja'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_ja=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_ja':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_math'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_math=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_math':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_his'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_his=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_his':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_geo'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_geo=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_geo':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_pub'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_pub=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_pub':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_che'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_che=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_che':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_phy'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_phy=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_phy':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_bio'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_bio=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_bio':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_en'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_en=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_en':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_pe'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_pe=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_pe':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_homE'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_homE=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_homE':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_info'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_info=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_info':[color.hex,txt_col]})
        setInfo(data)
      }else if (subj==='td_art'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_art=[color.hex,txt_col];
        localStorage.setItem('Info',JSON.stringify(data))
        updateDoc(doc(db,'users',userid),{'subj_col.td_art':[color.hex,txt_col]})
        setInfo(data)
      }
    }

    const ChangeCol = () =>{
      if (IsOpen){
        return(
          <div className={styles.pikker}>
            <div className={styles.pikkerBack} onClick={()=>{setOpen(false)}}></div>
              <ChromePicker
                disableAlpha={true}
                color={ subjcolor.length === 2 ? subjcolor[0] : subjcolor }
                onChange={ handleChange }
              />
          </div>
        )
      }
    }

    //リセットボタンの場合
    if (props.reset===true){
      const reset_col = ()=>{
        updateDoc(doc(db,'users',userid),{'subj_col.td_ja':["#ff3e3e9c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_math':["#2c68ff9c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_his':["#ff9a479c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_geo':["#ff9a479c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_pub':["#ff9a479c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_che':['#4e963d9c',"#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_phy':['#4e963d9c',"#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_bio':['#4e963d9c',"#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_en':["#ffe8379c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_homE':["#9863be9c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_info':["#63b6b79c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_pe':["#ffd6aa9c","#000000"]})
        updateDoc(doc(db,'users',userid),{'subj_col.td_art':["#ffadf49c","#000000"]})
        navigate('/',{state:'/Settings'})
      }


      return(
        <div className={styles.reset_container}>
          <p className={styles.subjName}>リセット</p> <br />
          <button onClick={reset_col} className={styles.reset_btn}>
            <CachedIcon />
          </button>
        </div>
      )
    //それ以外
    }else{
      return (
        <div className={styles.container}>
          <p className={styles.subjName}>{props.subject}</p> <br />
          <button onClick={()=>{setOpen(true)}} style={ { background: subjcolor.length === 2 ? subjcolor[0] : subjcolor }} className={styles.btn}></button>
          <ChangeCol />
        </div>
      );
    }
  }

  const grade1 = ['1-1','1-2','1-3','1-4','1-5','1-6']
  const grade2_ri = ['2-3','2-4','2年理探']
  const grade2_bun = ['2-1','2-2','2年国探']
  const grade3_ri = ['3-3','3-4','3年理探']
  const grade3_bun = ['3-1','3-2']
  const grade3_bun_tan=['3年国探']

  const userClass = props.class
  const science = props.Info.subjects['物生']
  const isPhy = (science===' 理物'|| science===' 物理')
  const social = props.Info.subjects['日地']
  const isGeo = (social===' 地理'||social===' 地理β')
  const pub = props.Info.subjects['世政経']
  const isPub = (pub===' 政経')
  const isHis = (!isGeo ||!isPub )
  if (grade1.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='物理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='生物' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='家庭科' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='情報' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }else if (grade2_ri.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        {isGeo ? <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />}
        <ColorPicker subject='公共' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject= {isPhy?'物理':'生物'} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='芸術' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }else if (grade2_bun.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        {isGeo ? <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: ''}
        <ColorPicker subject='公共' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='生物' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='芸術' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }else if (grade3_ri.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        {isGeo ? <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />}
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject={isPhy?'物理':'生物'} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }else if (grade3_bun.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        {isHis ? <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: ''}
        {isGeo ? <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: ''}
        {isPub ? <ColorPicker subject='政経' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: ''}
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='生物' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='芸術' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }else if (grade3_bun_tan.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid} setInfo={props.setInfo}/>
        <ColorPicker subject='歴史' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        {isGeo ? <ColorPicker subject='地理' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />: ''}
        <ColorPicker subject='化学' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='生物' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker subject='芸術' Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} setInfo={props.setInfo} />
      </div>
    )
  }

}
export { SubjCol }