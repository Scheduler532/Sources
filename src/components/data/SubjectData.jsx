export const SubjectData = () => {
    const Info = JSON.parse(localStorage.getItem('Info'));

    const yourclass = Info.class;
    const yoursubjects = Info.subjects;
    const colourData = Info.subj_col;
    var type;
    if(yourclass === null) {
        return {yourclass:null,colourData:null,type:null,subj_choose:null};
    }
    const subj_choose = ["国語","数学","英語","化学"];
    
    if(yourclass.includes('探')) {
        type = "探究科";
    }else if(yourclass === '1-5' || yourclass === '1-6') {
        type = "探究科";
    } else {
        type = "普通科";
    }

    if(yourclass[0] === '1') { //1年生
        subj_choose.push("物理","生物","地理","歴史","情報","家庭科","保健体育","その他");

    } else if(yourclass[0] === '2') { //2年生
        if(yoursubjects["物生"]!==null) { //haftacheck = ["世政経","日地","物生","芸"];
            subj_choose.push(yoursubjects["物生"]);
        } 
        if(yourclass==="2-1" || yourclass==="2-2" || yourclass==="2年国探") {
            subj_choose.push('生物');
            subj_choose.push('世史');
        } 
        subj_choose.push(yoursubjects['日地']);
        subj_choose.push("公共","保健体育");
        subj_choose.push(yoursubjects["芸"]);
        subj_choose.push("その他");

    } else if(yourclass[0] === '3') { //3年生
        if(yoursubjects["物生"]!==null) { //haftacheck = ["世政経","日地","物生","芸"];
            subj_choose.push(yoursubjects["物生"]);
        }
        if(yourclass==="3-1" || yourclass==="3-2" || yourclass==="3年国探") {
            subj_choose.push('生物');
            subj_choose.push('世史');
        } 
        subj_choose.push(yoursubjects['日地']);
        if(yoursubjects["世政経"]!==null) { 
            subj_choose.push(yoursubjects["世政経"]);
        }
        subj_choose.push("保健体育","その他");
    }
    return {yourclass,colourData,type,subj_choose};
}