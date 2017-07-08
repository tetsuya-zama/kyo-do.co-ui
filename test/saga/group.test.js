import assert from "power-assert";
import {groupSaga,loadUserGroupsSaga,loadUserGroupsTask,fetchMemberTask} from '../../src/saga/group';
import {groupsLoaded,groupMemberLoaded} from '../../src/action/group';
import {UPDATE_MEMBER_STATUS} from '../../src/action/board';
import {take,put,select,takeEvery,call,fork} from 'redux-saga/effects';
import {getApiBaseURL} from  '../../src/module/environment';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();

/**@test {groupSaga}*/
describe("groupSaga",()=>{
  it("forks loadUserGroupsSaga",()=>{
    const gen = groupSaga();

    let ret = gen.next();
    assert.deepEqual(ret.value,fork(loadUserGroupsSaga));
  });
});

/**@test {loadUserGroupsSaga} */
describe("loadUserGroupsSaga",()=>{
  it("takes every UPDATE_MEMBER_STATUS action and pass it to loadUserGroupsTask",()=>{
    const gen = loadUserGroupsSaga();

    let ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(UPDATE_MEMBER_STATUS,loadUserGroupsTask));
  });
});

/**@test {loadUserGroupsTask} */
describe("loadUserGroupsTask",()=>{
  it("puts GROUPS_LOADED action with API Result and calls fetchMemberTask for each groups",()=>{
    const dummyToken = "dummyToken";
    const dummyLogonUserId = "userid1";
    const dummyAPIResult = {
      data:[
        {
          "id": "g0001",
          "name": "groupname1",
          "admin": [
            "userid1",
            "userid2"
          ]
        },
        {
          "id": "g0002",
          "name": "groupname2",
          "admin": [
            "userid3"
          ]
        }
      ]
    };

    const gen = loadUserGroupsTask();

    let ret = gen.next();

    ret = gen.next(dummyToken);

    ret = gen.next(dummyLogonUserId);
    assert.deepEqual(ret.value,call(axios,{
      method:"GET",
      url:BASE_API_URL + "group",
      headers: { "Authorization": "Bearer " + dummyToken}
    }));

    ret = gen.next(dummyAPIResult);
    assert.deepEqual(ret.value, put(groupsLoaded(dummyAPIResult.data)));

    ret = gen.next();
    assert.deepEqual(ret.value, dummyAPIResult.data.map(group => call(fetchMemberTask,group,dummyToken,dummyLogonUserId)));

    ret = gen.next();
    assert(ret.done);
  });
});

/**@test {fetchMemberTask} */
describe("fetchMemberTask",()=>{
  it("puts GROUP_MEMBER_LOADED action with API Result",()=>{
    const dummyToken = "dummyToken";
    const dummyLogonUserId = "userid1";
    const dummyGroup = {
      "id": "g0001",
      "name": "groupname1",
      "admin": [
        "userid1",
        "userid2"
      ]
    };
    const dummyAPIResult = {
      data:{
        "members": [
          "userid1",
          "userid2"
        ]
      }
    };
    const dummyMemberStatus = [
      {userid:"userid1",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"userid2",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"}
    ];

    const gen = fetchMemberTask(dummyGroup,dummyToken,dummyLogonUserId);

    let ret = gen.next();
    assert.deepEqual(ret.value,call(axios,{
      method:"GET",
      url:BASE_API_URL + "group/" + dummyGroup.id + "/member",
      headers: { "Authorization": "Bearer " + dummyToken}
    }));

    ret = gen.next(dummyAPIResult);

    ret = gen.next(dummyMemberStatus);
    assert.deepEqual(ret.value, put(groupMemberLoaded(Object.assign({},dummyGroup,{member:dummyMemberStatus}),dummyLogonUserId)))

    ret = gen.next();
    assert(ret.done);
  });
});
