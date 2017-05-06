import {take,put,select,takeEvery,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {updateMemberStatus,memberStatusPolling,MEMBER_STATUS_POLLING} from '../action/board'
import {LOGIN_SUCCESS} from '../action/login'
import {LOGIN_STATUS} from '../const/login'
import {MY_DESTINATION_SAVE_COMPLETE} from '../action/mydestination'
import {getApiBaseURL} from '../module/environment'
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* メンバー状況をpollingする間隔(ms)
*/
const STATUS_POLLING_DURATION_MS= 15000;

/**
* メンバー状況をロードするSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadMemberStatusSaga(){
  yield takeEvery(LOGIN_SUCCESS,loadMemberStatusTask);
  yield takeEvery(MY_DESTINATION_SAVE_COMPLETE,loadMemberStatusTask);
  yield takeEvery(MEMBER_STATUS_POLLING,loadMemberStatusTask);
}

/**
* メンバー状況をロードするTask
*/
export function* loadMemberStatusTask(){
  const token = yield select(state => state.login.user.token);
  const logonUserId = yield select(state=> state.login.user.userid);
  try{
    const result = yield call(axios,{
      method:"GET",
      url:BASE_API_URL + "status/all",
      headers: { "Authorization": "Bearer " + token}
    });

    // 自分の情報を先頭に表示する
    const memberStatus = result.data.filter(status => status.userid !== logonUserId);
    const logonUserStatus = result.data.filter(status => status.userid === logonUserId);
    yield put(updateMemberStatus(logonUserStatus.concat(memberStatus)));
  }catch(e){
    //XXX　エラーが起きればID重複と判断しているが、サーバエラーと区別したい
  }
}

/**
* メンバー状況を定期的に確認するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* watchMemberStatusSaga(){
  while(true){
    const loginStatus = yield select(state => state.login.status);
    if(loginStatus == LOGIN_STATUS.SUCCESS){
      yield put(memberStatusPolling());
    }
    yield call(delay,STATUS_POLLING_DURATION_MS);
  }
}
