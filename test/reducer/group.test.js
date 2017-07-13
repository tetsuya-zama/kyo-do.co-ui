import assert from 'power-assert';
import group from '../../src/reducer/group';
import {GROUPS_LOADED} from '../../src/action/group';
import {groupsLoaded} from '../../src/action/group';
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
      ]
    );
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
