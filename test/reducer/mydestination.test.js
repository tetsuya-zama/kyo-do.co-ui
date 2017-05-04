import assert from 'power-assert';
import {MY_DESTINATION_CHANGE} from '../../src/action/mydestination';
import mydestination from '../../src/reducer/mydestination';

/**@test {mydestination}*/
describe("mydestination reducer",()=>{
  it("changes mydestination state into payload of the action if MY_DESTINATION_CHANGE action is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:""
    };

    const dummyAction = {
      type:MY_DESTINATION_CHANGE,
      payload:{
        inBusiness:true,
        comment:"",
        contact:"0X0-XXXX-XXXX"
      }
    };

    const result = mydestination(initialState,dummyAction);

    assert.deepEqual(result, dummyAction.payload);
  });

  it("doesn't make any changes if another action is passed",()=>{
    const initialState = {
      inBusiness:true,
      comment:"EAST 8F",
      contact:""
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
