import assert from 'power-assert';
import {
  OPEN_GROUP_CREATION_BOARD,
  CLOSE_GROUP_CREATION_BOARD,
  OPEN_GROUP_MANAGEMENT_BOARD,
  CLOSE_GROUP_MANAGEMENT_BOARD
} from '../../src/action/groupboards';

import {
  openGroupCreationBoard,
  closeGroupCreationBoard,
  openGroupManagementBoard,
  closeGroupManagementBoard
} from '../../src/action/groupboards';

/**@test {openGroupCreationBoard}*/
describe("openGroupCreationBoard action creator",()=>{
  it("creates OPEN_GROUP_CREATION_BOARD action with no arguments",()=>{
    const result = openGroupCreationBoard();

    assert(result.type === OPEN_GROUP_CREATION_BOARD);
  });
});
/**@test {closeGroupCreationBoard} */
describe("closeGroupCreationBoard action creator",()=>{
  it("creates CLOSE_GROUP_CREATION_BOARD with no arguments",()=>{
    const result = closeGroupCreationBoard();

    assert(result.type === CLOSE_GROUP_CREATION_BOARD);
  });
});

/**@test {openGroupManagementBoard} */
describe("openGroupManagementBoard action creator",()=>{
  it("creates OPEN_GROUP_MANAGEMENT_BOARD action with target group object",()=>{
    const dummyGroup = {
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
    };

    const result = openGroupManagementBoard(dummyGroup);

    assert(result.type === OPEN_GROUP_MANAGEMENT_BOARD);
    assert.deepEqual(result.payload, dummyGroup);
  });
});

/**@test {closeGroupCreationBoard} */
describe("closeGroupCreationBoard action creator",()=>{
  it("creates CLOSE_GROUP_MANAGEMENT_BOARD with no arguments",()=>{
    const result = closeGroupManagementBoard();

    assert(result.type === CLOSE_GROUP_MANAGEMENT_BOARD);
  });
});
