/* アクション名 */
export const SET_UPDATE_DATE = 'SET_UPDATE_DATE';

/* アクションのcreator */
export function setUpdateDate(currentDate){
    return {
        type:SET_UPDATE_DATE,
        payload:{
            currentDate: currentDate
        }
    };
}