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
    const dummyGroupId = "g0001";

    const result = openGroupManagementBoard(dummyGroupId);

    assert(result.type === OPEN_GROUP_MANAGEMENT_BOARD);
    assert(result.payload.groupId, dummyGroupId);
  });
});

/**@test {closeGroupCreationBoard} */
describe("closeGroupCreationBoard action creator",()=>{
  it("creates CLOSE_GROUP_MANAGEMENT_BOARD with no arguments",()=>{
    const result = closeGroupManagementBoard();

    assert(result.type === CLOSE_GROUP_MANAGEMENT_BOARD);
  });
});
