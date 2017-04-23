import {put,call,takeEvery} from 'redux-saga/effects'
import {SIGNUP_REQUIRED,signupSucceess,signupFailure} from '../action/signup'
import {SIGNUP_FAILURE_REASONS} from '../const/signup'
import {loginRequested} from '../action/login'
import {getApiBaseURL} from '../module/environment';
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

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
export function* signupTask(action){
  try{
    const result = yield call(axios.post,BASE_API_URL + "user",{
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
