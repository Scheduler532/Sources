import styles from './Subjects.module.css';
import React, { useState } from 'react';
import { SubjectData } from '../../data/SubjectData';
import { isSmartPhone } from '../../Header/Header';

export const Subjects = (props) => {
    var isEditing = props.isEditing;
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState({
        newC: '',
        newS: '',
        newL: ''
    })
    var sub = props.sub;
    const [cnt,setcnt] = useState(0);
    const [isFilled, setIsFilled] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }


    //以下教科データなど取得
    const subj_choose = SubjectData().subj_choose.map((x) => x.trim()); //空白を削除

    const subjid = {"数学":"math","国語":"ja","英語":"en","化学":"che","物理":"phy"," 理物":"phy","理物":"phy","生物":"bio"," 地理":"geo",
        "地理":"geo","歴史":"his","日本史":"his","世界史":"his","公共":"pub","情報":"info","家庭科":"homE","保健体育":"pe"," 音楽":"art","音楽":"art",
        " 書道":"art","書道":"art"," 美術":"art","美術":"art","その他":"none"}

    var usedsubj = JSON.parse(localStorage.getItem('Info')).usedsubj ? JSON.parse(localStorage.getItem('Info')).usedsubj : []; //一度使用した教科については再度使用できないように
    usedsubj = [...new Set(usedsubj)];
    var displaysubj = subj_choose;
    
    const displaysubj_id = displaysubj.map((x) => subjid[x]); //一回選択科目の方をid変換しないと、id_to_nameじゃ対応できない
    for(let i of usedsubj){
        let index = displaysubj_id.indexOf(i);
        displaysubj.splice(index,1);
        displaysubj_id.splice(index,1);
    }
    //ここまで

    const jsonUpdate = (data) => {
        const Info = JSON.parse(localStorage.getItem('Info'));
        Info.classes = data;
        localStorage.setItem('Info', JSON.stringify(Info));
        sub = data;
        setcnt(cnt+1);
        addclassid(data);
    }   

    const deleteCategory = (id) => { //categoryId
        const c_name = document.getElementById(id).value;
        const c_items = sub[c_name];
        
        for(let key in c_items) { //重複使用阻止更新用
            let index = usedsubj.indexOf(subjid[key]);
            if(usedsubj.includes(subjid[key])) {
                usedsubj.splice(index,1);
            }
        }
        const Info = JSON.parse(localStorage.getItem('Info'));
        Info.usedsubj = usedsubj;
        localStorage.setItem('Info',JSON.stringify(Info));
        delete sub[c_name];
        jsonUpdate(sub);
    }

    const deleteSubject = (cid,sid) => { //categoryId, subjectId
        const c_name = document.getElementById(cid).value;
        const s_name = document.getElementById(sid).value;
        delete sub[c_name][s_name];

        let index = usedsubj.indexOf(subjid[s_name]);
        if(usedsubj.includes(subjid[s_name])) { //重複使用阻止更新用
            usedsubj.splice(index,1);
            const Info = JSON.parse(localStorage.getItem('Info'));
            Info.usedsubj = usedsubj;
            localStorage.setItem('Info',JSON.stringify(Info));
        }
        jsonUpdate(sub);
    }

    const addclassid = (data) => {
        const classid = {};
        for(let cat in data) {
            for(let item in data[cat]) {
                if(subjid[item]) {
                    classid[subjid[item]] = data[cat][item];
                }
            }
        }
        const Info = JSON.parse(localStorage.getItem('Info'));
        Info.classid = classid;
        localStorage.setItem('Info',JSON.stringify(Info));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));

        let c = document.getElementById('newC').value;
        let s = document.getElementById('newS').value;
        let l = document.getElementById('newL').value;

        if(c !== '' && s !== '' && l !== '') setIsFilled(true); //完全にフィルされたかの確認
        else setIsFilled(false)
    };

    const add = () => {
        if(isFilled){
            var newCategory = inputs.newC;
            var newSubject = inputs.newS;
            var newLink = inputs.newL;
            var sub_edit = sub;

            setInputs({
                newC: '',
                newS: '',
                newL: ''
            })

            if(newCategory in sub_edit){
                sub_edit[newCategory] = { ...sub_edit[newCategory], [newSubject]: newLink };
            } else{
                sub_edit = { ...sub_edit, 
                    [newCategory]: {
                        [newSubject]: newLink
                    }
                };
            }

            if(subjid[newSubject]) {
                usedsubj.push(subjid[newSubject]);
                const Info = JSON.parse(localStorage.getItem('Info'));
                Info.usedsubj = usedsubj;
                localStorage.setItem('Info',JSON.stringify(Info));
            }
            jsonUpdate(sub_edit);

        } else {
            alert("不足している項目があります")
            return (
                <div><p>不足している項目があります</p></div>
            )
        }
    }

    const edited = (e,type,categoryId) => { //既存の項目に変更が加えられたとき
        const categoryName = document.getElementById(categoryId).value;
        
        if(type==='category') { //カテゴリ名を変更
            const index = Number(categoryId.split('c')[1]);
            const oldName = Object.keys(sub)[index];
            const Change = {[oldName]: e.value};
            
            const updatedObj = {};
            for (const key in sub) {
                const newKey = Change[key] || key; 
                updatedObj[newKey] = sub[key];
            }
            jsonUpdate(updatedObj);

        } else {
            var title;
            if(type==='title'){ //アイテムのタイトルを変更
                title = document.getElementById(e.id).value;
                const indexT = Number(e.id.split('s')[1]);
                const oldNameT = Object.keys(sub[categoryName])[indexT];
                
                const updatedObjT = {
                    ...sub,
                    [categoryName]: {
                        ...sub[categoryName],
                        [title]: sub[categoryName][oldNameT] // 変更後のプロパティを追加
                    }
                };

                if(title !== oldNameT) {
                    delete updatedObjT[categoryName][oldNameT]; // 元のプロパティを削除
                }
                jsonUpdate(updatedObjT);
    
            } else if(type==='link'){ //アイテムのリンクを変更
                let id = e.id.split('_')[0]; //リンクの場合は後ろに _l がついているため
                title = document.getElementById(id).value;
                sub[categoryName][title] = e.value;
                jsonUpdate(sub);
            }
        }
    }

    const CategoryNames = [];
    for(let key in sub) {
        CategoryNames.push(key);
    }

    if (isEditing){ //編集画面
        return (
            <div> {/*新規作成*/}
                <p className={`${styles.title} ${styles.canexpand}`} onClick={toggleOpen}>新規作成<span className={styles.addnew_b}>{isOpen ? ' ー ' : ' ＋ '}</span></p>
                <div className={`${styles.close} ${isOpen ? styles.open : ''}`}>
                    <form>
                        <input 
                            type='text' 
                            name='newC' 
                            id='newC'
                            onChange={handleChange} 
                            value={inputs.newC} 
                            placeholder='カテゴリを選択、または新規作成' 
                            autoComplete='off'
                            className={`${styles.databox} ${styles.addnew_category}`}
                            list="category"
                        />
                        <datalist id="category">
                            {CategoryNames.map((itemC,indexC) => (
                                <option key={indexC} value={itemC}/>
                            ))}
                        </datalist>
                    </form>
                    <form>
                        <input 
                            type='text' 
                            name='newS' 
                            id='newS'
                            onChange={handleChange} 
                            value={inputs.newS} 
                            placeholder='教科を選択、またはタイトルを入力' 
                            autoComplete='off'
                            className={`${styles.databox} ${styles.addnew_item}`}
                            list="items"
                        />
                        <datalist id="items">
                            {displaysubj.map((item, index) => (
                                <option key={index} value={item}/>
                            ))}       
                        </datalist>                 
                    </form>
                    <input 
                        type='text' 
                        name='newL' 
                        id='newL'
                        onChange={handleChange} 
                        value={inputs.newL} 
                        placeholder='リンクをペースト' 
                        autoComplete='off'
                        className={`${styles.databox} ${styles.addnew_item}`}
                    />
                    <span className={`${styles.addbutton} ${isFilled ? '' : styles.notfilled}`} onClick={add}>作成＞</span>
                </div>

                <p className={styles.title}>既存のものを編集</p> {/*既存のものを変更する画面*/}
                {Object.entries(sub).map(([category, items], categoryIndex) => (
                    <div key={categoryIndex}>
                        <span className={styles.deleteB} onClick={()=>deleteCategory('c'+categoryIndex)}>カテゴリを削除</span>
                        <input 
                            type='text' 
                            id={'c'+categoryIndex} 
                            placeholder='カテゴリ名を編集' 
                            defaultValue={category} 
                            autoComplete='off'
                            className={styles.databox}
                            onChange={(e)=>edited(e.target,'category','c'+categoryIndex)} //value, type, categoryId
                        />
                        <div className={styles.category_bg}> {/*subjectIdをcategoryIdも含めて定義することで重複を防ぐ*/}
                            {Object.entries(items).map(([subject, link], subjectIndex) => (
                                <div key={subjectIndex}>
                                    <span className={styles.deleteB} onClick={()=>deleteSubject('c'+categoryIndex,categoryIndex+'s'+subjectIndex)}>アイテムを削除</span> 
                                    <input
                                        type='text' 
                                        id={categoryIndex+'s'+subjectIndex} 
                                        placeholder='タイトルを編集' 
                                        defaultValue={subject} 
                                        autoComplete='off'
                                        className={styles.databox}
                                        onChange={(e)=>edited(e.target,'title','c'+categoryIndex)} //value, type, categoryId
                                    /><br/>
                                    {!isSmartPhone() ? (
                                        <span className={styles.invB}>アイテムを削除</span> /*デザイン用で、機能なし*/
                                    ) : ''}
                                    <input 
                                        type='text' 
                                        id={categoryIndex+'s'+subjectIndex+'_l'} 
                                        placeholder='リンクをペースト' 
                                        defaultValue={link} 
                                        autoComplete='off'
                                        className={styles.databox}
                                        onChange={(e)=>edited(e.target,'link','c'+categoryIndex)} //value, type, categoryId
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )

    } else {
        return (
            <div>
                {Object.entries(sub).map(([category, items], categoryIndex) => (
                    <div key={categoryIndex}>
                    <p className={styles.p_style}>{category}</p>
                    <div>
                        {Object.entries(items).map(([subject, link], subjectIndex) => (
                        <span key={subjectIndex}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.a_style}>{subject}</a>
                        </span>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        )
    }
}