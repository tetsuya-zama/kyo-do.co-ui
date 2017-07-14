import {take,put,call,takeEvery} from 'redux-saga/effects'
import {
    OPEN_SECRET_QUESTION_BOARD,
    CLOSE_SECRET_QUESTION_BOARD,
    GET_SECRET_QUESTION,
    GET_SECRET_QUESTION_SUCCESS,
    GET_SECRET_QUESTION_FAILED,
    CHECK_SECRET_ANSWER,
    CHECK_SECRET_ANSWER_SUCCESS,
    getSecretQuestionSuccess,
    getSecretQuestionFiled,
    checkSecretAnswerSucces,
    checkSecretAnswerFailed,
    closeSecretQuestionBoard
} from '../action/secretquestion'
import {getApiBaseURL} from '../module/environment';
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* 秘密の質問要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* secretQuestionSaga(){
  /*
  * GET_SECRET_QUESTION(秘密の質問取得要求)アクションを常に待ち続け、
  * dispatchされたらgetSecretQuestionTaskにactionを渡して実行する
  */
  yield takeEvery(GET_SECRET_QUESTION,getSecretQuestionTask);


  /*
  * CHECK_SECRET_ANSWER(秘密の質問回答)アクションを常に待ち続け、
  * dispatchされたらcheckSecretAnswerTaskにactionを渡して実行する
  */
  yield takeEvery(CHECK_SECRET_ANSWER,checkSecretAnswerTask);

  /**
   * 失敗したらCHECK_SECRET_ANSWER_SUCCESS（秘密の質問の回答成功）アクションを待ち、
   * dispatchされたらcheckSecretAnswerSuccessTaskにactionを渡して実行する
   */
  yield takeEvery(CHECK_SECRET_ANSWER_SUCCESS,checkSecretAnswerSuccessTask);

}

/**
 * APIに対してIDで問い合わせる
 * 成功した場合はGET_SECRET_QUESTION_SUCCESS（秘密の質問取得成功）のアクションをputする
 * 失敗したらGET_SECRET_QUESTION_FAILED（秘密の質問取得失敗）アクションをputする
 * @param {*object} action GET_SECRET_QUESTION(秘密の質問取得要求)アクション
 */
export function* getSecretQuestionTask(action)
{
    try{
        const result = yield call(axios,{
            method:"GET",
            url:BASE_API_URL + "user/" + action.payload + "/secretquestion",
            headers:{"Content-Type":"application/json"}
        });
        yield put(getSecretQuestionSuccess(result.data));
    }catch(e){
        yield put(getSecretQuestionFiled());
    }
}

/**
 * APIに対して秘密の質問の回答とパスワードを投げる
 * 成功した場合はCHECK_SECRET_ANSWER_SUCCESS（秘密の質問の回答成功）のアクションをputする
 * 失敗したらCHECK_SECRET_ANSWER_FAILED（秘密の質問の回答失敗）アクションをputする
 * @param {*object} action CHECK_SECRET_ANSWER(秘密の質問の回答要求)アクション
 */
export function* checkSecretAnswerTask(action)
{
    try{
        const result = yield call(axios.post, BASE_API_URL + "user/" + action.payload.userid + "/secretquestion",{
            secretAnswer:action.payload.secretAnswer,
            password:action.payload.password
        });
        yield put(checkSecretAnswerSucces(result.data));
    }catch(e){
        yield put(checkSecretAnswerFailed());
    }
}

/**
 * 秘密の質問回答に成功したら、ダイアログを閉じる
 * @param {*object} action CHECK_SECRET_ANSWER_SUCCESS(秘密の質問の回答要求)アクション
 */
export function* checkSecretAnswerSuccessTask(action)
{
    yield put(closeSecretQuestionBoard());
}
