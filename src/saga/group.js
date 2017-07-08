import {take,put,select,takeEvery,call,fork} from 'redux-saga/effects'
import {groupsLoaded,groupMemberLoaded} from '../action/group'
import {UPDATE_MEMBER_STATUS} from '../action/board'
import {getApiBaseURL} from '../module/environment'
import axios from "axios";

/**
* APIのベースURL
*/
const BASE_API_URL = getApiBaseURL();

/**
* group関連の他のSagaをforkするSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* groupSaga(){
  //TODO group関連の他のSaga(CRUD)を作成してforkする
  yield fork(loadUserGroupsSaga);
}

/**
* group関連データのロードを起動するActionを受け付けるSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadUserGroupsSaga(){
  yield takeEvery(UPDATE_MEMBER_STATUS,loadUserGroupsTask);
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

    yield put(groupsLoaded(result.data));
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

    const groupMemberStatus = result.data.members.map(memberId =>getMemberStatusById(memberStatus,memberId));

    yield put(groupMemberLoaded(Object.assign({},group,{member:groupMemberStatus}),logonUserId));
  }catch(e){
    //noop
  }
}

/**
* メンバーIDに紐づくメンバーの状況を取得する
* @param {array} memberStatus メンバーの状況の配列
* @param {String} memberId 取得したいメンバーのID
* @return {Object} メンバーIDに紐づくメンバーの状況
*/
function getMemberStatusById(memberStatus,memberId){
  const filteredMemberStatus = memberStatus.filter(member => member.userid === memberId);
  return filteredMemberStatus.length === 1 ? filteredMemberStatus[0] : undefined;
}
