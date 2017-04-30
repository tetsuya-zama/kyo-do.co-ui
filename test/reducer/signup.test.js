const assert = require("assert");
import {SIGNUP_SUCCESS,SIGNUP_FAILURE} from '../../src/action/signup';
import {SIGNUP_FAILURE_REASONS} from '../../src/const/signup';
import signup from '../../src/reducer/signup';

/**@test {signup} */
describe("signup reducer",()=>{
  it("changes failure_reason state to empty array if SIGNUP_SUCCESS action is passed",()=>{
    const action = {type:SIGNUP_SUCCESS};
    const dummyInitialState = {failure_reason:[
      SIGNUP_FAILURE_REASONS.INVALID_CONFIRM,
      SIGNUP_FAILURE_REASONS.POLICY_PASSWORD,
      SIGNUP_FAILURE_REASONS.EMPTY_NAME
    ]};

    const result = signup(dummyInitialState,action);
    assert(result.failure_reason.length == 0);
  });
  it("changes failure_reason state to payload of the action if SIGNUP_FAILURE action is passed",()=>{
    const action = {
      type:SIGNUP_FAILURE,
      payload:[
        SIGNUP_FAILURE_REASONS.INVALID_CONFIRM,
        SIGNUP_FAILURE_REASONS.POLICY_PASSWORD,
        SIGNUP_FAILURE_REASONS.EMPTY_NAME
      ]
    };

    const dummyInitialState = {failure_reason:[]};

    const result = signup(dummyInitialState,action);
    assert.deepEqual(result.failure_reason, action.payload);
  });
});
