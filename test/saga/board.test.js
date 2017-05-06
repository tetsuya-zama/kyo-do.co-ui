import assert from "power-assert";
import {loadMemberStatusSaga,loadMemberStatusTask,watchMemberStatusSaga} from '../../src/saga/board';
import {updateMemberStatus,memberStatusPolling,MEMBER_STATUS_POLLING} from '../../src/action/board';
import {LOGIN_SUCCESS} from '../../src/action/login';
import {LOGIN_STATUS} from '../../src/const/login';
import {MY_DESTINATION_SAVE_COMPLETE} from '../../src/action/mydestination';
import {take,put,select,takeEvery,call} from 'redux-saga/effects';
import {getApiBaseURL} from  '../../src/module/environment';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();

/**@test {loadMemberStatusSaga}*/
describe("loadMemberStatusSaga",()=>{
  it("takes every LOGIN_SUCCESS,MY_DESTINATION_SAVE_COMPLETE and MEMBER_STATUS_POLLING and pass it to loadMemberStatusTask",()=>{
    const gen = loadMemberStatusSaga();
    let ret = gen.next();

    assert(ret.value, takeEvery(LOGIN_SUCCESS,loadMemberStatusTask));
    ret = gen.next();
    assert(ret.value, takeEvery(MY_DESTINATION_SAVE_COMPLETE,loadMemberStatusTask));
    ret = gen.next();
    assert(ret.value, takeEvery(MEMBER_STATUS_POLLING,loadMemberStatusTask));
    ret = gen.next();
    assert(ret.done);
  });
});

/**@test {loadMemberStatusTask}*/
describe("loadMemberStatusTask",()=>{
  it("gets all member status from server via API and puts UPDATE_MEMBER_STATUS action with the result",()=>{
    const dummyAPIResult = [
      {userid:"testA",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX"},
      {userid:"testB",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY"},
      {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:""},
      {userid:"testD",name:"Dさん",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ"}
    ];

    const dummyToken = "dummytoken";

    const dummyLogonUserId = "testC";

    const gen = loadMemberStatusTask();
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.token);
    ret = gen.next(dummyToken);//dummyTokenがstate上に保管されているものとする
    //gen calls yield select(state=> state.login.user.userid);
    ret = gen.next(dummyLogonUserId); //dummyLogonUserId("testC")がstate上に保管されているものとする

    assert.deepEqual(ret.value, call(axios,{
      method:"GET",
      url:BASE_API_URL + "status/all",
      headers: { "Authorization": "Bearer " + dummyToken}
    }));

    ret = gen.next({data:dummyAPIResult}); //dummyAPIResultがAPIから返ってきたものとする

    //ログインユーザーであるtestCのデータを先頭にしてUPDATE_MEMBER_STATUSをputする
    const expectedPayload = [
      {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:""},
      {userid:"testA",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX"},
      {userid:"testB",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY"},
      {userid:"testD",name:"Dさん",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ"}
    ];

    assert.deepEqual(ret.value, put(updateMemberStatus(expectedPayload)));

    ret = gen.next();
    assert(ret.done);
  });
});

/**@test {watchMemberStatusSaga}*/
describe("watchMemberStatusSaga",()=>{
  it("creates generator which never ends",()=>{
    const gen = watchMemberStatusSaga();
    let ret = gen.next();

    for(let i = 0;i < 100; i++){
      //gen calls yield select(state => state.login.status)
      ret = gen.next(LOGIN_STATUS.SUCCESS);
      //gem calls yield put(memberStatusPolling())
      ret = gen.next();
      //gen calls yield call(delay,STATUS_POLLING_DURATION_MS)
      //gen.next()ではdelayが発生してテストに時間がかかってしまうため、trueを注入する
      ret = gen.next(true);

      assert(!ret.done);
    }
  });

  it("puts MEMBER_STATUS_POLLING action if user has been logged in",()=>{
    const gen = watchMemberStatusSaga();
    let ret = gen.next();

    //gen calls yield select(state => state.login.status)
    ret = gen.next(LOGIN_STATUS.SUCCESS);

    assert.deepEqual(ret.value, put(memberStatusPolling()));
    ret = gen.next();

    //gen calls yield call(delay,STATUS_POLLING_DURATION_MS)
    //gen.next()ではdelayが発生してテストに時間がかかってしまうため、trueを注入する
    ret = gen.next(true);

    assert(!ret.done);
  });

  it("doesn't put any action if user hasn't been logged in",()=>{
    const gen = watchMemberStatusSaga();
    let ret = gen.next();

    //gen calls yield select(state => state.login.status)
    ret = gen.next(LOGIN_STATUS.NOTYET);

    assert.notDeepEqual(ret.value, put(memberStatusPolling()));

    //gen calls yield call(delay,STATUS_POLLING_DURATION_MS)
    //gen.next()ではdelayが発生してテストに時間がかかってしまうため、trueを注入する
    ret = gen.next(true);

    assert(!ret.done);
  });
});
