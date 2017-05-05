import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {MY_DESTINATION_SAVE_COMPLETE} from '../action/mydestination'
import {suggestionChange} from '../action/suggestion'
import {LOGIN_SUCCESS} from '../action/login'
import {setToStorage,getFromStorage,existsKeyOnStorage} from '../module/localstorage'
import {DEFAULT_SUGGENSTIONS} from '../const/suggestion'

/**
* localStorageに行き先を保管する際のKey
*/
const STORAGE_KEY_SUGGESTION = "my_destination.suggestion.";


/**
* ログインが成功した際にログインユーザーのサジェスチョンをロードするSaga
*/
export function* loadSuggestionSaga(){
  yield takeEvery(LOGIN_SUCCESS,loadSuggestionTask);
}

/**
* ログインユーザーの行き先をロードするtask
*/
export function* loadSuggestionTask(){
  const userid = yield select(state => state.login.user.userid);
  const saved = yield call(existsKeyOnStorage,STORAGE_KEY_SUGGESTION + userid);
  if(saved){
    const savedSuggestion = yield call(getFromStorage,STORAGE_KEY_SUGGESTION + userid);
    yield put(suggestionChange(savedSuggestion));
  }
}

/**
* 行き先変更アクションを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeSuggestionSaga(){
  yield takeEvery(MY_DESTINATION_SAVE_COMPLETE,changeSuggestionTask);
}

/**
* 行き先変更アクションを受け付けた際のTask
* @param {Object} action SUGGESTION_CHANGEアクション
*/
export function* changeSuggestionTask(action){
  // サジェスト用履歴をローカルストレージに保存する
  if(action.payload.comment.length > 0){
    const logonUser = yield select(state => state.login.user);
    const saved = yield call(existsKeyOnStorage,STORAGE_KEY_SUGGESTION + logonUser.userid);
    const savedHistory = saved ? yield call(getFromStorage,STORAGE_KEY_SUGGESTION + logonUser.userid) : DEFAULT_SUGGENSTIONS;
    const histarr = unshiftArray(savedHistory,action.payload.comment);
    yield call(setToStorage,STORAGE_KEY_SUGGESTION + logonUser.userid, histarr);
    yield put(suggestionChange(histarr));
  }

  function isArrayExists(array, value) {
    return array.indexOf(value) >= 0;
  }
  // 重複を排除しながらunshiftする関数
  function unshiftArray(array, value) {
    const result = array.concat();
    // 存在しない場合、配列にpushする
    if(! isArrayExists(array, value)) {
      result.unshift(value);
      if(result.length > 15){
        result.pop();
      }
    }
    return result;
  }
}
