import assert from 'power-assert';
import board from '../../src/reducer/board';
import {UPDATE_MEMBER_STATUS} from '../../src/action/board';

/**@test {board}*/
describe("board reducer",()=>{
  it("changes memberStatus of board state into payload of the action if UPDATE_MEMBER_STATUS action is passed",()=>{
    const initialState = {
      memberStatus:[
        {userid:"testA",name:"Aさん",inBusiness:true,comment:"自席",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 09:00:00"},
        {userid:"testB",name:"Bさん",inBusiness:false,comment:"",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 09:00:00"},
        {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 09:00:00"}
      ]
    };

    const dummyAction = {
      type:UPDATE_MEMBER_STATUS,
      payload:[
        {userid:"testA",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
        {userid:"testB",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"},
        {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 10:00:00"},
        {userid:"testD",name:"Dさん",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ",lastUpdate:"2017/05/01 10:00:00"}
      ]
    };

    const result = board(initialState,dummyAction);

    assert.deepEqual(result.memberStatus,dummyAction.payload);
  });

  it("does nothing if any other action is passed",()=>{
    const initialState = {
      memberStatus:[
        {userid:"testA",name:"Aさん",inBusiness:true,comment:"自席",contact:"090-XXX-XXXX"},
        {userid:"testB",name:"Bさん",inBusiness:false,comment:"",contact:"090-YYY-YYYY"},
        {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:""}
      ]
    };

    const dummyAction = {
      type:"DUMMY_ACTION_NAME",
    };

    const result = board(initialState,dummyAction);

    assert.deepEqual(result,initialState);
  });
});
