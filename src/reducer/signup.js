import {SIGNUP_SUCCESS,SIGNUP_FAILURE} from '../action/signup'

const initialState = {failure_reason:[]};

/**
* サインアップ reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function signup(state=initialState,action){
  switch(action.type){
    case(SIGNUP_SUCCESS):
      return initialState;
    case(SIGNUP_FAILURE):
      return {failure_reason:action.payload};
    default:
      return state;
  }
}
