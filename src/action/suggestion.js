
/**
* 自分の行き先変更アクション名
*/
export const SUGGESTION_CHANGE = "SUGGESTION_CHANGE";

/**
* 自分の行き先変更アクションのcreator
* @param {{inBusiness:boolean,comment:string}} suggests 行き先
* @return {Object} 自分の行き先変更アクション
*/
export function suggestionChange(suggests){
  return {
    type:SUGGESTION_CHANGE,
    payload:suggests
  };
}

/**
* 自分の行き先クリアアクション名
*/
export const SUGGESTION_CLEAR = "SUGGESTION_CLEAR";

/**
* 自分の行き先クリアアクションのcreator
* @return {Object} 自分の行き先クリアアクション
*/
export function suggestionClear(){
  return {
    type:SUGGESTION_CLEAR
  };
}
