/**
* グループ作成ボードオープンアクション名
*/
export const OPEN_GROUP_CREATION_BOARD = "OPEN_GROUP_CREATION_BOARD";

/**
* グループ作成ボードオープンアクションのcreator
* @return {Object} OPEN_GROUP_CREATION_BOARDアクション
*/
export function openGroupCreationBoard(){
  return {
    type : OPEN_GROUP_CREATION_BOARD
  };
}

/**
* グループ作成ボードクローズアクション
*/
export const CLOSE_GROUP_CREATION_BOARD = "CLOSE_GROUP_CREATION_BOARD";

/**
* グループ作成ボードクローズアクションのcreator
* @return {Object} CLOSE_GROUP_CREATION_BOARDアクション
*/
export function closeGroupCreationBoard(){
  return {
    type: CLOSE_GROUP_CREATION_BOARD
  };
}

/**
* グループ管理ボードオープンアクション名
*/
export const OPEN_GROUP_MANAGEMENT_BOARD = "OPEN_GROUP_MANAGEMENT_BOARD";

/**
* グループ管理ボードオープンアクションのcreator
* @param {String} targetGroupId 管理対象のGroupのID
* @return {Object} OPEN_GROUP_MANAGEMENT_BOARDアクション
*/
export function openGroupManagementBoard(targetGroupId){
  return {
    type: OPEN_GROUP_MANAGEMENT_BOARD,
    payload:{
      groupId:targetGroupId
    }
  };
}

/**
* グループ管理ボードクローズアクション名
*/
export const CLOSE_GROUP_MANAGEMENT_BOARD = "CLOSE_GROUP_MANAGEMENT_BOARD";

/**
* グループ管理ボードクローズアクションのcreator
* @return {Object} CLOSE_GROUP_MANAGEMENT_BOARDアクション
*/
export function closeGroupManagementBoard(){
  return {
    type: CLOSE_GROUP_MANAGEMENT_BOARD
  };
}
