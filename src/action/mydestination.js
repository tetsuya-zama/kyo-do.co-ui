import {DEFAULT_MY_DESTINATION} from '../const/mydestination';

/**
* 自分の行き先変更アクション名
*/
export const MY_DESTINATION_CHANGE = "MY_DESTINATION_CHANGE";

/**
* 自分の行き先変更アクションのcreator
* @param {{inBusiness:boolean,comment:string,contact:string}} destination 行き先
* @return {Object} 自分の行き先変更アクション
*/
export function myDestinationChange(destination){
  return {
    type:MY_DESTINATION_CHANGE,
    payload:destination
  };
}


/**
* 自分の行き先変更アクションをデフォルトの値で作るcreator
* @return {Object} 自分の行き先変更アクション
*/
export function myDestinationClear(){
  return {
    type:MY_DESTINATION_CHANGE,
    payload:DEFAULT_MY_DESTINATION
  };
}

/**
* 自分の行き先セーブ完了アクション
*/
export const MY_DESTINATION_SAVE_COMPLETE = "MY_DESTINATION_SAVE_COMPLETE";

/**
* 自分の行き先サーブ完了アクションのcreator
* @return {Object} 自分の行き先セーブ完了アクション
*/
export function myDestinationSaveComplete(){
  return {
    type : MY_DESTINATION_SAVE_COMPLETE
  };
}
