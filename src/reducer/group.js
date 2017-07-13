import {GROUPS_LOADED,GROUP_MEMBER_LOADED} from '../action/group';
import {DEFAULT_GROUP} from '../const/group';
import {getGroupById} from '../module/group';

/**
* グループ reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function group(state=DEFAULT_GROUP,action){
  switch(action.type){
    case(GROUPS_LOADED):
      let newUserGroups = filterUserGroup(action.payload.groupinfo,action.payload.logonUserId);
      return {allGroups:action.payload.groupinfo,usersGroups:newUserGroups};
    default:
      return state;
  }
}

/**
* ログインしているユーザーが管理者になっているもしくはメンバーになっているグループに絞り込む
* @param {array} allGroups 絞り込む対象のグループ
* @param {String} logonUserId ログインしているユーザーのID
* @return {array} 絞り込まれたグループの配列
*/
function filterUserGroup(allGroups,logonUserId){
  return allGroups.filter(group => {
    if(group.admin.indexOf(logonUserId) >= 0){
      return true;
    }else{
      if(group.members){
        return group.members.indexOf(logonUserId) >= 0;
      }else{
        return false;
      }
    }
  });
}
