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
* 秘密の質問取得失敗アクションのcreator
* @return {Object} GET_SECRET_QUESTION_SUCCESS
*/
export function getSecretQuestionSuccess(){
  return {
    type : GET_SECRET_QUESTION_SUCCESS
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
* 秘密の質問の回答オープンアクション名
*/
export const OPEN_SECRET_ANSWER_BOARD = "OPEN_SECRET_ANSWER_BOARD";

/**
* 秘密の質問回答オープンアクションのcreator
* @return {Object} OPEN_SECRET_ANSWER_BOARD
*/
export function openSecretAnswerBoard(){
  return {
    type : OPEN_SECRET_ANSWER_BOARD
  };
}

/**
* 秘密の質問の回答クローズアクション名
*/
export const CLOSE_SECRET_ANSWER_BOARD = "CLOSE_SECRET_ANSWER_BOARD";

/**
* 秘密の質問回答クローズアクションのcreator
* @return {Object} OPEN_SECRET_ANSWER_BOARD
*/
export function closeSecretAnswerBoard(){
  return {
    type : OPEN_SECRET_ANSWER_BOARD
  };
}

