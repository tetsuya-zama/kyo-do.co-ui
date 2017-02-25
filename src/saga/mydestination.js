import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {MY_DESTINATION_CHANGE,myDestinationChange} from '../action/mydestination'
import {LOGIN_SUCCESS} from '../action/login'
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'

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
    const saved = yield existsKeyOnStorage(STORAGE_KEY_DESTINATION + action.payload.userid);
    if(saved){
      const savedDestination = yield getFromStorage(STORAGE_KEY_DESTINATION + action.payload.userid);
      yield put(myDestinationChange(savedDestination));
    }

    /**
    * TODO APIを呼び出してサーバ上に保存されている行き先を取得する
    */

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
  yield call(delay,SYNC_DELAY_MS);
  const logonUser = yield select(state => state.login.user);

  //とりあえずlocalStorageに保存する
  setToStorage(STORAGE_KEY_DESTINATION + logonUser.userid, action.payload);

  /**
  * TODO APIを呼び出してサーバ上に保存
  */

}
