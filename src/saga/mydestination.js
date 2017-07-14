import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {MY_DESTINATION_CHANGE,myDestinationChange,myDestinationSaveComplete} from '../action/mydestination'
import {LOGIN_SUCCESS} from '../action/login'
import {getApiBaseURL} from '../module/environment';
import axios from 'axios';
import {MY_DESTINATION_CLEAR} from '../action/mydestination'

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* 行き先を入力してからサーバ同期するまでの遅延時間
*/
const SYNC_DELAY_MS = 1000;

/**
* ログインが成功した際にログインユーザーの行き先をロードするSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadDestinationSaga(){
    yield takeEvery(LOGIN_SUCCESS,loadDestinationTask);
}

/**
* ログインユーザーの行き先をロードするtask
*/
export function* loadDestinationTask(){
    const token = yield select(state => state.login.user.token);

    try{
      const savedDestination = yield call(axios,{
        method:"GET",
        url:BASE_API_URL + "status",
        headers:{"Authorization":"Bearer " + token}
      });

      //XXX:material UIがバージョンアップして回避できるようになった場合
      //             この処理は削除して良い
      // もし、coomment か contact が　"" （空文字）出会った場合、
      // ” ”が帰ってきてしまう。それを回避する処理である
      const fixedDestination = Object.assign(
        {},
        savedDestination.data,
        {
          "comment": savedDestination.data.comment == " " ? "" : savedDestination.data.comment,
          "contact":savedDestination.data.contact == " " ? "" : savedDestination.data.contact}
      );

      yield put(myDestinationChange(fixedDestination));
    }catch(e){
      console.log(e);
      //TODO 更新に失敗したエラーアクションを投げる
    }
}
/**
* 行き先変更アクションを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeDestinationSaga(){
  yield takeLatest(MY_DESTINATION_CHANGE,changeDestinationTask);
}

/**
* 行き先変更アクションを受け付けた際のTask
* @param {Object} action MY_DESTINATION_CHANGEアクション
*/
export function* changeDestinationTask(action){
  yield call(delay,SYNC_DELAY_MS);
  const token = yield select(state => state.login.user.token);
  try{

    yield call(axios.put,
      BASE_API_URL + "status",
      {inBusiness:action.payload.inBusiness,comment:action.payload.comment,contact:action.payload.contact},
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(myDestinationSaveComplete(action.payload));
  }catch(e){
    //TODO 更新が失敗した旨をエラーアクションに投げる
    console.log(e);
  }
}
