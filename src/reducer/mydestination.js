import {MY_DESTINATION_CHANGE} from '../action/mydestination'
import {DEFAULT_MY_DESTINATION} from '../const/mydestination'
import {SUGGESTION_CHANGE,SUGGESTION_CLEAR} from '../action/suggestion'

/**
* 自分の行き先 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function mydestination(state=DEFAULT_MY_DESTINATION,action){
  switch(action.type){
    case(MY_DESTINATION_CHANGE):
      return Object.assign({},state,action.payload);
    case(SUGGESTION_CHANGE):
      return Object.assign({},state,{suggestion:action.payload});
    case(SUGGESTION_CLEAR):
      return Object.assign({},state,{suggestion:DEFAULT_MY_DESTINATION.suggestion});
    default:
      return state;
  }
}
