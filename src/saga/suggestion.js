import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {MY_DESTINATION_CHANGE} from '../action/mydestination'
import {suggestionChange} from '../action/suggestion'
import {LOGIN_SUCCESS} from '../action/login'
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'

/**
* localStorageに行き先を保管する際のKey
*/
const STORAGE_KEY_SUGGESTION = "my_destination.history.";
const REGTAB = RegExp("\x09", 'g');

/**
* 行き先を入力してからサーバ同期するまでの遅延時間
*/
const SYNC_DELAY_MS = 3000;

/**
* ログインが成功した際にログインユーザーのサジェスチョンをロードするSaga
*/
export function* loadSuggestionSaga(){
  yield takeEvery(LOGIN_SUCCESS,loadSuggestionTask);
  yield takeEvery(MY_DESTINATION_CHANGE, loadSuggestionTask);
}

/**
* ログインユーザーの行き先をロードするtask
*/
function* loadSuggestionTask(){
  const userid = yield select(state => state.login.user.userid);
  const saved = existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid);
  if(saved){
    const savedSuggestion = yield getFromStorage(STORAGE_KEY_SUGGESTION + userid);
    // console.log(savedSuggestion.split(REGTAB));
    yield put(suggestionChange(savedSuggestion.split(REGTAB)));
  }
}

/**
* 行き先変更アクションを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeSuggestionSaga(){
  yield takeLatest(MY_DESTINATION_CHANGE,changeSuggestionTask);
}

/**
* 行き先変更アクションを受け付けた際のTask
* @param {Object} action SUGGESTION_CHANGEアクション
*/
function* changeSuggestionTask(action){
  var histarr = [];

  yield call(delay,SYNC_DELAY_MS);
  const logonUser = yield select(state => state.login.user);
  // サジェスト用履歴をローカルストレージに保存する
  if(action.payload.comment.length > 0){
    const saved = existsKeyOnStorage(STORAGE_KEY_SUGGESTION + logonUser.userid);
    if(saved){
      const savedHistory = yield getFromStorage(STORAGE_KEY_SUGGESTION + logonUser.userid);
      histarr = savedHistory.split(REGTAB);
    } else {
      // かっちょわるい
      histarr = ["EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"];
    }
    unshiftArray(histarr,action.payload.comment);
    setToStorage(STORAGE_KEY_SUGGESTION + logonUser.userid, histarr.join("\x09"));
  }

  function isArrayExists(array, value) {
    // 配列の最後までループ
    for (var i =0, len = array.length; i < len; i++) {
      if (value == array[i]) {
        // 存在したらtrueを返す
        return true;
      }
    }
    // 存在しない場合falseを返す
    return false;
  }
  // 重複を排除しながらunshiftする関数
  function unshiftArray(array, value) {
    // 存在しない場合、配列にpushする
    if(! isArrayExists(array, value)) {
      array.unshift(value);
      // console.log("out: " + action.payload.comment);
      if(array.length > 15){
        array.pop();
      }
    }
    return true;
  }
}
