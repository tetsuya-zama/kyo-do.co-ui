/*
 *　更新日付をセットするアクション名
 */
export const SET_UPDATE_DATE = 'SET_UPDATE_DATE'

/*
 *　更新日付をセットするアクションのcreator
 *  @param
 */
export function setUpdateDate(currentDate){
  return {
    type:SET_UPDATE_DATE,
    payload:{
      currentDate:currentDate
    }
  };
}