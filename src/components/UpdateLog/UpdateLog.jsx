import styles from './UpdateLog.module.css'
import { HeaderTop } from '../Header/Header'
import { Link } from 'react-router-dom'

export const UpdateLog =()=>{
    return(
        <div>
            <HeaderTop />
                <div className={styles.body}>
                    <h1 className={styles.title}>Scheduler Update Log</h1> {/*title*/}
                    <Link to='/Home' className={styles.back2home} rel="noopener noreferrer">←Home</Link>
                    {/*以下テンプレート*/}

                    <h3 className={styles.virsion}>v3.0.0- 2025/2/3</h3>
                    <p className={styles.info}>
                    <strong><a className={styles.version3link} href='https://wataru532.github.io/Scheduler/version3.html' target='_blank'>詳しくはここをクリック</a></strong><br/>
                        <strong>Assignments項目の正式実装</strong><br />
                        ・長らく使えなかった課題投稿機能を正式実装。<br/>
                        ・ユーザー間での課題の連絡を分類された上で表示することが可能に。<br/>
                        <strong>Classes項目の正式実装</strong><br/>
                        ・長らく使えなかったクラス機能を正式実装。<br/>
                        ・各自ブックマークのようにクラスルームへのリンクを作成・保存できるように。<br/>
                        ・教科を指定して保存されたリンクへは、時間割表をクリックすることで飛べるように。<br/>
                        <strong>基準服登校日の表示機能を追加</strong><br/>
                        ・一ユーザーの投稿によって基準服登校日が全ユーザーへ共有されるように。<br/>
                        ・時間割表に新しい枠を設け、そこに制服のマークが表示されるようになる。<br/>
                        <strong>GUIの変更</strong><br/>
                        ・アプリアイコンを刷新。<br/>
                        ・ヘッダーのアカウントアイコンにヘルプメニューやログアウトボタンを移動。<br/>
                        ・全デバイスでスワイプ操作に対応。<br/>
                        ・タブレットもモバイル版のデザインに変更。<br/>
                        <strong>その他デザインの変更</strong><br/>
                        ・ログイン画面にSchedulerのロゴを挿入。<br/>
                        ・ロード画面のデザインを変更。<br/>
                        ・ヘッダーの背景色を変更。<br/>
                        <strong>バグ修正</strong><br/>
                        ・ログインできない恐れのあるバグを修正。<br/>
                        ・内部構造の更新により一部ユーザーが利用できなくなっていた問題を修正。<br/>
                        ・Fetch APIの潜在的な問題を修正。<br/>
                        <strong>通知機能の追加</strong><br/>
                        ・毎日指定の時間に時間割りと課題の通知を受け取ることが可能<br />
                        ・課題追加時の通知にも対応<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.6- 2025/1/27</h3>
                    <p className={styles.info}>
                        オフライン実行時の表示に関する不具合を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.5- 2025/1/4</h3>
                    <p className={styles.info}>
                        広告の頻度を変更可能に<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.4- 2025/1/1</h3>
                    <p className={styles.info}>
                        月及び日付が正しく表示されない問題を修正<br />
                        それに伴いファイルが正しくフェッチできない問題を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.3- 2024/12/30</h3>
                    <p className={styles.info}>
                        Settings項目における設定の同期に関する問題を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.2- 2024/12/30</h3>
                    <p className={styles.info}>
                        '理科'という科目がある際の不具合に対応<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.1- 2024/12/27</h3>
                    <p className={styles.info}>
                        2週間目の表示に色がつかない問題を修正<br />
                        スマホ版の設定画面のデザインを一部変更<br />
                        アップデート情報配信及び宣伝ポップアップの追加<br />
                    </p>

                    <h3 className={styles.virsion}>v2.6.0- 2024/12/24</h3>
                    <p className={styles.info}>
                        週が年を跨いだときに月が正しく表示されない問題を修正<br />
                        クラス情報等のインフォメーション部分のデザインを変更<br />
                        Settingsのデザインを一部変更<br />
                        Update LogページにHome遷移ボタンを追加<br />
                        表の背景色に応じて文字色を調整する機能を追加（ベータ版）<br />
                    </p>

                    <h3 className={styles.virsion}>v2.5.4- 2024/12/21</h3>
                    <p className={styles.info}>
                        v2.5.3で治ってなかったため再度修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.5.3- 2024/12/9</h3>
                    <p className={styles.info}>
                        一部機種においてテーブル下側が見切れる不具合を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.5.2- 2024/12/9</h3>
                    <p className={styles.info}>
                        週の切り替えを矢印キーで行えるように<br />
                    </p>

                    <h3 className={styles.virsion}>v2.5.1- 2024/12/8</h3>
                    <p className={styles.info}>
                        オフラインで実行した際の挙動を変更<br />
                    </p>

                    <h3 className={styles.virsion}>v2.5.0- 2024/12/6</h3>
                    <p className={styles.info}>
                        理社の背景色を教科別に設定できる仕様に変更<br />
                        オフラインで実行した際の不具合を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.5- 2024/12/5</h3>
                    <p className={styles.info}>
                        ログイン済みにもかかわらずログイン画面を開く輩に対応<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.4- 2024/12/4</h3>
                    <p className={styles.info}>
                        3年生の一部教科に背景色が適応されない不具合を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.3- 2024/12/4</h3>
                    <p className={styles.info}>
                        table要素の一部デザインを修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.2- 2024/12/4</h3>
                    <p className={styles.info}>
                        データ表示に関する不具合修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.1- 2024/12/3</h3>
                    <p className={styles.info}>
                        切り替え関係の不具合修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.4.0- 2024/12/3</h3>
                    <p className={styles.info}>
                        表示する週の切り替えを滑らかに<br />
                    </p>

                    <h3 className={styles.virsion}>v2.3.0- 2024/11/24</h3>
                    <p className={styles.info}>
                        今週来週の切り替え方法を変更<br />
                        より直感的な操作が可能に<br />
                    </p>

                    <h3 className={styles.virsion}>v2.2.0- 2024/11/10</h3>
                    <p className={styles.info}>
                        発表会用に一時的にゲストモードを復活<br />
                    </p>

                    <h3 className={styles.virsion}>v2.1.1 - 2024/11/10</h3>
                    <p className={styles.info}>
                        一部教科に背景色が適応されない不具合を修正<br />
                    </p>

                    <h3 className={styles.virsion}>v2.1.0 - 2024/11/2</h3>
                    <p className={styles.info}>
                        日付表示に関するプログラムを変更<br />
                    </p>

                    <h3 className={styles.virsion}>v2.0.0 - 2024/10/28</h3>
                    <p className={styles.info}>
                        二週間分のデータ表示に対応<br />
                        データが存在しない場合のテンプレートを作成<br />
                        日付表示に関する不具合を修正<br />
                        一部レイアウトの変更<br/>
                        データ受け取り手段の確立<br />
                    </p>

                    <h3 className={styles.virsion}>v1.3.0 - 2024/9/9</h3>
                    <p className={styles.info}>
                        オフラインで実行が可能に
                    </p>

                    <h3 className={styles.virsion}>v1.2.0 - 2024/7/14</h3>
                    <p className={styles.info}>
                        <s>時間割データを一度取得したらそれ以降取得しなくてよい仕様に変更<br />
                        動作速度の向上とデータ通信料の節約に期待<br /></s>
                        諸都合で廃止
                    </p>

                    <h3 className={styles.virsion}>v1.1.0 - 2024/7/8</h3>
                    <p className={styles.info}>
                        <s>一時的にGoogleAccountを要せずにログイン利用できる仕様を追加<br />
                        中間発表会を目途に削除予定</s>  ※削除済み<br />
                    </p>

                    <h3 className={styles.virsion}>v1.0.1 - 2024/7/6</h3>
                    <p className={styles.info}>
                        日本史が選択できない不具合を修正<br />
                        一部UIを変更<br />
                    </p>

                    <h3 className={styles.virsion}>v1.0.0 - 2024/7/3</h3>
                    <p className={styles.info}>
                        正式リリース  <br />
                        アカウント単位でデータを保存 <br />
                        →Chromebook とスマホで設定の共有が可能に<br />
                        教科の背景色の変更機能の追加 <br />
                        
                    </p>

                    <h3 className={styles.virsion}>v0.0.3 - 2024/5/29</h3>
                    <p className={styles.info}>
                        一部画面でページを更新したら何も表示されなくなる不具合を修正
                    </p>
                    <h3 className={styles.virsion}>v0.0.2 - 2024/5/27</h3>
                    <p className={styles.info}>
                        Updated Design. Added user icon.<br />
                        その他変化なし。
                    </p>

                    <h3 className={styles.virsion}>v0.0.1 - 2024/5/27</h3>
                    <p className={styles.info}>
                        First release. <br />
                        ＜現状＞<br />
                        ・1週間分の時間割表示<br />
                        ＜課題＞<br />
                        ・データ受取の自動化<br />
                        ・同ユーザ異デバイス間での設定の同期<br />
                        ・2週間分の時間割の表示<br />
                        ＜展望＞<br />
                        ・時間割テーブルの配置自由化<br />
                        ・Homeにて付箋の貼り付け機能<br />
                        ・教科カラー設定の自由化<br />
                    </p>

                    <a href="https://forms.gle/9ExuRPUDyRMcMxxp8" className={styles.f_form} target="_blank" rel="noopener noreferrer">Add Feedback</a>
            </div>
        </div>
    )
}