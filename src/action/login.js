/**
* ログイン要求アクション名
*/
export const LOGIN_REQUESTED = "LOGIN_REQUESTED";

/**
* ログイン要求アクションのcreator
* @param {string} id ユーザーID
* @param {string} pass パスワード
* @return {Object} ログイン要求アクション
*/
export function loginRequested(id,pass){
  return {
    type:LOGIN_REQUESTED,
    payload:{
      id:id,
      pass:pass
    }
  };
}

/**
* ログイン成功アクション名
*/
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

/**
* ログイン成功アクションのcreator
* @param {{userid:string,token:string}} userinfo 成功したユーザー情報
* @return {Object} ログイン成功アクション
*/
export function loginSuccess(userinfo){
  return {
    type:LOGIN_SUCCESS,
    payload:userinfo
  };
}

/**
* ログイン失敗アクション名
*/
export const LOGIN_FAILURE = "LOGIN_FAILURE";

/**
* ログイン失敗アクションのcreator
* @return {Object} ログイン失敗アクション
*/
export function loginFailure(){
  return {
    type: LOGIN_FAILURE
  };
}

/**
* ログアウト要求アクション名
*/
export const LOGOUT_REQUESTED = "LOGOUT_REQUESTED";

/**
* ログアウト要求アクションのcreator
* @return {Object} ログアウト要求アクション
*/
export function logoutRequested(){
  return {
    type : LOGOUT_REQUESTED
  };
}
