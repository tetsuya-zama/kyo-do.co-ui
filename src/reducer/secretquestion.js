import {
  OPEN_SECRET_QUESTION_BOARD,
  CLOSE_SECRET_QUESTION_BOARD,
  OPEN_SECRET_ANSWER_BOARD,
  CLOSE_SECRET_ANSWER_BOARD
} from '../action/secretquestion';
import {DEFAULT_SECRET_QUESTION} from '../const/secretquestion';

/**
* 秘密の質問 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function secretquestion(state=DEFAULT_SECRET_QUESTION,action){
  switch(action.type){
    case(OPEN_SECRET_QUESTION_BOARD):
      return Object.assign({},state,{isOpen:true});
    case(CLOSE_SECRET_QUESTION_BOARD):
      return Object.assign({},state,{isOpen:false});
    case(OPEN_SECRET_ANSWER_BOARD):
      return Object.assign({},state);
    case(CLOSE_SECRET_ANSWER_BOARD):
      return Object.assign({},state);
    default:
      return state;
  }
}
