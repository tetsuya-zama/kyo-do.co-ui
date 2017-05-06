import assert from 'power-assert';
import {ACCOUNT_INFO_MODAL_OPEN,ACCOUNT_INFO_MODAL_CLOSE,CHANGE_ACCOUNT_INFO,CHANGE_ACCOUNT_INFO_FIELD} from '../../src/action/accountboard';
import {openAccountInfoModal,closeAccountInfoModal,changeAccountInfo,changeAccountInfoField} from '../../src/action/accountboard';

/**@test {openAccountInfoModal}*/
describe("openAccountInfoModal action creator",()=>{
  it("creates ACCOUNT_INFO_MODAL_OPEN action with no argument",()=>{
    const result = openAccountInfoModal();

    assert(result.type === ACCOUNT_INFO_MODAL_OPEN);
  });
});

/**@test {closeAccountInfoModal}*/
describe("closeAccountInfoModal action creator",()=>{
  it("creates ACCOUNT_INFO_MODAL_CLOSE action with no argument",()=>{
    const result = closeAccountInfoModal();

    assert(result.type === ACCOUNT_INFO_MODAL_CLOSE);
  });
});

/**@test {changeAccountInfo}*/
describe("changeAccountInfo action creator",()=>{
  it("creates CHANGE_ACCOUNT_INFO action with name and pass",()=>{
    const dummyName = "テスト";
    const dummyPass = "1q2w3e4r";

    const result = changeAccountInfo(dummyName,dummyPass);

    assert(result.type === CHANGE_ACCOUNT_INFO);
    assert(result.payload.nextname === dummyName);
    assert(result.payload.nextpass === dummyPass);
  });
});

/**@test {changeAccountInfoField}*/
describe("changeAccountInfoField action creator",() =>{
  it("creates CHANGE_ACCOUNT_INFO_FIELD action with name and pass",()=>{
    const dummyName = "テスト";
    const dummyPass = "1q2w3e4r";

    const result = changeAccountInfoField(dummyName,dummyPass);

    assert(result.type === CHANGE_ACCOUNT_INFO_FIELD);
    assert(result.payload.nextname === dummyName);
    assert(result.payload.nextpass === dummyPass);
  });
});
