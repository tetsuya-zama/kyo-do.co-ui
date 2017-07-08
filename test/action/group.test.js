import assert from 'power-assert';
import {
  GROUPS_LOADED,
  GROUP_MEMBER_LOADED,
  CREATE_GROUP_REQUIRED,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  ADD_MEMBER_TO_GROUP_REQUIRED,
  ADD_MEMBER_TO_GROUP_SUCCESS,
  ADD_MEMBER_TO_GROUP_FAILURE,
  DELETE_MEMBER_FROM_GROUP_REQUIRED,
  DELETE_MEMBER_FROM_GROUP_SUCCESS,
  DELETE_MEMBER_FROM_GROUP_FAILURE,
  SET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  SET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  SET_MEMBER_AS_GROUP_ADMIN_FAILURE,
  UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED,
  UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS,
  UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE,
  CHANGE_GROUP_NAME_REQUIRED,
  CHANGE_GROUP_NAME_SUCCESS,
  CHANGE_GROUP_NAME_FAILURE,
  DELETE_GROUP_REQUIRED,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../src/action/group';

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

/**@test {groupsLoaded} */
describe("groupsLoaded action creator",()=>{
  it("creates GROUPS_LOADED action with groupinfo and logonUserId",()=>{
    const dummyAPIResult = [
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
    ];

    const dummyLogonUserId = "userid1";

    const result = groupsLoaded(dummyAPIResult,dummyLogonUserId);

    assert(result.type === GROUPS_LOADED);
    assert.deepEqual(result.payload.groupinfo,dummyAPIResult);
    assert(result.payload.logonUserId === dummyLogonUserId);
  });
});

/**@test {groupMemberLoaded} */
describe("groupMemberLoaded action creator",()=>{
  it("creates GROUP_MEMBER_LOADED action with groupWithMember data and logonUserId",()=>{
    const dummyGroupWithMember = {
      "id": "g0001",
      "name": "groupname1",
      "admin": [
        "userid1",
        "userid2"
      ],
      "members":[
        "userid1",
        "userid2",
        "userid3",
        "userid4"
      ]
    };

    const dummyLogonUserId = "userid4";

    const result = groupMemberLoaded(dummyGroupWithMember,dummyLogonUserId);

    assert(result.type === GROUP_MEMBER_LOADED);
    assert.deepEqual(result.payload.groupWithMember, dummyGroupWithMember);
    assert(result.payload.logonUserId === dummyLogonUserId);
  });
});

/**@test {createGroupRequired} */
describe("createGroupRequired action creator",()=>{
  it("creates CREATE_GROUP_REQUIRED action with new group name",()=>{
    const testGroupName = "test group";

    const result = createGroupRequired(testGroupName);

    assert(result.type === CREATE_GROUP_REQUIRED);
    assert(result.payload.groupName === testGroupName);
  });
});

/**@test {createGroupSuccess}*/
describe("createGroupSuccess action creator",()=>{
  it("creates CREATE_GROUP_SUCCESS action with no arguments",()=>{
    const result = createGroupSuccess();

    assert(result.type === CREATE_GROUP_SUCCESS);
  });
});

/**@test {createGroupFailure}*/
describe("createGroupFailure action creator",()=>{
  it("creates CREATE_GROUP_FAILURE action with no arguments",()=>{
    const result = createGroupFailure();

    assert(result.type === CREATE_GROUP_FAILURE);
  })
});

/**@test {addMemberToGroupRequired} */
describe("addMemberToGroupRequired action creator",()=>{
  it("creates ADD_MEMBER_TO_GROUP_REQUIRED action with target group ID and target member ID",()=>{
    const targetGroupId = "group_id_1";
    const targetMemberId = "member1";

    const result = addMemberToGroupRequired(targetGroupId,targetMemberId);

    assert(result.type === ADD_MEMBER_TO_GROUP_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
    assert(result.payload.memberId === targetMemberId);
  });
});

/**@test {addMemberToGroupSuccess} */
describe("addMemberToGroupSuccess action creator",()=>{
  it("creates ADD_MEMBER_TO_GROUP_SUCCESS action with no arguments",()=>{
    const result = addMemberToGroupSuccess();

    assert(result.type === ADD_MEMBER_TO_GROUP_SUCCESS);
  });
});

/**@test {addMemberToGroupFailure}*/
describe("addMemberToGroupFailure action creator",()=>{
  it("creates ADD_MEMBER_TO_GROUP_FAILURE action with no arguments",()=>{
    const result = addMemberToGroupFailure();

    assert(result.type === ADD_MEMBER_TO_GROUP_FAILURE);
  });
});

/**@test {deleteMemberFromGroupRequired} */
describe("deleteMemberFromGroupRequired action creator",()=>{
  it("creates DELETE_MEMBER_FROM_GROUP_REQUIRED action with target group ID and target member ID",()=>{
    const targetGroupId = "group_id_1";
    const targetMemberId = "member1";

    const result = deleteMemberFromGroupRequired(targetGroupId,targetMemberId);

    assert(result.type === DELETE_MEMBER_FROM_GROUP_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
    assert(result.payload.memberId === targetMemberId);
  });
});

/**@test {deleteMemberFromGroupSuccess} */
describe("deleteMemberFromGroupSuccess action creator",()=>{
  it("creates DELETE_MEMBER_FROM_GROUP_SUCCESS action with no arguments",()=>{
    const result = deleteMemberFromGroupSuccess();

    assert(result.type === DELETE_MEMBER_FROM_GROUP_SUCCESS);
  });
});

/**@test {deleteMemberFromGroupFailure} */
describe("deleteMemberFromGroupFailure action creator",()=>{
  it("creates DELETE_MEMBER_FROM_GROUP_FAILURE action with no arguments",()=>{
    const result = deleteMemberFromGroupFailure();

    assert(result.type === DELETE_MEMBER_FROM_GROUP_FAILURE);
  });
});

/**@test {setMemberAsGroupAdminRequired}*/
describe("setMemberAsGroupAdminRequired action creator",()=>{
  it("creates SET_MEMBER_AS_GROUP_ADMIN_REQUIRED action with target group ID and target member ID",()=>{
    const targetGroupId = "group_id_1";
    const targetMemberId = "member1";

    const result = setMemberAsGroupAdminRequired(targetGroupId,targetMemberId);

    assert(result.type === SET_MEMBER_AS_GROUP_ADMIN_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
    assert(result.payload.memberId === targetMemberId);
  });
});

/**@test {setMemberAsGroupAdminSuccess} */
describe("setMemberAsGroupAdminSuccess action creator",()=>{
  it("creates SET_MEMBER_AS_GROUP_ADMIN_SUCCESS action with no arguments",()=>{
    const result = setMemberAsGroupAdminSuccess();

    assert(result.type === SET_MEMBER_AS_GROUP_ADMIN_SUCCESS);
  });
});

/**@test {setMemberAsGroupAdminFailure} */
describe("setMemberAsGroupAdminFailure action creator",()=>{
  it("creates SET_MEMBER_AS_GROUP_ADMIN_FAILURE action with no arguments",()=>{
    const result = setMemberAsGroupAdminFailure();

    assert(result.type === SET_MEMBER_AS_GROUP_ADMIN_FAILURE);
  });
});

/**@test {unsetMemberAsGroupAdminRequired} */
describe("unsetMemberAsGroupAdminRequired action creator",()=>{
  it("creates UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED action with target group ID and target member ID",()=>{
    const targetGroupId = "group_id_1";
    const targetMemberId = "member1";

    const result = unsetMemberAsGroupAdminRequired(targetGroupId,targetMemberId);

    assert(result.type === UNSET_MEMBER_AS_GROUP_ADMIN_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
    assert(result.payload.memberId === targetMemberId);
  });
});

/**@test {unsetMemberAsGroupAdminSuccess} */
describe("unsetMemberAsGroupAdminSuccess action creator",()=>{
  it("creates UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS action with no arguments",()=>{
    const result = unsetMemberAsGroupAdminSuccess();

    assert(result.type === UNSET_MEMBER_AS_GROUP_ADMIN_SUCCESS);
  })
});

/**@test [unsetMemberAsGroupAdminFailure] */
describe("unsetMemberAsGroupAdminFailure action creator",()=>{
  it("creates UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE action creator",()=>{
    const result = unsetMemberAsGroupAdminFailure();

    assert(result.type === UNSET_MEMBER_AS_GROUP_ADMIN_FAILURE);
  });
});

/**@test {changeGroupNameRequired} */
describe("changeGroupNameRequired action creator",()=>{
  it("creates CHANGE_GROUP_NAME_REQUIRED action with targetGroupId and new group name",()=>{
    const targetGroupId = "group_id_1";
    const newGroupName = "new name";

    const result = changeGroupNameRequired(targetGroupId,newGroupName);

    assert(result.type === CHANGE_GROUP_NAME_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
    assert(result.payload.newName === newGroupName);
  });
});

/**@test {changeGroupNameSuccess} */
describe("changeGroupNameSuccess action creator",()=>{
  it("creates CHANGE_GROUP_NAME_SUCCESS action with no arguments",()=>{
    const result = changeGroupNameSuccess();

    assert(result.type === CHANGE_GROUP_NAME_SUCCESS);
  });
});

/**@test {changeGroupNameFailure} */
describe("changeGroupNameFailure action creator",()=>{
  it("creates CHANGE_GROUP_NAME_FAILURE action with no arguments",()=>{
    const result = changeGroupNameFailure();

    assert(result.type === CHANGE_GROUP_NAME_FAILURE);
  });
});

/**@test  {deleteGroupRequired} */
describe("deleteGroupRequired action creator",()=>{
  it("creates DELETE_GROUP_REQUIRED action with target group ID",()=>{
    const targetGroupId = "group_id_1";

    const result = deleteGroupRequired(targetGroupId);

    assert(result.type === DELETE_GROUP_REQUIRED);
    assert(result.payload.groupId === targetGroupId);
  });
});

/**@test {deleteGroupSuccess} */
describe("deleteGroupSuccess action creator",()=>{
  it("creates DELETE_GROUP_SUCCESS action with no arguments",()=>{
    const result = deleteGroupSuccess();

    assert(result.type === DELETE_GROUP_SUCCESS);
  });
});

/**@test {deleteGroupFailure} */
describe("deleteGroupFailure action creator",()=>{
  it("creates DELETE_GROUP_FAILURE action with no arguments",()=>{
    const result = deleteGroupFailure();

    assert(result.type === DELETE_GROUP_FAILURE);
  })
});
