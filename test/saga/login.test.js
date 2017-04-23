const assert = require("assert");
import {loginSaga,loginTask,logoutSaga,loginFailureSaga,cleanRememberMeTask,loginFromRememberMeSaga} from '../../src/saga/login';
import {LOGIN_REQUESTED,LOGOUT_REQUESTED,LOGIN_FAILURE,loginRequested,loginSuccess,loginFailure} from '../../src/action/login';
import {take,takeEvery,fork,call,put} from 'redux-saga/effects';
import {getApiBaseURL} from  '../../src/module/environment';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();

describe("login Saga",()=>{
  //すべてのLOGIN_REQUESTEDを受け取り、loginTaskに受け渡す
  it("takes every LOGIN_REQUESTED action and pass it to loginTask",()=>{
    const gen = loginSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(LOGIN_REQUESTED,loginTask));
  });
});

describe("login Task",()=>{
  //ログインが成功した場合、LOGIN_SUCCESSアクションをputする
  it("puts LOGIN_SUCCESS action if the server returns login success",()=>{
    const testAction = {
      type:LOGIN_REQUESTED,
      payload:{
        id:"test",
        pass:"test"
      }
    };

    const mockTokenReturn = {
      token:"mockToken"
    };

    const mockUserDataReturn = {
      id:"test",
      name:"テスト"
    };

    const gen = loginTask(testAction);
    let rtn = gen.next();

    rtn = gen.next(true);//localStorageへの保存は成功したものとする
    //与えたActionのpayloadを使用してAPIへアクセスする
    assert.deepEqual(rtn.value,call(axios.post,
      BASE_API_URL + "auth",
      {
        userid:testAction.payload.id,
        password:testAction.payload.pass
      }
    ));

    rtn = gen.next({data:mockTokenReturn});//mockTokenReturnがAPIから返ってきたものとする
    //mockTokenReturnで返ってきたtokenを使ってuser APIへアクセスする
    assert.deepEqual(rtn.value, call(axios,{
      method:"GET",
      url:BASE_API_URL + "user",
      headers:{"Authorization":"Bearer " + mockTokenReturn.token}
    }));

    rtn = gen.next({data:mockUserDataReturn});//APIからmockUserDataReturnが返ってきたものとする
    //APIからの戻り値を使用して、LOGIN_SUCCESSアクションを作成してPUTする
    assert.deepEqual(rtn.value, put(loginSuccess({
      userid:mockUserDataReturn.id,
      name:mockUserDataReturn.name,
      token:mockTokenReturn.token
    })));

    rtn = gen.next();
    assert(rtn.done);

  });
  //ログインに失敗した場合はLOGIN_FAILUREアクションをPUTする
  it("puts LOGIN_FAILURE action if the server returns login failure",()=>{
    const testAction = {
      type:LOGIN_REQUESTED,
      payload:{
        id:"test",
        pass:"invalid_pass"
      }
    };

    const gen = loginTask(testAction);
    let rtn = gen.next();

    rtn = gen.next(true);//localStorageへの保存は成功したものとする
    //与えたActionのpayloadを使用してAPIへアクセスする
    assert.deepEqual(rtn.value,call(axios.post,
      BASE_API_URL + "auth",
      {
        userid:testAction.payload.id,
        password:testAction.payload.pass
      }
    ));

    rtn = gen.throw(new Error("API returns not 200 STATUS CODE"));
    assert.deepEqual(rtn.value, put(loginFailure()));

    rtn = gen.next();
    assert(rtn.done);
  });
  //rememberMeデータの保存に失敗しても処理を続ける
  it("proceeds processing even if rememberMe function is not available.",()=>{
    const testAction = {
      type:LOGIN_REQUESTED,
      payload:{
        id:"test",
        pass:"test"
      }
    };

    const mockTokenReturn = {
      token:"mockToken"
    };

    const mockUserDataReturn = {
      id:"test",
      name:"テスト"
    };

    const gen = loginTask(testAction);
    let rtn = gen.next();

    rtn = gen.next(false);//localStorageへの保存が失敗
    assert(!rtn.done); //処理が止まっていない
    //与えたActionのpayloadを使用してAPIへアクセスする
    assert.deepEqual(rtn.value,call(axios.post,
      BASE_API_URL + "auth",
      {
        userid:testAction.payload.id,
        password:testAction.payload.pass
      }
    ));
  });
});

describe("logout Saga",()=>{
  //すべてのLOGOUT_REQUESTEDアクションを受け取って、cleanRememberMeTaskに引き渡す
  it("takes every LOGOUT_REQUESTED action and pass it to cleanRememberMeTask",()=>{
    const gen = logoutSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(LOGOUT_REQUESTED,cleanRememberMeTask));
  });
});

describe("loginFailure Saga",()=>{
  //すべてのLOGIN_FAILUREアクションを受け取って、cleanRememberMeTaskに引き渡す
  it("takes every LOGIN_FAILURE action and pass it to cleanRememberMeTask",()=>{
    const gen = loginFailureSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(LOGIN_FAILURE,cleanRememberMeTask));
  });
});

describe("cleanRememberMe Task",()=>{
  //RememberMe用のデータを削除しようとする
  it("tries to clean RememberMe data",()=>{
    const gen = cleanRememberMeTask();
    let ret = gen.next();

    ret = gen.next(true);//localStorageへのアクセスは成功したとする
    assert(ret.done);
  })
});

describe("loginFromRememberMe Saga",()=>{
  //rememberMeのデータが有効である場合、LOGIN_REQUESTEDアクションをputする
  it("puts LOGIN_REQUESTED action if rememberMe data is available",()=>{
    const mockRememberMe = {
      id:"test",
      pass:"test"
    };
    const gen = loginFromRememberMeSaga();
    let ret = gen.next();

    ret = gen.next(true);//localStorage上にrememberMeデータがあるものとする
    ret = gen.next(mockRememberMe)//mockRememberMeがストレージ上から取得できたものとする
    assert.deepEqual(ret.value,put(loginRequested(mockRememberMe.id,mockRememberMe.pass)));
    ret = gen.next();
    assert(ret.done);
  });
  //rememberMeのデータがない場合、アクションをputしない
  it("doesn't put any actions if rememberMe is not available",()=>{
    const gen = loginFromRememberMeSaga();
    let ret = gen.next();

    ret = gen.next(false);
    assert(ret.done);
  });
});
