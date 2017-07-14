/**
* 行先履歴取得要求アクション名
*/
export const GET_DEST_HISTORY = "GET_DEST_HISTORY";

/**
* 行先履歴取得のcreator
* @return {Object} 行先履歴取得アクション
*/
export function getDestHistory(userid){
  return {
    type:GET_DEST_HISTORY,
    payload:{
      userid:userid
    }
  };
}

/**
* 行先履歴取得成功アクション名
*/
export const GET_DEST_HISTORY_SUCCESS = "GET_DEST_HISTORY_SUCCESS";

/**
* 行先履歴取得成功のcreator
* @return {Object} 行先履歴取得成功アクション
*/
export function getDestHistorySuccess(history){
  return {
    type:GET_DEST_HISTORY_SUCCESS,
    payload:{
      history:history
    }
  };
}

/**
* 行先履歴取得失敗アクション名
*/
export const GET_DEST_HISTORY_FAILED = "GET_DEST_HISTORY_FAILED";

/**
* 行先履歴取得失敗のcreator
* @return {Object} 行先履歴取得失敗アクション
*/
export function getDestHistoryFailed(){
  return {
    type:GET_DEST_HISTORY_FAILED
  };
}

/**
* 行先履歴ダイアログCloseアクション名
*/
export const CLOSE_DEST_HISTORY_BOARD = "CLOSE_DEST_HISTORY_BOARD";

/**
* 行先履歴ダイアログCloseのcreator
* @return {Object} 行先履歴ダイアログCloseアクション
*/
export function closeDestHistoryBoard(){
  return {
    type:CLOSE_DEST_HISTORY_BOARD
  };
}
