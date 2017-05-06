import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {CHANGE_ACCOUNT_INFO} from '../action/accountboard'
import {loginSuccess} from '../action/login'
import {getApiBaseURL} from '../module/environment'
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* アカウント情報変更要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeAccountInfoSaga(){
  /*
  * CHANGE_ACCOUNT_INFO(アカウント情報変更要求)アクションを常に待ち続け、
  * dispatchされたらchangeAccountInfoTaskにactionを渡して実行する
  */
  yield takeEvery(CHANGE_ACCOUNT_INFO,changeAccountInfoTask);
}
/**
* APIに対してID/Passを問い合わせて、
* 成功すればユーザー情報を元にLOGIN_SUCCESS(ログイン成功)アクションをput(dispatch)する
* @param {object} action LOGIN_REQUESTED(ログイン要求)アクション
*/
export function* changeAccountInfoTask(action){

  const changeData = {};
  if(action.payload.nextpass){
    changeData.newPassword = action.payload.nextpass;
  }
  if(action.payload.nextname){
    changeData.name = action.payload.nextname;
  }


  //XXX 現在の実装ではサーバエラーなのかID/Passが間違っているのか判断がつかない
  try{
    const token = yield select(state => state.login.user.token);
    const result = yield call(axios, {
      method:"PUT",
      url:BASE_API_URL + "user",
      headers:{"Authorization":"Bearer " + token},
      data: changeData
    });
    const name = (result.data.name)?
      result.data.name:
      yield select(state => state.login.user.name);
    const id = yield select(state => state.login.user.userid);

    yield put(loginSuccess({userid:id,name:name,token:token}));
  }catch(e){
    console.log('error');
    //yield put(loginFailure());
  }
}
