import assert from 'power-assert';
import {MY_DESTINATION_CHANGE,MY_DESTINATION_SAVE_COMPLETE} from '../../src/action/mydestination';
import {myDestinationChange,myDestinationSaveComplete} from '../../src/action/mydestination';
import {DEFAULT_MY_DESTINATION} from '../../src/const/mydestination';

/**@test {myDestinationChange}*/
describe("myDestinationChange action creator",()=>{
  it("creates MY_DESTINATION_CHANGE action with inBusiness, comment and contact data which user input",()=>{
    const inputData = {
      inBusiness : true,
      comment : "EAST 3F",
      contact : "090-XXX-XXXX"
    };

    const result = myDestinationChange(inputData);

    assert(result.type === MY_DESTINATION_CHANGE);
    assert.deepEqual(result.payload,inputData);
  });
});

/**@test {myDestinationSaveComplete}*/
describe("myDestinationSaveComplete action creator", ()=>{
  it("creates MY_DESTINATION_SAVE_COMPLETE action with inBusiness, comment and contact data",()=>{
    const inputData = {
      inBusiness : true,
      comment : "EAST 3F",
      contact : "090-XXX-XXXX"
    };
    const result = myDestinationSaveComplete(inputData);

    assert(result.type === MY_DESTINATION_SAVE_COMPLETE);
    assert.deepEqual(result.payload,inputData)
  });
});
