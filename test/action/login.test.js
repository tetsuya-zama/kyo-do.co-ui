import assert from 'power-assert';
import {LOGIN_REQUESTED,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_REQUESTED} from "../../src/action/login";
import {loginRequested,loginSuccess,loginFailure,logoutRequested} from "../../src/action/login";

/**@test {loginRequested}*/
describe("loginRequested action creator",()=>{
  //ユーザーが入力したID,Passを使ってLOGIN_REQUESTEDアクションを生成する
  it("creates LOGIN_REQUESTED action with id and password which user input",()=>{
    const testId = "test_id";
    const testPass = "test_pass";

    const result = loginRequested(testId,testPass);
    assert(result.type === LOGIN_REQUESTED);
    assert(result.payload.id === testId);
    assert(result.payload.pass === testPass);
  });
});

/**@test {loginSuccess}*/
describe("loginSuccess action creator",()=>{
  //ログインしたユーザーの情報を使ってLOGIN_SUCCESSアクションを生成する
  it("creates LOGIN_SUCCESS action with user data of logon user.",()=>{
    const userinfo = {"name":"Mike","userid":"mike","token":"dummy"};

    const result = loginSuccess(userinfo);
    assert(result.type === LOGIN_SUCCESS);
    assert(result.payload.name === userinfo.name);
    assert(result.payload.userid === userinfo.userid);
    assert(result.payload.token === userinfo.token);
  });
});

/**@test {loginFailure}*/
describe("loginFailure action creator",()=>{
  //引数を取らずにLOGIN_FAILUREアクションを生成する
  it("creates LOGIN_FAILURE action with no arguments",()=>{
    const result = loginFailure();
    assert(result.type === LOGIN_FAILURE);
  });
});

/**@test {logoutRequested}*/
describe("logoutRequested action creator",()=>{
  //引数を取らずにLOGOUT_REQUESTEDアクションを生成する
  it("creates LOGOUT_REQUESTED action with no arguments",()=>{
    const result = logoutRequested();
    assert(result.type === LOGOUT_REQUESTED);
  });
});
