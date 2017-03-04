import {SUGGESTION_CHANGE,SUGGESTION_CLEAR} from '../action/suggestion'

/**
* 自分の行き先 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function suggestion(state={suggests:["EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"]},action){
  switch(action.type){
    case(SUGGESTION_CHANGE):
      return action.payload;
    case(SUGGESTION_CLEAR):
      return {suggests:[]};
    default:
      return state;
  }
}
