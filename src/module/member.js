/**
* メンバーIDに紐づくメンバーの状況を取得する
* @param {array} memberStatus メンバーの状況の配列
* @param {String} memberId 取得したいメンバーのID
* @return {Object} メンバーIDに紐づくメンバーの状況
*/
export function getMemberStatusById(memberStatus,memberId){
  const filteredMemberStatus = memberStatus.filter(member => member.userid === memberId);
  return filteredMemberStatus.length === 1 ? filteredMemberStatus[0] : undefined;
}
