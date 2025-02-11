import { db } from "../Auth/Auth"
import { setDoc,doc } from "firebase/firestore"

export const SaveAssignments = (setIsError,setBannerContent) => {
    const check = sessionStorage.getItem('isAssignmentsSaved') === "true" ? true : false;
    const saveFile = sessionStorage.getItem('Assignments_Save'); //sessionstorageに一時保存された変更点（json形式）一時保存
    if(saveFile) {
      if(!check) {
        sessionStorage.setItem('isAssignmentsSaved',true);
        setDoc(doc(db,'assignments','data'),JSON.parse(saveFile))
        try{
        setIsError(false)
        setBannerContent("新しい課題が投稿されました。しばらくしたら全体に反映されます。");
        }catch(error){
          console.log('Uniform update')
        }
        }
    }
}

