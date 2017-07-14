import {take,put,call,takeEvery,select} from 'redux-saga/effects'
import {
  GET_DEST_HISTORY,
  GET_DEST_HISTORY_SUCCESS,
  GET_DEST_HISTORY_FAILED,
  getDestHistory,
  getDestHistorySuccess,
  getDestHistoryFailed
} from '../action/historyboard'
import {getApiBaseURL} from '../module/environment';
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* 行き先履歴の取得要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* destinationHistorySaga(){
  /*
  * GET_DEST_HISTORY(行き先履歴情報取得要求)アクションを常に待ち続け、
  * dispatchされたらgetDestinationHistoryTaskにactionを渡して実行する
  */
  yield takeEvery(GET_DEST_HISTORY,getDestinationHistoryTask);

}

/**
 * APIに対してuseridで問い合わせる
 * 成功した場合はGET_DEST_HISTORY_SUCCESS（履歴情報取得成功）のアクションをputする
 * 失敗した場合はGET_DEST_HISTORY_FAILED（履歴情報取得失敗）アクションをputする
 * @param {*object} action GET_DEST_HISTORY(履歴情報取得要求)アクション
 */
export function* getDestinationHistoryTask(action)
{
  const token = yield select(state => state.login.user.token);
    try{
        const result = yield call(axios,{
            method:"GET",
            url:BASE_API_URL + "user/" + action.payload + "/history",
            headers: { "Authorization": "Bearer " + token}
        });
        yield put(getDestHistorySuccess(result.data));
    }catch(e){
        yield put(getDestHistoryFailed());
    }
}
