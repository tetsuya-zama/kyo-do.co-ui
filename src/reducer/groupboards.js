import {
  OPEN_GROUP_CREATION_BOARD,
  CLOSE_GROUP_CREATION_BOARD,
  OPEN_GROUP_MANAGEMENT_BOARD,
  CLOSE_GROUP_MANAGEMENT_BOARD
} from '../action/groupboards';
import {CREATE_GROUP_SUCCESS} from '../action/group';
import {DEFAULT_GROUPBORADS} from '../const/groupboards';

/**
* グループ reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function groupboards(state=DEFAULT_GROUPBORADS,action){
  switch(action.type){
    case(OPEN_GROUP_CREATION_BOARD):
      return Object.assign({},state,{creationBoard:{isOpen:true}});
    case(CLOSE_GROUP_CREATION_BOARD):
      return Object.assign({},state,{creationBoard:{isOpen:false}});
    case(OPEN_GROUP_MANAGEMENT_BOARD):
      return Object.assign({},state,{managementBoard:{isOpen:true, groupId:action.payload.groupId}});
    case(CLOSE_GROUP_MANAGEMENT_BOARD):
      return Object.assign({},state,{managementBoard:{isOpen:false, groupId:""}});
    case(CREATE_GROUP_SUCCESS):
      return Object.assign({},state,{
        creationBoard:{isOpen:false},
        managementBoard:{isOpen:true, groupId:action.payload.groupId}
      });
    default:
      return state;
  }
}
