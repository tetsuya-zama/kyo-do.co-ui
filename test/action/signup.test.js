const assert = require("assert");
import {SIGNUP_REQUIRED,SIGNUP_SUCCESS,SIGNUP_FAILURE} from '../../src/action/signup';
import {signupRequired,signupSucceess,signupFailure} from '../../src/action/signup';
import {SIGNUP_FAILURE_REASONS} from '../../src/const/signup';

/**@test {signupRequired}*/
describe("signupRequired action creator",()=>{
  it("creates SIGNUP_REQUIRED action with form data which user input",()=>{
    const dummyFormData = {
      id:"test",
      password:"pass",
      name:"テスト"
    };

    const result = signupRequired(dummyFormData);
    assert(result.type == SIGNUP_REQUIRED);
    assert.deepEqual(result.payload,dummyFormData);
  });
});
/**@test {signupSucceess}*/
describe("signupSucceess action creator",()=>{
  it("creates SIGNUP_SUCCESS action with no arguments",()=>{
    const result = signupSucceess();

    assert(result.type == SIGNUP_SUCCESS);
  });
});
/**@test {signupFailure}*/
describe("signupFailure action creator",()=>{
  it("creates SIGNUP_FAILURE action with array of SIGNUP_FAILURE_REASONS",()=>{
    const dummyErrorReasons = [
      SIGNUP_FAILURE_REASONS.EMPTY_ID,
      SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD,
      SIGNUP_FAILURE_REASONS.EMPTY_NAME
    ];

    const result = signupFailure(dummyErrorReasons);

    assert(result.type == SIGNUP_FAILURE);
    assert.deepEqual(result.payload, dummyErrorReasons);
  });
});
