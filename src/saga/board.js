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
* ログインに成功した際にメンバー状況をロードするTask
*/
function* loadMemberStatusTask(){
  //TODO ダミー実装。本来はAPIから取得
  const memberStatus = yield getMemberStatusMock();
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
      const memberStatus = yield getMemberStatusMock();
      yield put(updateMemberStatus(memberStatus));
    }
    yield call(delay,STATUS_POLLING_DURATION_MS);
  }
}

/**
* Mockデータの中からランダムでメンバー状況を返す
* TODO 本実装完了したら削除
* @return {Object} メンバー状況
*/
function getMemberStatusMock(){
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

  return mockDataSet[Math.floor(Math.random() * mockDataSet.length)]
}
