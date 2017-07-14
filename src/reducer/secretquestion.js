import {
  OPEN_SECRET_QUESTION_BOARD,
  CLOSE_SECRET_QUESTION_BOARD,
  GET_SECRET_QUESTION_SUCCESS,
  GET_SECRET_QUESTION_FAILED
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
      return Object.assign({},state,{secretQuestion:"",isOpen:false});
    case(GET_SECRET_QUESTION_SUCCESS):
      return Object.assign({},state,action.payload);
    case(GET_SECRET_QUESTION_FAILED):
      return Object.assign({},state,{secretQuestion:""});
    default:
      return state;
  }
}
