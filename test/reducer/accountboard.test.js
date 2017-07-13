import assert from 'power-assert';
import accountboard from '../../src/reducer/accountboard';
import {ACCOUNT_INFO_MODAL_OPEN,ACCOUNT_INFO_MODAL_CLOSE,CHANGE_ACCOUNT_INFO,CHANGE_ACCOUNT_INFO_FIELD} from '../../src/action/accountboard';

describe("accountboard reducer",()=>{
  it("turns open of accountboard state into true and change nextname into action's payload and clears nextpass if ACCOUNT_INFO_MODAL_OPEN action is passed",()=>{
    const initialState = {
      open : false,
      nextuser : {
        nextname:"test",
        nextpass:"test"
      }
    };

    const dummyAction = {
      type:ACCOUNT_INFO_MODAL_OPEN,
      payload:{
        name:"init"
      }
    };

    const result = accountboard(initialState,dummyAction);

    assert(result.open === true);
    assert(result.nextuser.nextname === "init");
    assert(result.nextuser.nextpass === null);
  });

  it("turns open of accountboard state into false and clears nextuser if ACCOUNT_INFO_MODAL_CLOSE action is passed",()=>{
    const initialState = {
      open : true,
      nextuser : {
        nextname:"test",
        nextpass:"test"
      }
    };

    const dummyAction = {
      type:ACCOUNT_INFO_MODAL_CLOSE,
    };

    const result = accountboard(initialState,dummyAction);

    assert(result.open === false);
    assert.deepEqual(result.nextuser, {});
  });

  it("turns open of accountboard state into false and clears nextuser if CHANGE_ACCOUNT_INFO action is passed",()=>{
    const initialState = {
      open : true,
      nextuser : {
        nextname:"test",
        nextpass:"test"
      }
    };

    const dummyAction = {
      type:CHANGE_ACCOUNT_INFO,
      payload:{
        nextname:"test",
        nextpass:"test"
      }
    };

    const result = accountboard(initialState,dummyAction);

    assert(result.open === false);
    assert.deepEqual(result.nextuser, {});
  });

  it("changes nextuser of accountboard state and turns open to true",()=>{
    const initialState = {
      open : false,
      nextuser : {
        nextname:"test",
        nextpass:"test"
      }
    };

    const dummyAction = {
      type:CHANGE_ACCOUNT_INFO_FIELD,
      payload:{
        nextname:"test2",
        nextpass:"test2"
      }
    };

    const result = accountboard(initialState,dummyAction);

    assert(result.nextuser.nextname === dummyAction.payload.nextname);
    assert(result.nextuser.nextpass === dummyAction.payload.nextpass);
    assert(result.open === true);
  });

  it("does nothing if any other action is passed",()=>{
    const initialState = {
      open : false,
      nextuser : {
        nextname:"test",
        nextpass:"test"
      }
    };

    const dummyAction = {
      type:"DUMMY_ACTION_NAME",
      payload:{
        nextname:"test2",
        nextpass:"test2"
      }
    };

    const result = accountboard(initialState,dummyAction);

    assert(result.nextuser.nextname === initialState.nextuser.nextname);
    assert(result.nextuser.nextpass === initialState.nextuser.nextpass);
    assert(result.open === initialState.open);
  });
});
