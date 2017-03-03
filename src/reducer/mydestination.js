import {MY_DESTINATION_CHANGE,MY_DESTINATION_CLEAR} from '../action/mydestination'

/**
* 自分の行き先 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function mydestination(state={inBusiness:false,comment:""},action){
  switch(action.type){
    case(MY_DESTINATION_CHANGE):
      return action.payload;
    case(MY_DESTINATION_CLEAR):
      return {inBusiness:false,comment:""};
    default:
      return state;
  }
}
