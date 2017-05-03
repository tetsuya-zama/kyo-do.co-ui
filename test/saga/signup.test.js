import assert from 'power-assert';
import {signupSaga,signupTask} from '../../src/saga/signup';
import {put,call,takeEvery} from 'redux-saga/effects';
import {getApiBaseURL} from '../../src/module/environment';
import {SIGNUP_REQUIRED,signupSucceess,signupFailure} from '../../src/action/signup';
import {SIGNUP_FAILURE_REASONS} from '../../src/const/signup'
import {loginRequested} from '../../src/action/login';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();
/**@test {signupSaga}*/
describe("signup Saga",()=>{
  //常にSIGNUP_REQUIREDを受け付けて、signupTaskに引き渡す
  it("takes every SIGNUP_REQUIRED action and pass it to signupTask",()=>{
    const gen = signupSaga();
    let ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(SIGNUP_REQUIRED,signupTask));
  });
});
/**@test {signupTask} */
describe("signup Task",()=>{
  //サーバからサインアップ成功が返って来れば、SIGNUP_SUCCESSアクションとLOGIN_REQUESTEDアクションをputする
  it("puts SIGNUP_SUCCESS and LOGIN_REQUESTED action if server returns signup success",()=>{
    const testAction = {
      type:SIGNUP_REQUIRED,
      payload:{
        id:"test",
        password:"test",
        name:"テスト"
      }
    };

    const gen = signupTask(testAction);
    let ret = gen.next();

    assert.deepEqual(ret.value, call(axios.post,BASE_API_URL + "user",{
      userid:testAction.payload.id,
      password:testAction.payload.password,
      name:testAction.payload.name}));

    ret = gen.next({result:"success"});//SignUPに成功したものとする

    assert.deepEqual(ret.value, put(signupSucceess()));
    ret = gen.next();

    assert.deepEqual(ret.value, put(loginRequested(testAction.payload.id,testAction.payload.password)));
    ret = gen.next();

    assert(ret.done);

  });
  it("puts SIGNUP_FAILURE action if server returns signup failure",()=>{
    const testAction = {
      type:SIGNUP_REQUIRED,
      payload:{
        id:"test",
        password:"test",
        name:"テスト"
      }
    };

    const gen = signupTask(testAction);
    let ret = gen.next();

    assert.deepEqual(ret.value, call(axios.post,BASE_API_URL + "user",{
      userid:testAction.payload.id,
      password:testAction.payload.password,
      name:testAction.payload.name}));

    ret = gen.throw(new Error("Server doesn't return 200 OK STATUS CODE"));//SignUPに失敗したものとする
    //XXX　エラーが起きればID重複と判断しているが、サーバエラーと区別したい
    assert.deepEqual(ret.value, put(signupFailure([SIGNUP_FAILURE_REASONS.ID_DUPLICATED])));

    ret = gen.next();
    assert(ret.done);
  });
});
