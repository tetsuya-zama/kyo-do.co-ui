import assert from 'power-assert';
import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects';
import {noticeSaveCompleteSaga,noticeSaveCompleteTask} from '../../src/saga/notice';
import {OPEN_NOTICE,CLOSE_NOTICE,openNotice,closeNotice} from '../../src/action/notice';
import {MY_DESTINATION_SAVE_COMPLETE} from '../../src/action/mydestination'

/**@test {noticeSaveCompleteSaga}*/
describe("noticeSaveCompleteSaga",()=>{
  it("takes every MY_DESTINATION_SAVE_COMPLETE action and pass it to noticeSaveCompleteTask",()=>{
    const gen = noticeSaveCompleteSaga();
    let ret = gen.next();

    assert(!ret.done);

    ret = gen.next();
    
    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(MY_DESTINATION_SAVE_COMPLETE,noticeSaveCompleteTask));
  });
});
/**@test {noticeSaveCompleteTask}*/
describe("noticeSaveCompleteTask",()=>{
  it("do noticeSaveCompleteTask",()=>{
    const gen = noticeSaveCompleteTask();
    let ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, put(openNotice("変更しました")));
  });
});