import assert from "power-assert";
import {UPDATE_MEMBER_STATUS,MEMBER_STATUS_POLLING} from '../../src/action/board';
import {updateMemberStatus,memberStatusPolling} from '../../src/action/board';

/**@test {updateMemberStatus}*/
describe("updateMemberStatus action creator",()=>{
  it("creates UPDATE_MEMBER_STATUS action with all member status from API",()=>{
    const dummyMemberStatus = [
      {userid:"testA",name:"Aさん",inBusiness:true,comment:"自席",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testB",name:"Bさん",inBusiness:false,comment:"",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 10:00:00"}
    ];

    const result  = updateMemberStatus(dummyMemberStatus);

    assert(result.type === UPDATE_MEMBER_STATUS);
    assert.deepEqual(result.payload,dummyMemberStatus);
  });
});

/**@test {memberStatusPolling}*/
describe("memberStatusPolling action creator",()=>{
  it("creates MEMBER_STATUS_POLLING action creator with no arguments",()=>{
    const result = memberStatusPolling();

    assert(result.type === MEMBER_STATUS_POLLING);
  });
});
