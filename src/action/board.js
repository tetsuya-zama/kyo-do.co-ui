/**
* チームメンバーの状況を更新するアクション名
*/
export const UPDATE_MEMBER_STATUS = 'UPDATE_MEMBER_STATUS';

/**
* チームメンバーの状況を更新するアクションのcreator
* @param {Object} memberStatus メンバー状況
* @return {Object} UPDATE_MEMBER_STATUSアクション
*/
export function updateMemberStatus(memberStatus){
  return {
    type:UPDATE_MEMBER_STATUS,
    payload:memberStatus
  }
}
