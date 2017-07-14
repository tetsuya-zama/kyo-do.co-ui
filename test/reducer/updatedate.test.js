import assert from 'power-assert';
import updatedate from '../../src/reducer/updatedate';
import {setUpdateDate} from '../../src/action/updatedate';

/*@test {updatedate}*/
describe("updatedate reducer",()=>{
  it("updates date state to action's payload if SET_UPDATE_DATE is passed",()=>{
    const dummyCurrentState = {
      date: null
    };
    const dummyCurrentDate = new Date();
    const dummyAction = setUpdateDate(dummyCurrentDate);

    const result = updatedate(dummyCurrentState,dummyAction);

    assert(result.date === dummyCurrentDate);

  });
  it("updates date state to action's payload if SET_UPDATE_DATE is passed even if date has been already set",()=>{
    const dummyCurrentState = {
      date:new Date(2016,1,1)
    };
    const dummyCurrentDate = new Date();
    const dummyAction = setUpdateDate(dummyCurrentDate);

    const result = updatedate(dummyCurrentState,dummyAction);

    assert(result.date === dummyCurrentDate);
  });
});
