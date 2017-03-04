import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {MY_DESTINATION_CHANGE,myDestinationChange} from '../action/mydestination'
import {LOGIN_SUCCESS} from '../action/login'
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'
import axios from 'axios';

/**
* localStorageに行き先を保管する際のKey
*/
const STORAGE_KEY_DESTINATION = "my_destination.";
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
* @param {object} action LOGIN_SUCCESSアクション
*/
function* loadDestinationTask(action){
    const token = yield select(state => state.login.user.token);

    try{
      const savedDestination = yield call(axios,{
        method:"GET",
        url:"https://api.kyo-do.co/status",
        headers:{"Authorization":"Bearer " + token}
      });

      yield put(myDestinationChange(savedDestination.data));
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
function* changeDestinationTask(action){
  /**
  * TODO APIを呼び出してサーバ上に保存
  */
  yield call(delay,SYNC_DELAY_MS);
  const token = yield select(state => state.login.user.token);
  try{

    yield call(axios.put,
      "https://api.kyo-do.co/status",
      {inBusiness:action.payload.inBusiness,comment:action.payload.comment,contact:action.payload.contact},
      {headers:{"Authorization":"Bearer " + token}}
    );
  }catch(e){
    //TODO 更新が失敗した旨をエラーアクションに投げる
    console.log(e);
  }
}
