import {take,put,takeEvery} from 'redux-saga/effects'
import {LOGIN_REQUESTED,LOGIN_FAILURE,LOGOUT_REQUESTED,loginRequested,loginSuccess,loginFailure} from '../action/login'
import {getFromStorage,setToStorage,removeFromStorage,existsKeyOnStorage} from '../module/localstorage'

//MOCK用
//TODO 実装終わったら消す
import {MOCK_MEMBER_REPO_KEY} from '../const/signup'

/**
* rememberme情報（入力されたID/Pass）をlocalStorageに保存する際のkey
*/
const REMEMBER_ME_STORAGE_KEY = "rememberme";

/**
* login要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loginSaga(){
  /*
  * LOGIN_REQUESTED(ログイン要求)アクションを常に待ち続け、
  * dispatchされたらloginTaskにactionを渡して実行する
  */
  yield takeEvery(LOGIN_REQUESTED,loginTask);
}
/**
* APIに対してID/Passを問い合わせて、
* 成功すればユーザー情報を元にLOGIN_SUCCESS(ログイン成功)アクションをput(dispatch)する
* @param {object} action LOGIN_REQUESTED(ログイン要求)アクション
*/
function* loginTask(action){
  //rememberme
  setToStorage(REMEMBER_ME_STORAGE_KEY,{id:action.payload.id,pass:action.payload.pass});

  /*
  * TODO ダミーロジック。実際にはAPIにアクセスしてログイン成否をハンドリングする必要あり。
  * ここではMockに登録されたユーザーでログイン可能とする
  */
  const mockRepo = yield getFromStorage(MOCK_MEMBER_REPO_KEY);
  if(!mockRepo){
    //ユーザーが１人もいない
    //LOGIN_FAILUREアクションをput(dispatch)
    yield put(loginFailure());
  }else{
    const targetUserArray = mockRepo.filter(u => u.id == action.payload.id);
    if(targetUserArray.length == 0){
      //IDに紐づくユーザーがいない
      //LOGIN_FAILUREアクションをput(dispatch)
      yield put(loginFailure());
    }else{
      const targetUser = targetUserArray[0];
      if(targetUser.password == action.payload.pass){
        //ログイン成功
        //LOGIN_SUCCESSアクションをput(dispatch)
        yield put(loginSuccess({userid:targetUser.id,name:targetUser.name,token:"dummy"}));
      }else{
        //パスワードが一致しない
        //LOGIN_FAILUREアクションをput(dispatch)
        yield put(loginFailure());
      }
    }
  }
}
/**
* logout要求を受けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* logoutSaga(){
  yield takeEvery(LOGOUT_REQUESTED,cleanRememberMeTask);
}

/**
* ログインに失敗したときのクリーンアップを行うSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loginFailureSaga(){
  yield takeEvery(LOGIN_FAILURE,cleanRememberMeTask);
}
/**
* localStorageに保存されているrememberme情報をクリアするTask
*/
function* cleanRememberMeTask(){
  yield removeFromStorage(REMEMBER_ME_STORAGE_KEY);
}

/**
* localStorageに保存されているID/PassからログインするSaga
* アプリを起動して(ブラウザアクセスして)1回だけ実行される
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loginFromRememberMeSaga(){
  const remembermeSaved = yield existsKeyOnStorage(REMEMBER_ME_STORAGE_KEY);
  if(remembermeSaved){
    const rememberme = yield getFromStorage(REMEMBER_ME_STORAGE_KEY);
    yield put(loginRequested(rememberme.id,rememberme.pass));
  }
}
