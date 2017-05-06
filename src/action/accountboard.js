/**
* アカウント情報変更モーダルOpen要求アクション名
*/
export const ACCOUNT_INFO_MODAL_OPEN = "ACCOUNT_INFO_MODAL_OPEN";

/**
* アカウント情報変更モーダルOpenのcreator
* @return {Object} アカウント情報変更モーダルOpenアクション
*/
export function openAccountInfoModal(){
  return {
    type:ACCOUNT_INFO_MODAL_OPEN
  };
}

/**
* アカウント情報変更モーダルClose要求アクション名
*/
export const ACCOUNT_INFO_MODAL_CLOSE = "ACCOUNT_INFO_MODAL_CLOSE";

/**
* アカウント情報変更モーダルCloseのcreator
* @return {Object} アカウント情報変更モーダルCloseアクション
*/
export function closeAccountInfoModal(){
  return {
    type:ACCOUNT_INFO_MODAL_CLOSE
  };
}

/**
* アカウント情報変更要求アクション名
*/
export const CHANGE_ACCOUNT_INFO = "CHANGE_ACCOUNT_INFO";

/**
* アカウント情報変更のcreator
* @return {Object} アカウント情報変更モーダルCloseアクション
*/
export function changeAccountInfo(name, pass){
  return {
    type:CHANGE_ACCOUNT_INFO,
    payload:{
      nextname:name,
      nextpass:pass
    }
  };
}

/**
* アカウント情報テキストフィールド(表示名)変更要求アクション名
*/
export const CHANGE_ACCOUNT_INFO_FIELD = "CHANGE_ACCOUNT_INFO_FIELD";

/**
* アカウント情報テキストフィールドの変更のcreator
* @return {Object} アカウント情報変更フィールド変更アクション
*/
export function changeAccountInfoField(name, pass){
  return {
    type:CHANGE_ACCOUNT_INFO_FIELD,
    payload:{
      nextname:name,
      nextpass:pass
    }
  };
}
