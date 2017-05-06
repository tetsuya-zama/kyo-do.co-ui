import assert from 'power-assert';
import {changeAccountInfoSaga,changeAccountInfoTask} from '../../src/saga/accountboard';
import {loginSuccess} from '../../src/action/login';
import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects';
import {CHANGE_ACCOUNT_INFO} from '../../src/action/accountboard';
import {getApiBaseURL} from  '../../src/module/environment';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();

/**@test {changeAccountInfoSaga}*/
describe("changeAccountInfoSaga",()=>{
  it("takes every CHANGE_ACCOUNT_INFO action and pass it to changeAccountInfoTask",()=>{
    const gen = changeAccountInfoSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value,takeEvery(CHANGE_ACCOUNT_INFO,changeAccountInfoTask));
  });
});

/**@test {changeAccountInfoTask}*/
describe("changeAccountInfoTask",()=>{
  it("sends changes in payload of CHANGE_ACCOUNT_INFO and puts LOGIN_SUCCESS action again",()=>{
    const dummyAction = {
      type:CHANGE_ACCOUNT_INFO,
      payload:{
        nextname:"テスト",
        nextpass:"1q2w3e4r"
      }
    };

    const dummyUserId = "test";
    const dummyToken = "dummy_token";

    const dummyAPIResponse = {
      data:{
        userid:"test",
        name:"テスト"
      }
    }

    const gen = changeAccountInfoTask(dummyAction);
    let ret = gen.next();

    //gen calls const token = yield select(state => state.login.user.token);
    ret = gen.next(dummyToken); //dummyTokenがstateに格納されているものとする

    assert(ret.value, call(axios, {
      method:"PUT",
      url:BASE_API_URL + "user",
      headers:{"Authorization":"Bearer " + dummyAction},
      data: {
        name:dummyAction.payload.nextname,
        newPassword:dummyAction.payload.nextpass
      }
    }));

    ret = gen.next(dummyAPIResponse); //dummyAPIResultが返ってきたものとする

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next(dummyUserId); //dummyUserIdがstateに格納されているものとする

    assert.deepEqual(ret.value, put(loginSuccess({
      userid:dummyUserId,
      name:dummyAction.payload.nextname,
      token:dummyToken})));

    ret = gen.next();
    assert(ret.done);
  });
})
