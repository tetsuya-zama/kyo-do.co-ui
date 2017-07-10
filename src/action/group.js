/**
* グループのロード完了アクション名
*/
export const GROUPS_LOADED = "GROUPS_LOADED";

/**
* グループのロード完了アクションのcreator
* @param {Object} groupinfo ロードされたグループ情報
* @param {String} logonUserId ログインしているユーザーのID
* @return GROUPS_LOADED アクション
*/
export function groupsLoaded(groupinfo,logonUserId){
  return {
    type: GROUPS_LOADED,
    payload : {
      groupinfo:groupinfo,
      logonUserId:logonUserId
    }
  };
}

/**
* グループメンバーのロード完了アクション名
*/
export const GROUP_MEMBER_LOADED = "GROUP_MEMBER_LOADED";

/**
* グループメンバーのロード完了アクションのcreator
* @param {Object} groupWithMember メンバー情報付きのグループ情報
* @param {String} logonUserId ログインしているユーザーのID
* @return {Object} GROUP_MEMBER_LOADEDアクション
*/
export function groupMemberLoaded(groupWithMember,logonUserId){
  return {
    type: GROUP_MEMBER_LOADED,
    payload:{
      groupWithMember:groupWithMember,
      logonUserId:logonUserId
    }
  };
}


/**
* グループ作成要求アクション名
*/
export const CREATE_GROUP_REQUIRED = "CREATE_GROUP_REQUIRED";

/**
* グループ作成要求アクションのcreator
* @param {string} groupName 作成を要求するグループ名
* @return {Object} CREATE_GROUP_REQUIREDアクション
*/
export function createGroupRequired(groupName){
  return {
    type: CREATE_GROUP_REQUIRED,
    payload:{
      groupName:groupName
    }
  };
}

/**
* グループ作成成功アクション名
*/
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";

/**
* グループ作成成功アクションのcreator
* @return {Object} CREATE_GROUP_SUCCESSアクション
*/
export function createGroupSuccess(groupId){
  return {
    type:CREATE_GROUP_SUCCESS,
    payload:{
      groupId:groupId
    }
  };
}
/**
* グループ作成失敗アクション名
*/
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE";
/**
* グループ作成失敗アクションのcreator
* @return {Object} CREATE_GROUP_FAILUREアクション
*/
export function createGroupFailure(){
  return {
    type: CREATE_GROUP_FAILURE
  };
}
/**
* グループへのメンバー追加要求アクション名
*/
export const ADD_MEMBER_TO_GROUP_REQUIRED = "ADD_MEMBER_TO_GROUP_REQUIRED";

/**
* グループへのメンバー追加要求アクションのcreator
* @param {string} groupId 追加するグループのID
* @param {string} memberId 追加するメンバーのID
* @return {Object} ADD_MEMBER_TO_GROUP_REQUIREDアクション
*/
export function addMemberToGroupRequired(groupId,memberId){
  return {
    type:ADD_MEMBER_TO_GROUP_REQUIRED,
    payload:{
      groupId:groupId,
      memberId:memberId
    }
  };
}
/**
* グループへのメンバー追加成功アクション名
*/
export const ADD_MEMBER_TO_GROUP_SUCCESS = "ADD_MEMBER_TO_GROUP_SUCCESS";

/**
* グループへのメンバー追加成功アクションのcreator
* @return {Object} ADD_MEMBER_TO_GROUP_SUCCESSアクション
*/
export function addMemberToGroupSuccess(){
  return {
    type: ADD_MEMBER_TO_GROUP_SUCCESS
  };
}
/**
* グループへのメンバー追加失敗アクション名
*/
export const ADD_MEMBER_TO_GROUP_FAILURE = "ADD_MEMBER_TO_GROUP_FAILURE";

/**
* グループへのメンバー追加失敗アクションのcreator
* @return {Object} ADD_MEMBER_TO_GROUP_FAILUREアクション
*/
export function addMemberToGroupFailure(){
  return {
    type: ADD_MEMBER_TO_GROUP_FAILURE
  };
}
/**
* グループからメンバーの削除要求アクション名
*/
export const DELETE_MEMBER_FROM_GROUP_REQUIRED = "DELETE_MEMBER_FROM_GROUP_REQUIRED";

/**
* グループからメンバー削除要求アクションのcreator
* @param {string} groupId メンバーを削除するグループのID
* @param {string} memberId 削除されるメンバーのID
* @return {Object} DELETE_MEMBER_FROM_GROUP_REQUIREDアクション
*/
export function deleteMemberFromGroupRequired(groupId,memberId){
  return {
    type:DELETE_MEMBER_FROM_GROUP_REQUIRED,
    payload:{
      groupId:groupId,
      memberId:memberId
    }
  };
}
/**
* グループからのメンバー削除成功アクション名
*/
export const DELETE_MEMBER_FROM_GROUP_SUCCESS = "DELETE_MEMBER_FROM_GROUP_SUCCESS";
/**
* グループからのメンバー削除成功アクションのcreator
* @return DELETE_MEMBER_FROM_GROUP_SUCCESSアクション
*/
export function deleteMemberFromGroupSuccess(){
  return {
    type:DELETE_MEMBER_FROM_GROUP_SUCCESS
  };
}
/**
* グループからのメンバー削除失敗アクション名
*/
export const DELETE_MEMBER_FROM_GROUP_FAILURE = "DELETE_MEMBER_FROM_GROUP_FAILURE";

/**
* グループからのメンバー削除失敗アクションのcreator
* @return DELETE_MEMBER_FROM_GROUP_FAILUREアクション
*/
export function deleteMemberFromGroupFailure(){
  return {
    type:DELETE_MEMBER_FROM_GROUP_FAILURE
  }
}
/**
* グループメンバーの管理者設定要求アクション名
*/
export const SET_MEMBER_AS_GROUP_ADMIN_REQUIRED = "SET_MEMBER_AS_GROUP_ADMIN_REQUIRED";

/**
* グループメンバーの管理者設定要求アクションのcreator
* @param {string} groupId 管理者に設定するグループのID
* @param {string} memberId 管理者に設定するメンバーのID
* @return {Object} SET_MEMBER_AS_GROUP_ADMIN_REQUIREDアクション
*/
export function setMemberAsGroupAdminRequired(groupId,memberId){
  return {
    type:SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
    payload:{
      groupId:groupId,
      memberId:memberId
    }
  };
}

/**
* グループメンバーの管理者設定成功アクション名
*/
export const SET_MEMBER_AS_GROUP_ADMIN_SUCCESS = "SET_MEMBER_AS_GROUP_ADMIN_SUCCESS";

/**
* グループメンバーの管理者設定成功アクションのcreator
* @return {Object} SET_MEMBER_AS_GROUP_ADMIN_SUCCESSアクション
*/
export function setMemberAsGroupAdminSuccess(){
  return {
    type:SET_MEMBER_AS_GROUP_ADMIN_SUCCESS
  };
}

/**
* グループメンバーの管理者設定失敗アクション名
*/
export const SET_MEMBER_AS_GROUP_ADMIN_FAILURE = "SET_MEMBER_AS_GROUP_ADMIN_FAILURE";

/**
* グループメンバーの管理者設定失敗アクションのcreator
* @return {Object} SET_MEMBER_AS_GROUP_ADMIN_FAILUREアクション
*/
export function setMemberAsGroupAdminFailure(){
  return {
    type:SET_MEMBER_AS_GROUP_ADMIN_FAILURE
  };
}

/**
* グループメンバーの管理者設定解除アクション名
*/
export const UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED = "UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED";

/**
* グループメンバーの管理者設定解除アクションのcreator
* @param {string} groupId　管理者設定を解除するグループのID
* @param {string} memberId 管理者設定を解除するメンバーのID
* @return {Object} UNSET_MEMBER_AS_GROUP_ADMIN_REQUIREDアクション
*/
export function unsetMemberAsGroupAdminRequired(groupId,memberId){
  return {
    type:UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
    payload:{
      groupId:groupId,
      memberId:memberId
    }
  };
}

/**
* グループメンバーの管理者設定解除成功アクション名
*/
export const UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS = "UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS";

/**
* グループメンバーの管理者設定解除成功アクションのcreator
* @return {Object} UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESSアクション
*/
export function unsetMemberAsGroupAdminSuccess(){
  return {
    type:UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS
  };
}

/**
* グループメンバーの管理者設定解除失敗アクション名
*/
export const UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE = "UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE";

/**
* グループメンバーの管理者設定解除失敗アクションのcreator
* @return {Object} UNSET_MEMBER_AS_GROUP_ADMIN_FAILUREアクション
*/
export function unsetMemberAsGroupAdminFailure(){
  return {
    type:UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE
  };
}

/**
* グループ名変更要求アクション名
*/
export const CHANGE_GROUP_NAME_REQUIRED = "CHANGE_GROUP_NAME_REQUIRED";

/**
* グループ名変更要求アクションのcreator
* @param {string} groupId 名称を変更するグループのID
* @param {string} newName 変更後の名称
* @return {Object} CHANGE_GROUP_NAME_REQUIREDアクション
*/
export function changeGroupNameRequired(groupId,newName){
  return {
    type:CHANGE_GROUP_NAME_REQUIRED,
    payload:{
      groupId:groupId,
      newName:newName
    }
  };
}

/**
* グループ名変更成功アクション名
*/
export const CHANGE_GROUP_NAME_SUCCESS = "CHANGE_GROUP_NAME_SUCCESS";

/**
* グループ名変更成功アクションのcreator
* @return {Object} CHANGE_GROUP_NAME_SUCCESSアクション
*/
export function changeGroupNameSuccess(){
  return {
    type:CHANGE_GROUP_NAME_SUCCESS
  };
}
/**
* グループ名変更失敗アクション名
*/
export const CHANGE_GROUP_NAME_FAILURE = "CHANGE_GROUP_NAME_FAILURE";

/**
* グループ名変更失敗アクションのcreator
* @return {Object} CHANGE_GROUP_NAME_FAILUREアクション
*/
export function changeGroupNameFailure(){
  return {
    type:CHANGE_GROUP_NAME_FAILURE
  };
}

/**
*　グループ削除要求アクション名
*/
export const DELETE_GROUP_REQUIRED = "DELETE_GROUP_REQUIRED";

/**
* グループ削除要求アクションのcreator
* @param {string} groupId 削除するグループのID
* @return {Object} DELETE_GROUP_REQUIREDアクション
*/
export function deleteGroupRequired(groupId){
  return {
    type:DELETE_GROUP_REQUIRED,
    payload:{
      groupId:groupId
    }
  };
}
/**
* グループ削除成功アクション名
*/
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";

/**
* グループ削除成功アクションのcreator
* @return DELETE_GROUP_SUCCESSアクション
*/
export function deleteGroupSuccess(){
  return {
    type:DELETE_GROUP_SUCCESS
  };
}

/**
* グループ削除失敗アクション名
*/
export const DELETE_GROUP_FAILURE = "DELETE_GROUP_FAILURE";
/**
* グループ削除失敗アクションのcreator
* @return {Object} DELETE_GROUP_FAILUREアクション
*/
export function deleteGroupFailure(){
  return {
    type:DELETE_GROUP_FAILURE
  };
}
