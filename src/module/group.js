/**
* グループ配列の中からIDに紐づくグループを取得する
* @param {array} groups グループの配列
* @param {String} groupId 取得したいグループのID
* @return {Object} グループIDに紐づくグループ
*/
export function getGroupById(groups, groupId){
  const filteredGroups = groups.filter(group => group.id === groupId);
  return filteredGroups.length === 1 ? filteredGroups[0] : undefined;
}
