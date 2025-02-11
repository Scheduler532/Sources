import styles from './Usage.module.css'
import { HeaderTop } from '../Header/Header'

export const Usage = ()=>{
    return(
        <div>
            <HeaderTop />
            <div className={styles.body}>
                <h2 className={styles.title}>使い方</h2>
                <p className={styles.info}>
                    1. @yamagatahigashi.jpの<wbr />
                    Googleアカウントでログインします<br />
                    2. Settings項目を開き、<wbr />
                    自分の学年及びクラスを選択します<br />
                    3. 2, 3年生は、選択科目を選択します<br />
                    
                    現在Assignments, Classes項目は<wbr />
                    未完成ですので使用できません。<wbr />
                    また、Chats項目では、Google Chat<wbr />
                    に遷移します。<br />
                    "アプリをインストール" でさらなるユーザーエクスペリエンスの向上<br />
                </p>
            </div>
        </div>
 )
}