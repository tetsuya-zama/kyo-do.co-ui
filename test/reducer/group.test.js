import assert from 'power-assert';
import group from '../../src/reducer/group';
import {USERS_GROUPS_LOADED} from '../../src/action/group';
import {usersGroupsLoaded} from '../../src/action/group';

/**@test {group} */
describe("group reducer",()=>{
  it("changes usersGroups state to action's payload if USERS_GROUPS_LOADED action is passed",()=>{
    const dummyAPIResult = [
      {
        id:"group_id_1",
        name:"グループ1",
        members:[
          {
            id:"member1",
            name:"メンバー1",
            isAdmin:true
          },
          {
            id:"member2",
            name:"メンバー2",
            isAdmin:false
          },
        ]
      },
      {
        id:"group_id_2",
          name:"グループ2",
        members:[
          {
            id:"member3",
            name:"メンバー3",
            isAdmin:true
          },
          {
            id:"member4",
            name:"メンバー4",
            isAdmin:false
          },
        ]
      }
    ];

    const dummyCurrentState = {
      usersGroups:[
        {
          id:"group_id_3",
            name:"グループ3",
          members:[
            {
              id:"member5",
              name:"メンバー5",
              isAdmin:true
            },
            {
              id:"member6",
              name:"メンバー6",
              isAdmin:false
            },
          ]
        }
      ]
    };

    const action = usersGroupsLoaded(dummyAPIResult);

    const result = group(dummyCurrentState,action);

    assert.deepEqual(result.usersGroups,dummyAPIResult);
  });

  it("does nothing if any other action is passed",()=>{
    const action = {type:"DUMMY_ACTION_NAME"};

    const dummyCurrentState = {
      usersGroups:[
        {
          id:"group_id_3",
            name:"グループ3",
          members:[
            {
              id:"member5",
              name:"メンバー5",
              isAdmin:true
            },
            {
              id:"member6",
              name:"メンバー6",
              isAdmin:false
            },
          ]
        }
      ]
    };

    const result = group(dummyCurrentState,action);

    assert.deepEqual(result,dummyCurrentState);
  });
});
