import assert from 'power-assert';
import group from '../../src/reducer/group';
import {GROUPS_LOADED,GROUP_MEMBER_LOADED} from '../../src/action/group';
import {groupsLoaded,groupMemberLoaded} from '../../src/action/group';
import {getGroupById} from '../../src/module/group';

/**@test {group} */
describe("group reducer",()=>{
  it("marges group information if GROUPS_LOADED action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyGroupInfo = [
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
        "groupname": "groupname2 updated",
        "admin": [
          "userid3",
          "userid4"
        ]
      },
      {
        "id": "g0003",
        "groupname": "groupname3",
        "admin": [
          "userid1",
          "userid3"
        ]
      }
    ];

    const dummyLogonUserId = "userid3";

    const dummyAction = groupsLoaded(dummyGroupInfo,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.allGroups.length === 3);
    assert(getGroupById(result.allGroups, "g0002").groupname === "groupname2 updated");
    assert(getGroupById(result.allGroups, "g0002").admin.indexOf("userid4") >= 0);
    assert(getGroupById(result.allGroups, "g0003").groupname === "groupname3");
    assert(getGroupById(result.allGroups, "g0003").admin.indexOf("userid1") >= 0);
    assert(getGroupById(result.allGroups, "g0003").admin.indexOf("userid3") >= 0);
  });

  it("doesn't update members of current group if GROUPS_LOADED action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
        {
          "id": "g0001",
          "groupname": "groupname1",
          "admin": [
            "userid1",
            "userid2"
          ],
          "member": [
            "userid1",
            "userid2",
            "userid5"
          ]
        },
        {
          "id": "g0002",
          "groupname": "groupname2",
          "admin": [
            "userid3"
          ]
        }
      ],
      userGroups:[]
    };

    const dummyGroupInfo = [
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
        "groupname": "groupname2 updated",
        "admin": [
          "userid3",
          "userid4"
        ]
      },
      {
        "id": "g0003",
        "groupname": "groupname3",
        "admin": [
          "userid1",
          "userid3"
        ]
      }
    ];

    const dummyLogonUserId = "userid3";

    const dummyAction = groupsLoaded(dummyGroupInfo,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.allGroups.length === 3);
    assert(getGroupById(result.allGroups,"g0001").member);
    assert(getGroupById(result.allGroups,"g0001").member.length);
    assert(getGroupById(result.allGroups,"g0001").member.indexOf("userid1") >= 0);
    assert(getGroupById(result.allGroups,"g0001").member.indexOf("userid2") >= 0);
    assert(getGroupById(result.allGroups,"g0001").member.indexOf("userid5") >= 0);
  });

  it("deletes groups which aren't in new array if GROUPS_LOADED is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyGroupInfo = [
      {
        "id": "g0002",
        "groupname": "groupname2 updated",
        "admin": [
          "userid3",
          "userid4"
        ]
      },
      {
        "id": "g0003",
        "groupname": "groupname3",
        "admin": [
          "userid1",
          "userid3"
        ]
      }
    ];

    const dummyLogonUserId = "userid3";

    const dummyAction = groupsLoaded(dummyGroupInfo,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.allGroups.length === 2);
    assert(!getGroupById(result.allGroups,"g0001"));
  });

  it("copies groups which logonUserId is in admin or members of it, to userGroups array if GROUPS_LOADED action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyGroupInfo = [
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
        "groupname": "groupname2 updated",
        "admin": [
          "userid3",
          "userid4"
        ]
      },
      {
        "id": "g0003",
        "groupname": "groupname3",
        "admin": [
          "userid1",
          "userid3"
        ]
      }
    ];

    const dummyLogonUserId = "userid3";

    const dummyAction = groupsLoaded(dummyGroupInfo,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.usersGroups.length === 2);
    assert.deepEqual(
      result.usersGroups,
      [
        {
          "id": "g0002",
          "groupname": "groupname2 updated",
          "admin": [
            "userid3",
            "userid4"
          ],
          "member":[]
        },
        {
          "id": "g0003",
          "groupname": "groupname3",
          "admin": [
            "userid1",
            "userid3"
          ],
          "member":[]
        }
      ]
    );
  });

  it("fetches members of group if GROUP_MEMBER_LOADED action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyGroupWithMember = {
      "id": "g0001",
      "groupname": "groupname1",
      "admin": [
        "userid1",
        "userid2"
      ],
      "members":[
        "userid1",
        "userid2",
        "userid3"
      ]
    };

    const dummyLogonUserId = "userid3";

    const dummyAction = groupMemberLoaded(dummyGroupWithMember,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.allGroups.length === 2);
    assert(getGroupById(result.allGroups,"g0001").members);
    assert(getGroupById(result.allGroups,"g0001").members.length === 3);
    assert(getGroupById(result.allGroups,"g0001").members.indexOf("userid1") >= 0);
    assert(getGroupById(result.allGroups,"g0001").members.indexOf("userid2") >= 0);
    assert(getGroupById(result.allGroups,"g0001").members.indexOf("userid3") >= 0);
  });

  it("copies groups which logonUserId is in admin or members of it, to userGroups array if GROUP_MEMBER_LOADED action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyGroupWithMember = {
      "id": "g0001",
      "groupname": "groupname1",
      "admin": [
        "userid1",
        "userid2"
      ],
      "members":[
        "userid1",
        "userid2",
        "userid3"
      ]
    };

    const dummyLogonUserId = "userid3";

    const dummyAction = groupMemberLoaded(dummyGroupWithMember,dummyLogonUserId);

    const result = group(dummyCurrentState,dummyAction);

    assert(result.usersGroups.length === 2);
    assert(getGroupById(result.usersGroups,"g0001"));
    assert(getGroupById(result.usersGroups,"g0002"));
  });

  it("does nothing if any other action is passed",()=>{
    const dummyCurrentState = {
      allGroups:[
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
      ],
      userGroups:[]
    };

    const dummyAction = {type:"DUMMY_ACTION_NAME"};

    const result = group(dummyCurrentState,dummyAction);

    assert.deepEqual(result, dummyCurrentState);
  })
});
