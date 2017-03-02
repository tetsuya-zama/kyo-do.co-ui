import {UPDATE_MEMBER_STATUS} from '../action/board'

/**
* 行き先掲示板 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function board(state={memberStatus:[]},action){
  switch(action.type){
    case(UPDATE_MEMBER_STATUS):
      return Object.assign({},state,{memberStatus:action.payload});
    default:
      return state;
  }
}
