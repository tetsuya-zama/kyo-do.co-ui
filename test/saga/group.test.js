import assert from "power-assert";
import {
  groupSaga,
  loadUserGroupsSaga,
  loadUserGroupsTask,
  fetchMemberTask,
  createGroupSaga,
  createGroupTask,
  addMemberToGroupSaga,
  addMemberToGroupTask,
  deleteMemberFromGroupSaga,
  deleteMemberFromGroupTask,
  setMemberAsGroupAdminSaga,
  setMemberAsGroupAdminTask,
  unsetMemberAsGroupAdminSaga,
  unsetMemberAsGroupAdminTask,
  changeGroupNameSaga,
  changeGroupNameTask,
  deleteGroupSaga,
  deleteGroupTask
} from '../../src/saga/group';
import {
  groupsLoaded,
  groupMemberLoaded,
  createGroupRequired,
  createGroupSuccess,
  createGroupFailure,
  addMemberToGroupRequired,
  addMemberToGroupSuccess,
  addMemberToGroupFailure,
  deleteMemberFromGroupRequired,
  deleteMemberFromGroupSuccess,
  deleteMemberFromGroupFailure,
  setMemberAsGroupAdminRequired,
  setMemberAsGroupAdminSuccess,
  setMemberAsGroupAdminFailure,
  unsetMemberAsGroupAdminRequired,
  unsetMemberAsGroupAdminSuccess,
  unsetMemberAsGroupAdminFailure,
  changeGroupNameRequired,
  changeGroupNameSuccess,
  changeGroupNameFailure,
  deleteGroupRequired,
  deleteGroupSuccess,
  deleteGroupFailure
} from '../../src/action/group';
import {UPDATE_MEMBER_STATUS} from '../../src/action/board';
import {
  CREATE_GROUP_REQUIRED,
  CREATE_GROUP_SUCCESS,
  ADD_MEMBER_TO_GROUP_REQUIRED,
  ADD_MEMBER_TO_GROUP_SUCCESS,
  DELETE_MEMBER_FROM_GROUP_REQUIRED,
  DELETE_MEMBER_FROM_GROUP_SUCCESS,
  SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  SET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  CHANGE_GROUP_NAME_REQUIRED,
  CHANGE_GROUP_NAME_SUCCESS,
  DELETE_GROUP_REQUIRED,
  DELETE_GROUP_SUCCESS
} from '../../src/action/group';
import {take,put,select,takeEvery,call,fork} from 'redux-saga/effects';
import {getApiBaseURL} from  '../../src/module/environment';
import axios from "axios";

const BASE_API_URL = getApiBaseURL();

/**@test {groupSaga}*/
describe("groupSaga",()=>{
  it("forks every group related sagas",()=>{
    const gen = groupSaga();

    let ret = gen.next();
    assert.deepEqual(ret.value,fork(loadUserGroupsSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(createGroupSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(addMemberToGroupSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(deleteMemberFromGroupSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(setMemberAsGroupAdminSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(unsetMemberAsGroupAdminSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(changeGroupNameSaga));
    ret = gen.next();
    assert.deepEqual(ret.value,fork(deleteGroupSaga));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {loadUserGroupsSaga} */
describe("loadUserGroupsSaga",()=>{
  it("takes every UPDATE_MEMBER_STATUS action and XXX_SUCCESS actions and pass it to loadUserGroupsTask",()=>{
    const gen = loadUserGroupsSaga();

    let ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(UPDATE_MEMBER_STATUS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(CREATE_GROUP_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(ADD_MEMBER_TO_GROUP_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(DELETE_MEMBER_FROM_GROUP_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(SET_MEMBER_AS_GROUP_ADMIN_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(CHANGE_GROUP_NAME_SUCCESS,loadUserGroupsTask));
    ret = gen.next();
    assert.deepEqual(ret.value, takeEvery(DELETE_GROUP_SUCCESS,loadUserGroupsTask));
    ret = gen.next();

    assert(ret.done);
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
          "groupname": "groupname1",
          "admin": [
            "userid1",
            "userid2"
          ]
        },
        {
          "id": "g0002",
          "groupname": "groupname2",
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
    assert.deepEqual(ret.value, put(groupsLoaded(dummyAPIResult.data,dummyLogonUserId)));

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
      "groupname": "groupname1",
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

/**@test {createGroupSaga} */
describe("createGroupSaga",()=>{
  it("takes every CREATE_GROUP_REQUIRED action and pass it to createGroupTask",()=>{
    const gen = createGroupSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value, takeEvery(CREATE_GROUP_REQUIRED,createGroupTask));

    ret = gen.next();
    assert(ret.done);
  });
});

/**@test {createGroupTask} */
describe("createGroupTask",()=>{
  it("puts CREATE_GROUP_SUCCESS action if server side api returns success",()=>{
    const dummyGroupName = "test group name";
    const dummyAction = createGroupRequired(dummyGroupName);

    const dummyToken = "dummytoken";

    const gen = createGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    assert.deepEqual(ret.value,call(
      axios.post,
      BASE_API_URL + "group",
      {"groupname": dummyGroupName},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next({
      data:{
        "message": "ok",
        "groupId": "g0001"
      }
    });

    assert.deepEqual(ret.value,put(createGroupSuccess("g0001")));

    ret = gen.next();

    assert(ret.done);
  });

  it("puts CREATE_GROUP_FAILURE action if server side api returns failure",()=>{
    const dummyGroupName = "test group name";
    const dummyAction = createGroupRequired(dummyGroupName);

    const dummyToken = "dummytoken";

    const gen = createGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    assert.deepEqual(ret.value,call(
      axios.post,
      BASE_API_URL + "group",
      {"groupname": dummyGroupName},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify({
      "message": "user post is faild"
    })));

    assert.deepEqual(ret.value,put(createGroupFailure()));

    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {addMemberToGroupSaga}*/
describe("addMemberToGroupSaga",()=>{
  it("takes every ADD_MEMBER_TO_GROUP_REQUIRED action and pass it to addMemberToGroupTask",()=>{
    const gen = addMemberToGroupSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value, takeEvery(ADD_MEMBER_TO_GROUP_REQUIRED,addMemberToGroupTask));

    ret = gen.next();
    assert(ret.done);
  });
});

/**
* グループ編集に関するテストの共用テストデータ
*/
const DUMMY_CURRENT_GROUPS = [
  {
    "id": "g0001",
    "groupname": "groupname1",
    "admin": [
      "testA",
      "testB"
    ],
    "member":[
      {userid:"testA",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testB",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"}
    ]
  },
  {
    "id": "g0002",
    "groupname": "groupname2",
    "admin": [
      "testC"
    ],
    "member":[
      {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testD",name:"Dさん",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ",lastUpdate:"2017/05/01 10:00:00"}
    ]
  }
];

/**@test {addMemberToGroupTask}*/
describe("addMemberToGroupTask",()=>{
  it("puts ADD_MEMBER_TO_GROUP_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyTargetMemberId = "testC";
    const dummyAction = addMemberToGroupRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = addMemberToGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId + "/member",
      {"member": [
        "testA",
        "testB",
        dummyTargetMemberId
      ]},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next(JSON.stringify(
      {
        "message": "ok"
      }
    ));

    assert.deepEqual(ret.value,put(addMemberToGroupSuccess()));
  });

  it("puts ADD_MEMBER_TO_GROUP_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyTargetMemberId = "testC";
    const dummyAction = addMemberToGroupRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = addMemberToGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId + "/member",
      {"member": [
        "testA",
        "testB",
        dummyTargetMemberId
      ]},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify(
      {
        "message": "invalid token"
      }
    )));

    assert.deepEqual(ret.value,put(addMemberToGroupFailure()));
  });
});

/**@test {deleteMemberFromGroupSaga}*/
describe("deleteMemberFromGroupSaga",()=>{
  it("takes every DELETE_MEMBER_FROM_GROUP_REQUIRED action and pass it to deleteMemberFromGroupTask",()=>{
    const gen = deleteMemberFromGroupSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value,takeEvery(DELETE_MEMBER_FROM_GROUP_REQUIRED,deleteMemberFromGroupTask));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {deleteMemberFromGroupTask}*/
describe("deleteMemberFromGroupTask",()=>{
  it("puts DELETE_MEMBER_FROM_GROUP_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0002";
    const dummyTargetMemberId = "testD";
    const dummyAction = deleteMemberFromGroupRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = deleteMemberFromGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId + "/member",
      {"member": ["testC"]},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next(JSON.stringify(
      {
        "message":"ok"
      }
    ));

    assert.deepEqual(ret.value,put(deleteMemberFromGroupSuccess()));
    ret = gen.next();

    assert(ret.done);
  });
  it("puts DELETE_MEMBER_FROM_GROUP_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0002";
    const dummyTargetMemberId = "testD";
    const dummyAction = deleteMemberFromGroupRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = deleteMemberFromGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId + "/member",
      {"member": ["testC"]},
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify(
      {
        "message":"invalid token"
      }
    )));

    assert.deepEqual(ret.value,put(deleteMemberFromGroupFailure()));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {setMemberAsGroupAdminSaga}*/
describe("setMemberAsGroupAdminSaga",()=>{
  it("takes every SET_MEMBER_AS_GROUP_ADMIN_REQUIRED action and pass it to setMemberAsGroupAdminTask",()=>{
    const gen = setMemberAsGroupAdminSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value, takeEvery(SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,setMemberAsGroupAdminTask));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {setMemberAsGroupAdminTask}*/
describe("setMemberAsGroupAdminTask",()=>{
  it("puts SET_MEMBER_AS_GROUP_ADMIN_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0002";
    const dummyTargetMemberId = "testD";
    const dummyAction = setMemberAsGroupAdminRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummyToken";

    const gen = setMemberAsGroupAdminTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": "groupname2",
        "admin" : ["testC",dummyTargetMemberId]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next(JSON.stringify(
      {"message":"ok"}
    ));

    assert.deepEqual(ret.value, put(setMemberAsGroupAdminSuccess()));
    ret = gen.next();

    assert(ret.done);
  });
  it("puts SET_MEMBER_AS_GROUP_ADMIN_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0002";
    const dummyTargetMemberId = "testD";
    const dummyAction = setMemberAsGroupAdminRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummyToken";

    const gen = setMemberAsGroupAdminTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": "groupname2",
        "admin" : ["testC",dummyTargetMemberId]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify(
      {"message":"invalid token"}
    )));

    assert.deepEqual(ret.value, put(setMemberAsGroupAdminFailure()));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {unsetMemberAsGroupAdminSaga}*/
describe("unsetMemberAsGroupAdminSaga",()=>{
  it("takes every UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED action and pass it to unsetMemberAsGroupAdminTask",()=>{
    const gen = unsetMemberAsGroupAdminSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value, takeEvery(UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,unsetMemberAsGroupAdminTask));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {unsetMemberAsGroupAdminTask}*/
describe("unsetMemberAsGroupAdminTask",()=>{
  it("puts UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyTargetMemberId = "testA";
    const dummyAction = unsetMemberAsGroupAdminRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = unsetMemberAsGroupAdminTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": "groupname1",
        "admin" : ["testB"]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next(JSON.stringify(
      {"message":"ok"}
    ));

    assert(ret.value, put(unsetMemberAsGroupAdminSuccess()));
    ret = gen.next();

    assert(ret.done);
  });
  it("puts UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyTargetMemberId = "testA";
    const dummyAction = unsetMemberAsGroupAdminRequired(dummyTargetGroupId,dummyTargetMemberId);

    const dummyToken = "dummytoken";

    const gen = unsetMemberAsGroupAdminTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": "groupname1",
        "admin" : ["testB"]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify(
      {"message":"invalid token"}
    )));

    assert(ret.value, put(unsetMemberAsGroupAdminFailure()));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {changeGroupNameSaga}*/
describe("changeGroupNameSaga",()=>{
  it("takes every CHANGE_GROUP_NAME_REQUIRED action and pass it to changeGroupNameTask",()=>{
    const gen = changeGroupNameSaga();
    let ret = gen.next();

    assert(ret.value, takeEvery(CHANGE_GROUP_NAME_REQUIRED, changeGroupNameTask));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {changeGroupNameTask}*/
describe("changeGroupNameTask",()=>{
  it("puts CHANGE_GROUP_NAME_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyNewGroupName = "groupname1 updated";
    const dummyAction = changeGroupNameRequired(dummyTargetGroupId,dummyNewGroupName);

    const dummyToken = "dummytoken";

    const gen = changeGroupNameTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": dummyNewGroupName,
        "admin" : ["testA","testB"]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.next(JSON.stringify(
      {"message":"ok"}
    ));

    assert.deepEqual(ret.value, put(changeGroupNameSuccess()));
    ret = gen.next();

    assert(ret.done);
  });
  it("puts CHANGE_GROUP_NAME_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyNewGroupName = "groupname1 updated";
    const dummyAction = changeGroupNameRequired(dummyTargetGroupId,dummyNewGroupName);

    const dummyToken = "dummytoken";

    const gen = changeGroupNameTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);
    ret = gen.next(DUMMY_CURRENT_GROUPS);

    assert.deepEqual(ret.value,call(
      axios.put,
      BASE_API_URL + "group/" + dummyTargetGroupId,
      {
        "groupname": dummyNewGroupName,
        "admin" : ["testA","testB"]
      },
      {headers:{"Authorization":"Bearer " + dummyToken}}
    ));

    ret = gen.throw(new Error(JSON.stringify(
      {"message":"invalid token"}
    )));

    assert.deepEqual(ret.value, put(changeGroupNameFailure()));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {deleteGroupSaga}*/
describe("deleteGroupSaga",()=>{
  it("takes every DELETE_GROUP_REQUIRED action and pass it to deleteGroupTask",()=>{
    const gen = deleteGroupSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value, takeEvery(DELETE_GROUP_REQUIRED,deleteGroupTask));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {deleteGroupTask}*/
describe("deleteGroupTask",()=>{
  it("puts DELETE_GROUP_SUCCESS action if server side api returns success",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyAction = deleteGroupRequired(dummyTargetGroupId);

    const dummyToken = "dummytoken";

    const gen = deleteGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);

    assert.deepEqual(ret.value,call(axios,{
      method:"DELETE",
      url:BASE_API_URL + "group/" + dummyTargetGroupId,
      headers: { "Authorization": "Bearer " + dummyToken}
    }));

    ret = gen.next(JSON.stringify(
      {"message":"ok"}
    ));

    assert.deepEqual(ret.value,put(deleteGroupSuccess()));
    ret = gen.next();

    assert(ret.done);
  });
  it("puts DELETE_GROUP_FAILURE action if server side api returns failure",()=>{
    const dummyTargetGroupId = "g0001";
    const dummyAction = deleteGroupRequired(dummyTargetGroupId);

    const dummyToken = "dummytoken";

    const gen = deleteGroupTask(dummyAction);
    let ret = gen.next();

    ret = gen.next(dummyToken);

    assert.deepEqual(ret.value,call(axios,{
      method:"DELETE",
      url:BASE_API_URL + "group/" + dummyTargetGroupId,
      headers: { "Authorization": "Bearer " + dummyToken}
    }));

    ret = gen.throw(new Error(JSON.stringify(
      {"message":"ok"}
    )));

    assert.deepEqual(ret.value,put(deleteGroupFailure()));
    ret = gen.next();

    assert(ret.done);
  });
});
