import { auth } from "../Auth/Auth";
import swal from 'sweetalert2';
import styles from './warning.module.css';
import { Version_data } from "../data/Version_data";

// ↓Home実行したときに出す警告　async/await 使わないとバグるから注意
export const Warning = async()=>{
    const Info = JSON.parse(localStorage.getItem('Info'))
    if(!Info){
        return null
    }
    if(!Info.class && auth.currentUser){
        await swal.fire({
            title:'注意',
            html:'クラスが設定されていません</br>スマホの場合は左上の三本線,Chromebookの場合はヘッダー部分からsettingを開いて設定してください',
            icon:'warning'
          })
    }

    //Update Info and Ads
    const version = Version_data(); //現在のバージョンを管理
    var adcnt = Number(localStorage.getItem("adcnt"));
    
    fetch("https://wataru532.github.io/Scheduler_data/update_and_ad.json")
    .then(function(response){
        if(!response.ok) {
            console.error("Something went wrong...")
        }
        return response.json()
    })
    .then(function(data){
        const jsonData = data;
        
        if(jsonData["update"]["version"] !== version) { //アップデート確認表示
            swal.fire({
                title: "お知らせ",
                html:`${jsonData["update"]["content"]}`,
                icon:"info",
            })
        }

        if(jsonData["ad"]["display"] === true) {
            const f = jsonData.ad.frequency;
            if(adcnt/f > 100) localStorage.setItem('adcnt','0');
            if(adcnt%f === 0){
                swal.fire({
                    title: `<div class=${styles.title}>${jsonData["ad"]["title"]}</div>`,
                    icon: "info",
                    customClass: "warn_body",
                    html: 
                        `<p class=${styles.content}>${jsonData["ad"]["content"]}</p>
                        <a class=${styles.url}
                            href=${jsonData["ad"]["url"]} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onclick=${swal.close()}>

                            ${jsonData["ad"]["url_message"]}
                        </a>`,

                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
                    confirmButtonColor: "#3085d6"
                })
            }
            adcnt++;
            localStorage.setItem("adcnt",adcnt)
        }

    })
    //checkedシリーズは毎回数字一つ大きくする　それ以外は変更いらない(次は7)


}