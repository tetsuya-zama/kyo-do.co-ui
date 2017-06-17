import {USERS_GROUPS_LOADED} from '../action/group';
import {DEFAULT_GROUP} from '../const/group';

/**
* グループ reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function group(state=DEFAULT_GROUP,action){
  switch(action.type){
    case(USERS_GROUPS_LOADED):
      return Object.assign({},state,{usersGroups:action.payload});
    default:
      return state;
  }
}
