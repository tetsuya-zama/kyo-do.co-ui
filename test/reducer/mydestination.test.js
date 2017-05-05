import assert from 'power-assert';
import {MY_DESTINATION_CHANGE} from '../../src/action/mydestination';
import mydestination from '../../src/reducer/mydestination';
import {SUGGESTION_CHANGE,SUGGESTION_CLEAR} from '../../src/action/suggestion';
import {DEFAULT_SUGGENSTIONS} from '../../src/const/suggestion';

/**@test {mydestination}*/
describe("mydestination reducer",()=>{
  it("changes mydestination state into payload of the action if MY_DESTINATION_CHANGE action is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:"",
      suggestion:DEFAULT_SUGGENSTIONS
    };

    const dummyAction = {
      type:MY_DESTINATION_CHANGE,
      payload:{
        inBusiness:false,
        comment:"",
        contact:"0X0-XXXX-XXXX"
      }
    };

    const result = mydestination(initialState,dummyAction);

    assert(result.inBusiness === dummyAction.payload.inBusiness);
    assert(result.comment === dummyAction.payload.comment);
    assert(result.contact === dummyAction.payload.contact);
    assert.deepEqual(result.suggestion,initialState.suggestion);
  });

  it("changes suggestion of mydestination state into payload of the action if SUGGESTION_CHANGE action is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:"",
      suggestion:DEFAULT_SUGGENSTIONS
    };

    const dummyAction = {
      type:SUGGESTION_CHANGE,
      payload:["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"]
    };

    const result = mydestination(initialState,dummyAction);

    assert(result.inBusiness === initialState.inBusiness);
    assert(result.comment === initialState.comment);
    assert(result.contact === initialState.contact);
    assert.deepEqual(result.suggestion,dummyAction.payload);
  });

  it("changes suggestion of mydestination state into DEFAULT_SUGGENSTIONS if SUGGESTION_CLEAR is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:"",
      suggestion:["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"]
    };

    const dummyAction = {
      type:SUGGESTION_CLEAR
    };

    const result = mydestination(initialState,dummyAction);

    assert(result.inBusiness === initialState.inBusiness);
    assert(result.comment === initialState.comment);
    assert(result.contact === initialState.contact);
    assert.deepEqual(result.suggestion,DEFAULT_SUGGENSTIONS);
  });

  it("doesn't make any changes if another action is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:"",
      suggestion:DEFAULT_SUGGENSTIONS
    };

    const dummyAction = {
      type:"DUMMY_ACTION_NAME",
      payload:{
        inBusiness:true,
        comment:"",
        contact:"0X0-XXXX-XXXX"
      }
    };

    const result = mydestination(initialState,dummyAction);

    assert.deepEqual(result, initialState);
  });
});
