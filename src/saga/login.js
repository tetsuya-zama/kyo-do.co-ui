import {take,put,call,takeEvery} from 'redux-saga/effects'
import {LOGIN_REQUESTED,LOGIN_FAILURE,LOGOUT_REQUESTED,loginRequested,loginSuccess,loginFailure} from '../action/login'
import {getFromStorage,setToStorage,removeFromStorage,existsKeyOnStorage} from '../module/localstorage'
import axios from "axios";

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
export function* loginTask(action){
  //rememberme
  try{
    yield setToStorage(REMEMBER_ME_STORAGE_KEY,{id:action.payload.id,pass:action.payload.pass});
  }catch(e){
    //localStorageにアクセスできない場合は何もしない
  }


  //XXX 現在の実装ではサーバエラーなのかID/Passが間違っているのか判断がつかない
  try{
    const result = yield call(axios.post,"https://api.kyo-do.co/auth",{
      userid:action.payload.id,
      password:action.payload.pass
    });

    const token = result.data.token;

    const resule_user = yield call(axios,{
      method:"GET",
      url:"https://api.kyo-do.co/user",
      headers:{"Authorization":"Bearer " + token}
    });

    yield put(loginSuccess({userid:action.payload.id,name:resule_user.data.name,token:token}));
  }catch(e){
    yield put(loginFailure());
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
export function* cleanRememberMeTask(){
  try{
    yield removeFromStorage(REMEMBER_ME_STORAGE_KEY);
  }catch(e){
    //localStorageにアクセスできない場合は何もしない
  }

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
