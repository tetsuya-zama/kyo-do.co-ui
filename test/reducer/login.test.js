import assert from 'power-assert';
import {LOGIN_REQUESTED,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_REQUESTED} from "../../src/action/login";
import {LOGIN_STATUS} from "../../src/const/login"
import login from "../../src/reducer/login"

const dummyUserData = {userid:"mike",name:"Mike",token:"dummy"};
/**@test {login}*/
describe("login reducer",()=>{
  //LOGIN_SUCCESSアクションが渡された場合、'status'をLOGIN_STATUS.SUCCESSに変更し、'user'をactionのpayloadに変更する
  it("changes 'status' state to LOGIN_STATUS.SUCCESS and changes 'user' state to payload of action if LOGIN_SUCCESS action is passed",()=>{
    const action = {
      type:LOGIN_SUCCESS,
      payload:dummyUserData
    };

    const initialState = {status:LOGIN_STATUS.NOTYET,user:{}};

    const result = login(initialState,action);
    assert(result.status === LOGIN_STATUS.SUCCESS);
    assert(result.user === action.payload);
  });
  //LOGIN_FAILUREアクションが渡された場合、'status'をLOGIN_STATUS.FAILUREに変更し、'user'は空オブジェクトとなる
  it("changes 'status' state to LOGIN_STATUS.FAILURE and changes 'user' state to empty object if LOGIN_FAILURE action is passed",()=>{
    const action = {type:LOGIN_FAILURE};

    const initialState = {status:LOGIN_STATUS.NOTYET,user:{}};

    const result = login(initialState,action);
    assert(result.status === LOGIN_STATUS.FAILURE);
    assert(Object.keys(result.user).length === 0);
  });
  //LOGOUT_REQUESTEDアクションが渡された場合、'status'をLOGIN_STATUS.NOTYETに変更し、'user'は空オブジェクトとなる
  it("changes 'status' state to LOGIN_STATUS.NOTYET and changes 'user' state to empty object if LOGOUT_REQUESTED action is passed",()=>{
    const action = {type:LOGOUT_REQUESTED};

    const initialState = {status:LOGIN_STATUS.SUCCESS,user:dummyUserData};

    const result = login(initialState,action);
    assert(result.status === LOGIN_STATUS.NOTYET);
    assert(Object.keys(result.user).length === 0);
  });
  //LOGIN_REQUESTEDアクションが渡された場合、'status'をLOGIN_STATUS.NOTYETに変更し、'user'は空オブジェクトとなる
  it("changes 'status' state to LOGIN_STATUS.NOTYET and changes 'user' state to empty object if LOGIN_REQUESTED action",()=>{
    const action = {type:LOGIN_REQUESTED};

    const initialState = {status:LOGIN_STATUS.FAILURE,user:{}};

    const result = login(initialState,action);
    assert(result.status === LOGIN_STATUS.NOTYET);
    assert(Object.keys(result.user).length === 0);
  });
  //その他のアクションが渡された場合はstateを変更しない
  it("doesn't change any state if any other action is passed",()=>{
    const action = {type:"OTHER_ACTION"};

    const initialState = {status:LOGIN_STATUS.SUCCESS,user:dummyUserData};

    const result = login(initialState,action);
    assert(result.status === initialState.status);
    assert(result.user === initialState.user);
  });
});
