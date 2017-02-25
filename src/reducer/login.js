import {LOGIN_STATUS} from '../const/login'
import {LOGIN_SUCCESS,LOGIN_FAILURE,LOGIN_REQUESTED,LOGOUT_REQUESTED} from '../action/login'

/**
* ログイン reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function login(state={status:"NOTYET",user:{}}, action){
  switch(action.type){
    case LOGIN_SUCCESS:
      return {status:LOGIN_STATUS.SUCCESS,user:action.payload};
    case LOGIN_FAILURE:
      return {status:LOGIN_STATUS.FAILURE,user:{}};
    case LOGOUT_REQUESTED:
      return {status:LOGIN_STATUS.NOTYET,user:{}};
    case LOGIN_REQUESTED:
      return {status:LOGIN_STATUS.NOTYET,user:{}};
    default:
      return state;
  }
}
