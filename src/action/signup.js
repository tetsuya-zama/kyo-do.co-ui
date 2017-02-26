/**
*サインアップ要求アクション名
*/
export const SIGNUP_REQUIRED = "SIGNUP_REQUIRED";

/**
* サインアップ要求アクションのcreator
* @param {{id:string,password:string,name:string}} userinfo 登録を要求するユーザー情報
* @return {Object} SIGNUP_REQUIREDアクション
*/
export function signupRequired(userinfo){
  return {
    type:SIGNUP_REQUIRED,
    payload:userinfo
  }
}
/**
* サインアップ成功アクション名
*/
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
/**
* サインアップ成功アクションのcreator
* @return {Object} SIGNUP_SUCCESSアクション
*/
export function signupSucceess(){
  return {
    type:SIGNUP_SUCCESS
  };
}

/**
* サインアップ失敗アクション名
*/
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

/**
* サインアップ失敗アクションのcreator
* @param {array} reasons 失敗理由の配列
* @return {Object} SIGNUP_FAILUREアクション
*/
export function signupFailure(reasons){
  return {
    type:SIGNUP_FAILURE,
    payload:reasons
  }
}
