import {take,put,select,takeEvery,call,fork} from 'redux-saga/effects'
import {
  groupsLoaded,
  groupMemberLoaded,
  createGroupSuccess,
  createGroupFailure,
  addMemberToGroupSuccess,
  addMemberToGroupFailure,
  deleteMemberFromGroupSuccess,
  deleteMemberFromGroupFailure,
  setMemberAsGroupAdminSuccess,
  setMemberAsGroupAdminFailure,
  unsetMemberAsGroupAdminSuccess,
  unsetMemberAsGroupAdminFailure,
  changeGroupNameSuccess,
  changeGroupNameFailure,
  deleteGroupSuccess,
  deleteGroupFailure
} from '../action/group'
import {
  CREATE_GROUP_REQUIRED,
  CREATE_GROUP_SUCCESS,
  ADD_MEMBER_TO_GROUP_REQUIRED,
  ADD_MEMBER_TO_GROUP_SUCCESS,
  DELETE_MEMBER_FROM_GROUP_REQUIRED,
  DELETE_MEMBER_FROM_GROUP_SUCCESS,
  SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  SET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  CHANGE_GROUP_NAME_REQUIRED,
  CHANGE_GROUP_NAME_SUCCESS,
  DELETE_GROUP_REQUIRED,
  DELETE_GROUP_SUCCESS
} from '../action/group'
import {UPDATE_MEMBER_STATUS} from '../action/board'
import {getApiBaseURL} from '../module/environment'
import axios from "axios";
import {getGroupById} from '../module/group';
import {getMemberStatusById} from '../module/member';

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* group関連の他のSagaをforkするSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* groupSaga(){
  yield fork(loadUserGroupsSaga);
  yield fork(createGroupSaga);
  yield fork(addMemberToGroupSaga);
  yield fork(deleteMemberFromGroupSaga);
  yield fork(setMemberAsGroupAdminSaga);
  yield fork(unsetMemberAsGroupAdminSaga);
  yield fork(changeGroupNameSaga);
  yield fork(deleteGroupSaga);
}

/**
* group関連データのロードを起動するActionを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadUserGroupsSaga(){
  yield takeEvery(UPDATE_MEMBER_STATUS,loadUserGroupsTask);
  yield takeEvery(CREATE_GROUP_SUCCESS,loadUserGroupsTask);
  yield takeEvery(ADD_MEMBER_TO_GROUP_SUCCESS,loadUserGroupsTask);
  yield takeEvery(DELETE_MEMBER_FROM_GROUP_SUCCESS,loadUserGroupsTask);
  yield takeEvery(SET_MEMBER_AS_GROUP_ADMIN_SUCCESS,loadUserGroupsTask);
  yield takeEvery(UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS,loadUserGroupsTask);
  yield takeEvery(CHANGE_GROUP_NAME_SUCCESS,loadUserGroupsTask);
  yield takeEvery(DELETE_GROUP_SUCCESS,loadUserGroupsTask);
}

/**
* APIからグループ情報を取得し、その後group memberのロードを実行するTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadUserGroupsTask(){
  const token = yield select(state => state.login.user.token);
  const logonUserId = yield select(state=> state.login.user.userid);

  try{
    const result = yield call(axios,{
      method:"GET",
      url:BASE_API_URL + "group",
      headers: { "Authorization": "Bearer " + token}
    });

    yield put(groupsLoaded(result.data,logonUserId));
    yield result.data.map(group => call(fetchMemberTask,group,token,logonUserId));
  }catch(e){
    //noop
  }
}

/**
* グループのメンバーをロードするTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} group メンバーをロードしたいgroup
* @param {String} token API token
* @param {String} logonUserId ログイン中のユーザーのID
*/
export function* fetchMemberTask(group,token,logonUserId){
  const groupId = group.id;

  try{
    const result = yield call(axios,{
      method:"GET",
      url:BASE_API_URL + "group/" + groupId + "/member",
      headers: { "Authorization": "Bearer " + token}
    });

    const memberStatus = yield select(state => state.board.memberStatus);

    const groupMemberStatus = result.data.members.map(
      memberId =>getMemberStatusById(memberStatus,memberId))
    .filter(val => val != undefined);

    yield put(groupMemberLoaded(Object.assign({},group,{member:groupMemberStatus}),logonUserId));
  }catch(e){
    //noop
  }
}

/**
* グループの作成要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* createGroupSaga(){
  yield takeEvery(CREATE_GROUP_REQUIRED,createGroupTask);
}

/**
* グループの作成をAPIへ要求するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action CREATE_GROUP_REQUIREDアクション
*/
export function* createGroupTask(action){
  const token = yield select(state => state.login.user.token);
  const groupName = action.payload.groupName;

  try{
    const result = yield call(
      axios.post,
      BASE_API_URL + "group",
      {"groupname": groupName},
      {headers:{"Authorization":"Bearer " + token}}
    );
    yield put(createGroupSuccess(result.data.groupId));
  }catch(e){
    yield put(createGroupFailure());
  }
}

/**
* グループへのメンバー追加要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* addMemberToGroupSaga(){
  yield takeEvery(ADD_MEMBER_TO_GROUP_REQUIRED,addMemberToGroupTask);
}

/**
* グループへのメンバー追加をAPIへ要求するTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action  ADD_MEMBER_TO_GROUP_REQUIREDアクション
*/
export function* addMemberToGroupTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;
  const memberId = action.payload.memberId;

  const currentGroups = yield select(state => state.group.allGroups);
  const targetGroup = getGroupById(currentGroups,groupId);

  const currentMemberIds = targetGroup.member.map(member => member.userid);
  const nextMemberIds = currentMemberIds.concat([memberId]);

  try{
    const result = yield call(
      axios.put,
      BASE_API_URL + "group/" + groupId + "/member",
      {"member": nextMemberIds},
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(addMemberToGroupSuccess());
  }catch(e){
    yield put(addMemberToGroupFailure());
  }
}

/**
* グループからのメンバー削除要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* deleteMemberFromGroupSaga(){
  yield takeEvery(DELETE_MEMBER_FROM_GROUP_REQUIRED,deleteMemberFromGroupTask);
}

/**
* グループからのメンバー削除をAPIに要求するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action DELETE_MEMBER_FROM_GROUP_REQUIREDアクション
*/
export function* deleteMemberFromGroupTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;
  const memberId = action.payload.memberId;

  const currentGroups = yield select(state => state.group.allGroups);
  const targetGroup = getGroupById(currentGroups,groupId);

  const currentMemberIds = targetGroup.member.map(member => member.userid);
  const nextMemberIds = currentMemberIds.filter(mid => mid !== memberId);

  try{
    const result = yield call(
      axios.put,
      BASE_API_URL + "group/" + groupId + "/member",
      {"member": nextMemberIds},
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(deleteMemberFromGroupSuccess());
  }catch(e){
    yield put(deleteMemberFromGroupFailure());
  }
}

/**
* グループの管理者設定要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* setMemberAsGroupAdminSaga(){
  yield takeEvery(SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,setMemberAsGroupAdminTask);
}

/**
* グループの管理者設定をAPIへ要求するTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action SET_MEMBER_AS_GROUP_ADMIN_REQUIREDアクション
*/
export function* setMemberAsGroupAdminTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;
  const memberId = action.payload.memberId;

  const currentGroups = yield select(state => state.group.allGroups);
  const targetGroup = getGroupById(currentGroups,groupId);

  const currentGroupName = targetGroup.groupname;

  const currentAdmins = targetGroup.admin;
  const nextAdmins = currentAdmins.concat([memberId]);

  try{
    const result = yield call(
      axios.put,
      BASE_API_URL + "group/" + groupId,
      {
        "groupname": currentGroupName,
        "admin" : nextAdmins
      },
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(setMemberAsGroupAdminSuccess());
  }catch(e){
    yield put(setMemberAsGroupAdminFailure());
  }
}
/**
* グループの管理者削除要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* unsetMemberAsGroupAdminSaga(){
  yield takeEvery(UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,unsetMemberAsGroupAdminTask);
}

/**
* グループの管理者削除をAPIに要求するTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action UNSET_MEMBER_AS_GROUP_ADMIN_REQUIREDアクション
*/
export function* unsetMemberAsGroupAdminTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;
  const memberId = action.payload.memberId;

  const currentGroups = yield select(state => state.group.allGroups);
  const targetGroup = getGroupById(currentGroups,groupId);

  const currentGroupName = targetGroup.groupname;

  const currentAdmins = targetGroup.admin;
  const nextAdmins = currentAdmins.filter(mid => mid !== memberId);

  try{
    const result = yield call(
      axios.put,
      BASE_API_URL + "group/" + groupId,
      {
        "groupname": currentGroupName,
        "admin" : nextAdmins
      },
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(unsetMemberAsGroupAdminSuccess());
  }catch(e){
    yield put(unsetMemberAsGroupAdminFailure());
  }
}

/**
* グループ名変更要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* changeGroupNameSaga(){
  yield takeEvery(CHANGE_GROUP_NAME_REQUIRED,changeGroupNameTask);
}

/**
* グループ名の変更をAPIへ要求するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Object} action CHANGE_GROUP_NAME_REQUIREDアクション
*/
export function* changeGroupNameTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;
  const newGroupName = action.payload.newName;

  const currentGroups = yield select(state => state.group.allGroups);
  const targetGroup = getGroupById(currentGroups,groupId);

  const currentAdmins = targetGroup.admin;

  try{
    const result = yield call(
      axios.put,
      BASE_API_URL + "group/" + groupId,
      {
        "groupname": newGroupName,
        "admin" : currentAdmins
      },
      {headers:{"Authorization":"Bearer " + token}}
    );

    yield put(changeGroupNameSuccess());
  }catch(e){
    yield put(changeGroupNameFailure());
  }
}

/**
* グループ削除要求を受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* deleteGroupSaga(){
  yield takeEvery(DELETE_GROUP_REQUIRED,deleteGroupTask);
}

/**
* グループの削除をAPIへ要求するTask
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
* @param {Objecy} action DELETE_GROUP_REQUIREDアクション
*/
export function* deleteGroupTask(action){
  const token = yield select(state => state.login.user.token);
  const groupId = action.payload.groupId;

  try{
    const result = yield call(axios,{
      method:"DELETE",
      url:BASE_API_URL + "group/" + groupId,
      headers: { "Authorization": "Bearer " + token}
    });

    yield put(deleteGroupSuccess());
  }catch(e){
    yield put(deleteGroupFailure());
  }
}
