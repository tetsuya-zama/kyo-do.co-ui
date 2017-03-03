import {take,put,select,takeEvery,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {updateMemberStatus} from '../action/board'
import {LOGIN_SUCCESS} from '../action/login'
import {LOGIN_STATUS} from '../const/login'
import {MY_DESTINATION_CHANGE,MY_DESTINATION_CLEAR} from '../action/mydestination'
import axios from "axios";

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
  yield takeEvery(MY_DESTINATION_CHANGE,loadMemberStatusTask);
  yield takeEvery(MY_DESTINATION_CLEAR,loadMemberStatusTask);
}

/**
* メンバー状況をロードするTask
*/
function* loadMemberStatusTask(){
  //TODO ダミー実装。本来はAPIから取得
  const me = yield select(state => state.login.user);
  const mydestination = yield select(state => state.mydestination);
  const memberStatus = yield getMemberStatus(me,mydestination);
  yield put(updateMemberStatus(memberStatus));
}

/**
* メンバー状況を定期的に確認するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* watchMemberStatusSaga(){
  while(true){
    const loginStatus = yield select(state => state.login.status);
    if(loginStatus == LOGIN_STATUS.SUCCESS){
      //TODO ダミー実装。本来はAPIから取得
      const me = yield select(state => state.login.user);
      const mydestination = yield select(state => state.mydestination);
      const memberStatus = yield getMemberStatus(me,mydestination);
      yield put(updateMemberStatus(memberStatus));
    }
    yield call(delay,STATUS_POLLING_DURATION_MS);
  }
}

/**
* メンバーの状況を返す
* @param {Object} me 自分のユーザー情報
* @param {Object} mydestination 自分の行き先
* @return {Object} メンバー状況
*/
function* getMemberStatus(me,mydestination){
  const token = yield select(state => state.login.user.token);
  try{
    const result = yield call(axios,{
      method:"GET",
      url:"https://api.kyo-do.co/status/all",
      headers: { "Authorization": "Bearer " + token}
    });
    return result.data;
  }catch(e){
    //XXX　エラーが起きればID重複と判断しているが、サーバエラーと区別したい
  }

}
