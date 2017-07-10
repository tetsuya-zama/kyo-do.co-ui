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
      {
        let newAllGroups = margeGroupInfo(state.allGroups, action.payload.groupinfo);
        let newUserGroups = filterUserGroup(newAllGroups,action.payload.logonUserId);
        return {allGroups:newAllGroups,usersGroups:newUserGroups};
      }
    case(GROUP_MEMBER_LOADED):
      {
        let newAllGroups = fetchGroupMember(state.allGroups, action.payload.groupWithMember);
        let newUserGroups = filterUserGroup(newAllGroups,action.payload.logonUserId);
        return {allGroups:newAllGroups,usersGroups:newUserGroups};
      }
    default:
      return state;
  }
}

/**
* グループ情報をマージする
* ただし、この時点ではメンバー情報はロードされていないため、
* メンバー情報は前のものを用いる
* @param {array} currentGroups 現在のグループ情報
* @param {array} ロードされたグループ情報
* @return {array} マージされたグループ情報
*/
function margeGroupInfo(currentGroups, newGroups){
  return newGroups.map((newGroup) => {
    const currentGroup = getGroupById(currentGroups, newGroup.id);
    if(currentGroup){
      if(currentGroup.members){
        return Object.assign({},newGroup,{members : currentGroup.members});
      }else{
        return newGroup;
      }
    }else{
      return newGroup;
    }
  });
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

/**
* グループ情報にメンバー情報を紐づける
* @param {array} currentGroups メンバーを紐づけるグループの配列
* @param newGroupWithMembers {Object} 更新するメンバー情報付きのグループ
* @return {array}　メンバーが紐付けられたグループの配列
*/
function fetchGroupMember(currentGroups, newGroupWithMembers){
  return currentGroups.map(group => {
    if(group.id === newGroupWithMembers.id){
      return newGroupWithMembers;
    }else{
      return group;
    }
  })
}
