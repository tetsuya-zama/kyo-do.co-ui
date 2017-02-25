import {take,put,select,takeEvery} from 'redux-saga/effects'
import {MY_DESTINATION_CHANGE,myDestinationChange} from '../action/mydestination'
import {LOGIN_SUCCESS} from '../action/login'
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'

/**
* localStorageに行き先を保管する際のKey
*/
const STORAGE_KEY_DESTINATION = "my_destination.";
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
    /**
    * XXX
    * 今のまま素直にajax部分を実装すると、一文字入力するたびにajaxが走ってしまうので
    * パフォーマンス的によろしくない
    * @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac#%E3%82%AA%E3%83%BC%E3%83%88%E3%82%B3%E3%83%B3%E3%83%97%E3%83%AA%E3%83%BC%E3%83%88
    * ↑のあたりを参考に遅延実行にした方が良い
    */
}
/**
* 行き先変更アクションを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeDestinationSaga(){
  yield takeEvery(MY_DESTINATION_CHANGE,changeDestinationTask);
}

/**
* 行き先変更アクションを受け付けた際のTask
* @param {Object} action MY_DESTINATION_CHANGEアクション
*/
function* changeDestinationTask(action){
  const logonUser = yield select(state => state.login.user);

  //とりあえずlocalStorageに保存する
  setToStorage(STORAGE_KEY_DESTINATION + logonUser.userid, action.payload);

  /**
  * TODO APIを呼び出してサーバ上に保存
  */
}
