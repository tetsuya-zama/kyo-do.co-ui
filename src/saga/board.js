import {take,put,select,takeEvery,call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {updateMemberStatus} from '../action/board'
import {LOGIN_SUCCESS} from '../action/login'
import {LOGIN_STATUS} from '../const/login'
import {MY_DESTINATION_CHANGE} from '../action/mydestination'

/**
* メンバー状況をpollingする間隔(ms)
*/
const STATUS_POLLING_DURATION_MS= 15000;

/**
* メンバー状況をロードするSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* loadMemberStatusSaga(){
  yield takeEvery(LOGIN_SUCCESS,loadMemberStatusTask);
  yield takeEvery(MY_DESTINATION_CHANGE,loadMemberStatusTask);
}

/**
* メンバー状況をロードするTask
*/
function* loadMemberStatusTask(){
  //TODO ダミー実装。本来はAPIから取得
  const me = yield select(state => state.login.user);
  const mydestination = yield select(state => state.mydestination);
  const memberStatus = yield getMemberStatusMock(me,mydestination);
  yield put(updateMemberStatus(memberStatus));
}

/**
* メンバー状況を定期的に確認するSaga
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function* watchMemberStatusSaga(){
  while(true){
    const loginStatus = yield select(state => state.login.status);
    if(loginStatus == LOGIN_STATUS.SUCCESS){
      //TODO ダミー実装。本来はAPIから取得
      const me = yield select(state => state.login.user);
      const mydestination = yield select(state => state.mydestination);
      const memberStatus = yield getMemberStatusMock(me,mydestination);
      yield put(updateMemberStatus(memberStatus));
    }
    yield call(delay,STATUS_POLLING_DURATION_MS);
  }
}

/**
* Mockデータの中からランダムでメンバー状況を返す
* TODO 本実装完了したら削除
* @param {Object} me 自分のユーザー情報
* @param {Object} mydestination 自分の行き先
* @return {Object} メンバー状況
*/
function getMemberStatusMock(me,mydestination){
  const mockDataSet = [
    [
      {"teamId":"ta","name":"チームA","members":[
        {"name":"テストA","inBusiness":true,"comment":""},
        {"name":"テストB","inBusiness":false, "comment":"明日客先直行　午後戻り"}
      ]},
      {"teamId":"tb","name":"チームB","members":[
        {"name":"テストC","inBusiness":true,"comment":"客先NR"},
        {"name":"テストD","inBusiness":true, "comment":""}
      ]}
    ],
    [
      {"teamId":"ta","name":"チームA","members":[
        {"name":"テストA","inBusiness":true,"comment":"会議中"},
        {"name":"テストB","inBusiness":false, "comment":"明日客先直行　午後戻り"}
      ]},
      {"teamId":"tb","name":"チームB","members":[
        {"name":"テストC","inBusiness":true,"comment":"客先NR"},
        {"name":"テストD","inBusiness":true, "comment":""}
      ]}
    ],
    [
      {"teamId":"ta","name":"チームA","members":[
        {"name":"テストA","inBusiness":true,"comment":"会議中"},
        {"name":"テストB","inBusiness":false, "comment":"明日客先直行　午後戻り"}
      ]},
      {"teamId":"tb","name":"チームB","members":[
        {"name":"テストC","inBusiness":true,"comment":"客先NR"},
        {"name":"テストD","inBusiness":false, "comment":""}
      ]}
    ],
    [
      {"teamId":"ta","name":"チームA","members":[
        {"name":"テストA","inBusiness":false,"comment":""},
        {"name":"テストB","inBusiness":false, "comment":"明日客先直行　午後戻り"}
      ]},
      {"teamId":"tb","name":"チームB","members":[
        {"name":"テストC","inBusiness":true,"comment":"客先NR"},
        {"name":"テストD","inBusiness":false, "comment":""}
      ]}
    ]
  ];

  const mock = mockDataSet[Math.floor(Math.random() * mockDataSet.length)];
  return mock.map(
    team => Object.assign(
      {},
      team,
      {members: team.members.concat(
        {
          "name":me.name,
          "inBusiness":mydestination.inBusiness,
          "comment":mydestination.comment
        })
      }
    )
  );
}
