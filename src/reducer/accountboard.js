import {ACCOUNT_INFO_MODAL_OPEN,ACCOUNT_INFO_MODAL_CLOSE,CHANGE_ACCOUNT_INFO,CHANGE_ACCOUNT_INFO_FIELD} from '../action/accountboard'

/**
* アカウント情報変更ボード reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function accountboard(state={open:false, nextuser:{}}, action){
  switch(action.type){
    case ACCOUNT_INFO_MODAL_OPEN:
      return {open:true, nextuser:{}};
    case ACCOUNT_INFO_MODAL_CLOSE:
      return {open:false, nextuser:{}};
    case CHANGE_ACCOUNT_INFO:
      return {open:false, nextuser:{}};
    case CHANGE_ACCOUNT_INFO_FIELD:
      return {open:true, nextuser:action.payload};
    default:
      return state;
  }
}
