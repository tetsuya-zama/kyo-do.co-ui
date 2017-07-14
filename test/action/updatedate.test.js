import assert from 'power-assert';
import {SET_UPDATE_DATE,setUpdateDate} from '../../src/action/updatedate';

/*@test {setUpdateDate}*/
describe("setUpdateDate action creator",()=>{
  it("creates SET_UPDATE_DATE action with current date time",()=>{
    const dummyCurrentDate = new Date();

    const result = setUpdateDate(dummyCurrentDate);
    assert(result.type === SET_UPDATE_DATE);
    assert(result.payload.currentDate === dummyCurrentDate);
  });
});
