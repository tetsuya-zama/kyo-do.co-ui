import {take,put,takeEvery} from 'redux-saga/effects'
import {LOGIN_REQUESTED,loginSuccess,loginFailure} from '../action/login'
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
  /*
  * TODO ダミーロジック。実際にはAPIにアクセスしてログイン成否をハンドリングする必要あり。
  * ここではtest/testのみログイン可能とする。
  */
  if(action.payload.id == "test" && action.payload.pass == "test"){
    const dummyUserInfo = {userid:"test", token:"dummy"};
    //LOGIN_SUCCESSアクションをput(dispatch)
    yield put(loginSuccess(dummyUserInfo));
  }else{
    //LOGIN_FAILUREアクションをput(dispatch)
    yield put(loginFailure());
  }
}
