import assert from 'power-assert';
import {OPEN_NOTICE,CLOSE_NOTICE} from '../../src/action/notice';
import notice from '../../src/reducer/notice';

/**@test {notice}*/
describe("notice reducer",()=>{
    it("changes notice state into payload of the action if OPEN_NOTICE action is passed",()=>{
        const dummyState = {open:false, message:""};
        const dummyAction = {
          type:OPEN_NOTICE,
          payload:{
              message: "Dummy Message"
            }
        };
        const result = notice(dummyState,dummyAction);

    assert(result.open === true);
    assert(result.message === dummyAction.payload.message);
  });
  it("changes notice state into payload of the action if OPEN_NOTICE action is passed even if state has been set",()=>{
        const dummyState = {open:open, message:"Old message"};
        const dummyAction = {
          type:OPEN_NOTICE,
          payload:{
              message: "Dummy Message"
            }
        };
        const result = notice(dummyState,dummyAction);

    assert(result.open === true);
    assert(result.message === dummyAction.payload.message);
  });
  it("changes notice state into payload of the action if CLOSE_NOTICE action is passed",()=>{
        const dummyState = {open:false, message:""};
        const dummyAction = {
          type:CLOSE_NOTICE
        };
        const result = notice(dummyState,dummyAction);

    assert(result.open === false);
    assert(result.message === "");
  });
});