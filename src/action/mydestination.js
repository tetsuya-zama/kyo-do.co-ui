
/**
* 自分の行き先変更アクション名
*/
export const MY_DESTINATION_CHANGE = "MY_DESTINATION_CHANGE";

/**
* 自分の行き先変更アクションのcreator
* @param {{inBusiness:boolean,comment:string}} destination 行き先
* @return {Object} 自分の行き先変更アクション
*/
export function myDestinationChange(destination){
  return {
    type:MY_DESTINATION_CHANGE,
    payload:destination
  };
}
