/**
* 秘密の質問オープンアクション名
*/
export const OPEN_SECRET_QUESTION_BOARD = "OPEN_SECRET_QUESTION_BOARD";

/**
* 秘密の質問オープンアクションのcreator
* @return {Object} OPEN_SECRET_QUESTION_BOARD
*/
export function openSecretQuestionBoard(){
  return {
    type : OPEN_SECRET_QUESTION_BOARD
  };
}

/**
* 秘密の質問クローズアクション名
*/
export const CLOSE_SECRET_QUESTION_BOARD = "CLOSE_SECRET_QUESTION_BOARD";

/**
* 秘密の質問クローズアクションのcreator
* @return {Object} CLOSE_SECRET_QUESTION_BOARD
*/
export function closeSecretQuestionBoard(){
  return {
    type : CLOSE_SECRET_QUESTION_BOARD
  };
}

/**
 * 秘密の質問取得アクション名
 */
export const GET_SECRET_QUESTION = "GET_SECRET_QUESTION";

/**
* 秘密の質問取得アクションのcreator
* @param  {string} targetUserId 秘密の質問を取得するユーザID
* @return {Object} GET_SECRET_QUESTION
*/
export function getSecretQuestion(targetUserId){
  return {
    type : GET_SECRET_QUESTION,
    payload: targetUserId
  };
}

/**
 * 秘密の質問取得失敗アクション名
 */
export const GET_SECRET_QUESTION_SUCCESS = "GET_SECRET_QUESTION_SUCCESS";

/**
* 秘密の質問取得成功アクションのcreator
* @param  {string} secretQuestion 秘密の質問
* @return {Object} GET_SECRET_QUESTION_SUCCESS
*/
export function getSecretQuestionSuccess(secretQuestion){
  return {
    type : GET_SECRET_QUESTION_SUCCESS,
    payload : secretQuestion
  };
}

/**
 * 秘密の質問取得失敗アクション名
 */
export const GET_SECRET_QUESTION_FAILED = "GET_SECRET_QUESTION_FAILED";

/**
* 秘密の質問取得失敗アクションのcreator
* @return {Object} GET_SECRET_QUESTION_SUCCESS
*/
export function getSecretQuestionFiled(){
  return {
    type : GET_SECRET_QUESTION_FAILED
  };
}
/**
* 秘密の質問の回答チェックアクション名
*/
export const CHECK_SECRET_ANSWER = "CHECK_SECRET_ANSWER";

/**
* 秘密の質問回答チェックアクションのcreator
* @param {{userid:string,password:string,name:string,secretAnswer:string}} secretAnswerInfo 秘密の質問の回答に関する情報
* @return {Object} CHECK_SECRET_ANSWER
*/
export function checkSecretAnswer(secretAnswerInfo){
  return {
    type : CHECK_SECRET_ANSWER,
    payload : secretAnswerInfo
  };
}

/**
* 秘密の質問の回答チェック成功アクション名
*/
export const CHECK_SECRET_ANSWER_SUCCESS = "CHECK_SECRET_ANSWER_SUCCESS";

/**
* 秘密の質問回答チェック成功アクションのcreator
* @return {Object} CHECK_SECRET_ANSWER_SUCCESS
*/
export function checkSecretAnswerSucces(){
  return {
    type : CHECK_SECRET_ANSWER_SUCCESS
  };
}

/**
* 秘密の質問の回答チェック失敗アクション名
*/
export const CHECK_SECRET_ANSWER_FAILED = "CHECK_SECRET_ANSWER_FAILED";

/**
* 秘密の質問チェック失敗アクションのcreator
* @return {Object} CHECK_SECRET_ANSWER_FAILED
*/
export function checkSecretAnswerFailed(){
  return {
    type : CHECK_SECRET_ANSWER_FAILED
  };
}
