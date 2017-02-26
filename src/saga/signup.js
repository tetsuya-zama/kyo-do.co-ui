import {put,call,takeEvery} from 'redux-saga/effects'
import {SIGNUP_REQUIRED,signupSucceess,signupFailure} from '../action/signup'
import {SIGNUP_FAILURE_REASONS} from '../const/signup'
import {loginRequested} from '../action/login'

//MOCK用
//TODO 実装終わったら消す
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'
import {MOCK_MEMBER_REPO_KEY} from '../const/signup'

/**
* サインアップ要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* signupSaga(){
    yield takeEvery(SIGNUP_REQUIRED,signupTask);
}

/**
* サインアップ要求を処理するタスク
* @param {Object} action SIGNUP_REQUIREDアクション
*/
function* signupTask(action){

  //MOCK
  //本来はAPIを叩いて確認する
  //TODO 本実装
  const idDuplicated = isIDDuplicate(action.payload.id);
  if(idDuplicated){
    yield put(signupFailure([SIGNUP_FAILURE_REASONS.ID_DUPLICATED]));
  }else{
    try{
      //MOCK
      //本来はAPIを叩いて登録する
      //TODO 本実装
      yield registerUser(action.payload);
      yield put(signupSucceess());
      yield put(loginRequested(action.payload.id,action.payload.password));
    }catch(e){
      yield put(SIGNUP_FAILURE[SIGNUP_FAILURE_REASONS.SERVER_ERROR]);
    }
  }
}

//以下の関数はMOCK用
//TODO 実装終わったら消す

/**
* IDが重複しているかどうか確認する
* @param {string} id 確認するID
* @return {boolean} 重複していればTrue
*/
function isIDDuplicate(id){
  if(!existsKeyOnStorage(MOCK_MEMBER_REPO_KEY)){
    return false;
  }else{
    const repo = getFromStorage(MOCK_MEMBER_REPO_KEY);
    return repo.filter(m => m.id == id).length > 0;
  }
}
/**
* ユーザーをMOCKレポジトリに登録する
* @param {{id:string,password:string,name:string}} userinfo 登録を要求するユーザー情報
* @return {undefined}
*/
function registerUser(userinfo){
  if(!existsKeyOnStorage(MOCK_MEMBER_REPO_KEY)){
    setToStorage(MOCK_MEMBER_REPO_KEY,[userinfo]);
  }else{
    const repo = getFromStorage(MOCK_MEMBER_REPO_KEY);
    setToStorage(MOCK_MEMBER_REPO_KEY, repo.concat([userinfo]));
  }
}
