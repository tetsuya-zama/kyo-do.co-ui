import {put,call,takeEvery} from 'redux-saga/effects'
import {SIGNUP_REQUIRED,signupSucceess,signupFailure} from '../action/signup'
import {SIGNUP_FAILURE_REASONS} from '../const/signup'
import {loginRequested} from '../action/login'
import axios from "axios";

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
  try{
    const result = yield call(axios.post,"https://api.kyo-do.co/user",{
      userid:action.payload.id,
      password:action.payload.password,
      name:action.payload.name});

    yield put(signupSucceess());
    yield put(loginRequested(action.payload.id,action.payload.password));
  }catch(e){
    //XXX　エラーが起きればID重複と判断しているが、サーバエラーと区別したい
    yield put(signupFailure([SIGNUP_FAILURE_REASONS.ID_DUPLICATED]));
  }
}
